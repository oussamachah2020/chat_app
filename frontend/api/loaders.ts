import axios from "axios";
import toastStore from "../store/toastStore";

const baseUrl = "http://192.168.67.222:5000/api";

export const userLogin = async (email: string, password: string) => {
  const url = `${baseUrl}/users/login`;

  try {
    return await axios
      .post(
        url,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response && response.status === 200) {
          console.log(response.data);
          toastStore
            .getState()
            .showToast("valid", "Authentication", response.data["message"]);
          return Promise.resolve(response.data);
        }

        return Promise.reject();
      });
  } catch (err) {
    console.log(err);
  }
};

export const userRegistration = async (
  fullName: string,
  email: string,
  password: string
) => {
  const url = `${baseUrl}/users/create`;

  return axios
    .post(
      url,
      { fullName, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response && response.status === 201) {
        console.log(response.data);
        return Promise.resolve(response.data);
      }

      return Promise.reject();
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getUserInfo = async (accessToken: string) => {
  const url = `${baseUrl}/users/`;

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      if (response && response.status === 200) {
        toastStore
          .getState()
          .showToast("valid", "Authentication", "User logged in successfully");
        return Promise.resolve(response.data);
      }

      return Promise.reject(response);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const verifyUser = async (email: string) => {
  const url = `${baseUrl}/users/verify`;

  return axios
    .put(
      url,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response && response.status === 200) {
        return Promise.resolve(response.status);
      }

      return Promise.reject(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
