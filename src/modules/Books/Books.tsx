import React from "react";
import AddBookForm from "./components/addBookForm";
import UpdateBookForm from "./components/updateBookForm";
import List from "./components/List";
import { useAppContext } from "@/hooks/useAppContext";

const Books: React.FC = () => {
  let content: React.ReactNode;

  const { isAddingBook, isUpdatingBook } = useAppContext();

  if (isAddingBook) {
    content = <AddBookForm />;
  } else if (isUpdatingBook) {
    content = <UpdateBookForm />;
  } else {
    content = <List />
  };

  return (
    <div>
      {content}
    </div>
  );
};

export default Books;