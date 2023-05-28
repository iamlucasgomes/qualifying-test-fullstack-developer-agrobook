import { deleteBook } from "../services/service";
import { NextResponse } from "next/server";

export async function DELETE(_request: Request, response: any) {
  const id = response.params.id;

  const bookDeleted = await deleteBook(Number(id))
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