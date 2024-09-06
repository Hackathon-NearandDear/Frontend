import create from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  address: string;
  userid: string;
  name: string;
  profileimage: string;
};

export type UserState = {
  user: User | null;
  setUser: (user: Partial<User>) => void;
  logout: () => void;
};

const getTestUsername = (address: string): string => {
  return address.slice(0, 6);
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (newUser) =>
        set((state) => {
          if (!state.user) {
            // If there's no existing user, create a new one
            const defaultName =
              newUser.name ||
              (newUser.address ? getTestUsername(newUser.address) : "");
            return {
              user: {
                address: newUser.address || "",
                userid: newUser.userid || "",
                name: defaultName,
                profileimage: newUser.profileimage || "",
              },
            };
          } else {
            // If there's an existing user, update the fields
            return {
              user: {
                ...state.user,
                ...newUser,
                name:
                  newUser.name ||
                  state.user.name ||
                  (state.user.address
                    ? getTestUsername(state.user.address)
                    : ""),
              },
            };
          }
        }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
