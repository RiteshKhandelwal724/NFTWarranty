import { useAtom } from "jotai";
import { tokenValue } from "../store";
export const useToken = () => {
  const [token, setTokenInternal] = useAtom(tokenValue);
  const setToken = (newToken) => {
    if (newToken === 0) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", newToken);
      setTokenInternal(newToken);
    }
  };
  return [token, setToken];
};
