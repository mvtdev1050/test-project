import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLocalStorage = () => {
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setUserList(JSON.parse(localStorage.getItem("users")));
    setUserId(localStorage.getItem("userId"));
    getUser();
  }, [userId]);

  const getUser = () => {
    if (userId !== undefined && userList !== undefined) {
      const currentUser = userList?.filter((e) => e.id == userId);
      setCurrentUser(currentUser[0]);
    }
  };

  const handleLogout = () => {
    if (userId !== undefined && userList !== undefined) {
      const updatedList = userList?.filter((e) => {
        return e.id.toString() != userId;
      });
      localStorage.setItem("users", JSON.stringify(updatedList));
      localStorage.removeItem("userId");
      navigate("/");
    }
  };
  return { userId, userList, currentUser, handleLogout };
};
