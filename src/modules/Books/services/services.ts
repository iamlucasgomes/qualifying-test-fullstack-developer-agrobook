import axios from "axios";
import Books from "../interfaces/Books";
import updateBooks from "../interfaces/updateBooks";

export const getBooks = async () => {
  const response = await axios.get("/api/books");
  return response.data;
}

export const postBook = async (book: Books) => {
  const response = await axios.post("/api/books", book);
  return response.data;
}

export const deleteBook = async (id: number) => {
  const response = await axios.delete(`/api/books/${id}`);
  return response.data;
}

export const patchBook = async (book: updateBooks) => {
  const response = await axios.patch(`/api/books`, book);
  return response.data;
}