import { getAllAuthors, createAuthor } from "./services/service";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authors = await getAllAuthors();

  return new NextResponse(JSON.stringify(authors), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newAuthor = await createAuthor(body);
  if (newAuthor.status === 'error') {
    return new NextResponse(JSON.stringify(newAuthor), {
      status: 409,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else if (newAuthor.status === 'success'){
    return new NextResponse(JSON.stringify(newAuthor), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}