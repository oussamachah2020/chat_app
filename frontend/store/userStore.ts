import { create } from "zustand";

export interface userState {
  accessToken: string;
  tmpToken: string;
  email: string;
  fullName: string;
  expoPushToken: string;
  verificationCode: number;
  setAccessToken: (accessToken: string) => void;
  setTmpToken: (tmpToken: string) => void;
  setEmail: (email: string) => void;
  setFullName: (fullName: string) => void;
  setExpoPushToken: (expoPushToken: string) => void;
  setVerificationCode: (code: number) => void;
}

export const useUserStore = create<userState>((set) => ({
  accessToken: "",
  tmpToken: "",
  email: "",
  fullName: "",
  expoPushToken: "",
  verificationCode: 0,
  setVerificationCode: (verificationCode: number) =>
    set(() => ({ verificationCode })),
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
  setTmpToken: (tmpToken: string) =>
    set(() => ({
      tmpToken,
    })),

  setExpoPushToken: (expoPushToken: string) =>
    set(() => ({
      expoPushToken,
    })),
}));
