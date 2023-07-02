import { create } from "zustand";

interface IToast {
  isVisible: boolean;
  type: string;
  title: string;
  text: string;
  showToast: (type: string, title: string, text: string) => void;
}

export const toastStore = create<IToast>((set) => ({
  isVisible: false,
  type: "error",
  title: "Authentication",
  text: "Incorrect email or password",

  showToast: (type: string, title: string, text: string) => {
    set((state) => ({
      isVisible: true,
      type,
      title,
      text,
    }));

    setTimeout(() => {
      set((state) => ({ isVisible: false }));
    }, 1500);
  },
}));
