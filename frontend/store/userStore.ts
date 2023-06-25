import { create } from "zustand";

export interface userState {
  accessToken: string;
  email: string;
  fullName: string;
  setAccessToken: (accessToken: string) => void;
  setEmail: (email: string) => void;
  setFullName: (fullName: string) => void;
}

export const useUserStore = create<userState>((set) => ({
  accessToken: "",
  email: "",
  fullName: "",
  setAccessToken: (accessToken: string) =>
    set(() => ({
      accessToken,
    })),

  setEmail: (email: string) =>
    set(() => ({
      email,
    })),
  setFullName: (fullName: string) =>
    set(() => ({
      fullName,
    })),
}));
