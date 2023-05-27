import { getAllAuthors } from "./service/service";
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