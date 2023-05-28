import { createBook, getAllBooks, updateBook, deleteBook } from "./services/service";
import { NextResponse } from 'next/server';

export async function GET(_request: Request) {
  const books = await getAllBooks();

  return new NextResponse(JSON.stringify(books), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.nome || !body.data_lancamento || !body.categoria) {
    return new NextResponse(JSON.stringify({ message: 'O livro deve ter nome, data de lançamento e categoria' }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  if (body.autores.length === 0) {
    return new NextResponse(JSON.stringify({ message: 'O livro deve ter pelo menos um autor' }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const newAuthor = await createBook(body);
  if (newAuthor.status === 'error409') {
    return new NextResponse(JSON.stringify({ message: newAuthor.message }), {
      status: 409,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else if (newAuthor.status === 'error404') {
    return new NextResponse(JSON.stringify({ message: newAuthor.message }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } else if (newAuthor.status === 'success') {
    return new NextResponse(JSON.stringify(newAuthor), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  if (!body.id) {
    return new NextResponse(JSON.stringify({ message: 'O livro deve ter um id' }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  if (body.autores && body.autores.length === 0) {
    return new NextResponse(JSON.stringify({ message: 'O livro deve ter pelo menos um autor' }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const bookUpdated = await updateBook(body.id, body)
  if (bookUpdated.status === 'error404') {
    return new NextResponse(JSON.stringify({ message: bookUpdated.message }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  return new NextResponse(JSON.stringify(bookUpdated), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

}

export async function DELETE(request: Request) {
  /* Usei o searchParams para obter o id do livro devido a um bug na rota delete do next 13.4.4, 
  mais detalhes nessa issue https://github.com/vercel/next.js/issues/48096 */
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get('_id') || ''

  const bookDeleted = await deleteBook(Number(_id))
  if (bookDeleted.status === 'error404') {
    return new NextResponse(JSON.stringify({ message: bookDeleted.message }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  return new NextResponse(JSON.stringify({ message: bookDeleted.message }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

}


