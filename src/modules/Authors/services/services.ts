import axios from "axios";
import Author from "../interfaces/Author";

export const getAuthors = async () => {
  const response = await axios.get("/api/authors");
  return response.data;
}

export const postAuthor = async (author: Author) => {
  const response = await axios.post("/api/authors", author);
  return response.data;
}