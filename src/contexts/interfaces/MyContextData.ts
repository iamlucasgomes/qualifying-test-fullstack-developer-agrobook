import React from "react";

export default interface MyContextData {
  isAddingAuthor: boolean;
  setAddingAuthor: React.Dispatch<React.SetStateAction<boolean>>;
}