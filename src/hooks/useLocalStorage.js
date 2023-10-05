import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLocalStorage = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const storedUserId = localStorage.getItem("userId");

  useEffect(() => {
    setUserList(JSON.parse(localStorage.getItem("users")));
    setUserId(storedUserId);
  }, [storedUserId]);

  useEffect(() => {
    if (userId !== undefined && userList !== undefined) {
      const currentUser = userList?.find((e) => e.id == userId);
      setCurrentUser(currentUser);
    }
  }, [userId, userList]);

  const logout = () => {
    localStorage.removeItem("userId");
    setUserId("");
    navigate("/");
  };

  return { userId, userList, currentUser, logout };
};
