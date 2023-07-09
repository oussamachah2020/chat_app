import { create } from "zustand";

interface IToast {
  isVisible: boolean;
  type: string;
  title: string;
  text: string;
  setVisible: (isVisible: boolean) => void;
  showToast: (type: string, title: string, text: string) => void;
}

const toastStore = create<IToast>((set) => ({
  isVisible: false,
  setVisible: (isVisible: boolean) => {
    set((state) => ({ isVisible }));
  },
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
    }, 2000);
  },
}));

export default toastStore;
