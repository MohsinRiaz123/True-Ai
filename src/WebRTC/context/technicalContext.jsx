import { createContext, useState } from "react";

export const chatContext = createContext();

export const ChatProvider = ({ Children }) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  return (
    <chatContext.Provider value={{ textAreaValue, setTextAreaValue }}>
      {Children}
    </chatContext.Provider>
  );
};
