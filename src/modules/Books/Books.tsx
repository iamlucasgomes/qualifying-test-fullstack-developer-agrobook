import React from "react";
import Form from "./components/Form";
import List from "./components/List";
import { useAppContext } from "@/hooks/useAppContext";

const Books: React.FC = () => {
  let content: React.ReactNode;

  const { isAddingBook } = useAppContext();

  switch (isAddingBook) {
    case true:
      content = <Form />;
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