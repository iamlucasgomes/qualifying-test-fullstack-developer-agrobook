import React from "react";
import AddBookForm from "./components/addBookForm";
import List from "./components/List";
import { useAppContext } from "@/hooks/useAppContext";

const Books: React.FC = () => {
  let content: React.ReactNode;

  const { isAddingBook } = useAppContext();

  switch (isAddingBook) {
    case true:
      content = <AddBookForm />;
      break;
    default:
      content = <List />
      break;
  }
  return (
    <div>
      {content}
    </div>
  );
};

export default Books;