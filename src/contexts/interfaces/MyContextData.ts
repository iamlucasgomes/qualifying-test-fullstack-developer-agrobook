import React from "react";

export default interface MyContextData {
  isAddingAuthor: boolean;
  setAddingAuthor: React.Dispatch<React.SetStateAction<boolean>>;
  isAddingBook: boolean;
  setIsAddingBook: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdatingBook: boolean;
  setIsUpdatingBook: React.Dispatch<React.SetStateAction<boolean>>;
}