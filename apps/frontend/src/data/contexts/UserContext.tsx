"use client";
import { User } from "@barber/core";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export interface UserContextProps {
  loading: boolean;
  user: User | null;
  enter: (user: User) => Promise<void>;
  leave: () => void;
}

const UserContext = createContext<UserContextProps>({} as any);

export function UserProvider({ children }: any) {
  const { get, set } = useLocalStorage();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const loadingUsers = useCallback(
    function () {
      try {
        const localUser = get("usuario");
        if (localUser) {
          setUser(localUser);
        }
      } finally {
        setLoading(false);
      }
    },
    [get]
  );

  async function enter(user: User) {
    setUser(user);
    set("usuario", user);
  }

  function leave() {
    router.push("/");
    setUser(null);
    set("usuario", null);
  }

  useEffect(() => loadingUsers(), [loadingUsers]);

  return (
    <UserContext.Provider
      value={{
        loading,
        enter,
        leave,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
