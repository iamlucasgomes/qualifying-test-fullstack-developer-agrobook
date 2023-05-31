import { useContext } from "react"
import AppContext from "@/contexts/Context";

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
}