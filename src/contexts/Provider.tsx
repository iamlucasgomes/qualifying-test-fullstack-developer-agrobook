'use client';
import React, { useState } from "react";
import Props from "./interfaces/Props";
import MyContextData from "./interfaces/MyContextData";
import AppContext from "./Context";


const Provider = ({ children }: Props) => {

  const [isAddingAuthor, setAddingAuthor] = useState(false);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [isUpdatingBook, setIsUpdatingBook] = useState(false);

  const context: MyContextData = {
    isAddingAuthor,
    setAddingAuthor,
    isAddingBook,
    setIsAddingBook,
    isUpdatingBook,
    setIsUpdatingBook
  };

  return <AppContext.Provider value={context}>
    {children}
  </AppContext.Provider>

}

export default Provider;