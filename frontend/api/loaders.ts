import toastStore from "../store/toastStore";
import ApiManager from "./ApiManager";

export const userLogin = async (data: any) => {
  try {
    const result = await ApiManager("/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });

    if (result.status === 200) {
      toastStore
        .getState()
        .showToast("valid", "Authentication", result.data.message);
      return result;
    }
  } catch (error) {
    toastStore
      .getState()
      .showToast("error", "Authentication", "Incorrect information");
    return error;
  }
};

export const getUserInfo = async (token: string) => {
  try {
    const result = await ApiManager("/users/", {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (result.status === 200) {
      toastStore
        .getState()
        .showToast("valid", "Authentication", result.data.message);
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const createUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}) => {
  try {
    const result = await ApiManager("/users/create", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: data,
    });

    if (result.status === 201) {
      toastStore
        .getState()
        .showToast("valid", "Authentication", result.data.message);
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const verifyUser = async (email: string) => {
  try {
    const result = await ApiManager("/users/verify", {
      method: "put",
      data: { email },
    });

    if (result.status === 201) {
      toastStore
        .getState()
        .showToast("valid", "Authentication", result.data.message);
      return result;
    }
  } catch (error) {
    return error;
  }
};
