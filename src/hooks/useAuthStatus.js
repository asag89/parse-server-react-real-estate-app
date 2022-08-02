import { useEffect, useState, useRef } from "react";
import Parse from "parse/dist/parse.min.js";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isMounted) {
      const getCurrentUser = async () => {
        const user = await Parse.User.current();
        if (user) {
          setCurrentUser(user);
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      };
      getCurrentUser();
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);


  return { currentUser, loggedIn, checkingStatus };
};
