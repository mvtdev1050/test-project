import { useEffect, useState } from "react";

export const useLocalStorage = () => {
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
    console.log("logout btn clicked");
    localStorage.removeItem("userId");
    setUserId("");
  };

  console.log(userId, "userid");

  return { userId, userList, currentUser, logout };
};
