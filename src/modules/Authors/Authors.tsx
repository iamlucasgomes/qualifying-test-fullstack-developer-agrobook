import React from "react";
import List from "./components/List";
import { useAppContext } from "@/hooks/useAppContext";
import Form from "./components/Form";

const Authors: React.FC = () => {
  const { isAddingAuthor } = useAppContext();
  let content: React.ReactNode;

switch (isAddingAuthor) {
  case true:
    content = <Form />;
    break;
  default:
    content = <List />
    break;
}

  return (
    content
  );
};

export default Authors;