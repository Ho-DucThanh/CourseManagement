import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "./AuthSlice";
import { resetProfile } from "../Home/ProfileSlice";
import { getProfileUser } from "../Home/Profile_apiRequest";

export const loginUser = async (user, dispatch, setError, navigate) => {
  dispatch(loginStart());
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to login");
    }

    console.log(data);
    dispatch(loginSuccess(data));

    getProfileUser(data.user._id, data.accessToken, dispatch, setError);

    alert("Login successful");
    navigate("/");
  } catch (error) {
    setError(error.message);
    dispatch(loginFailure(error.message));
  }
};

export const registerUser = async (user, dispatch, navigate, setError) => {
  dispatch(registerStart());
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(data.message || "Failed to register");
    }

    const data = await response.json();
    console.log(data);
    dispatch(registerSuccess());
    alert("Registration successful");
    navigate("/login");
  } catch (error) {
    setError(error.message);
    dispatch(registerFailure(error.message));
  }
};

export const logoutUser = async (accessToken, id, dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(data.message || "Failed to logout");
    }

    const data = await response.json();

    dispatch(logoutSuccess(data));
    dispatch(resetProfile());
    alert("Logout successful");
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailure(err.message));
  }
};

export const getListUsers = async (accessToken) => {
  try {
    const response = await fetch("/api/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to get users");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (accessToken, id) => {
  try {
    const response = await fetch(`/api/auth/deleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete user");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changPasswordUser = async (
  accessToken,
  id,
  dataUser,
  setError,
) => {
  try {
    const res = await fetch(`/api/auth/updateUser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataUser),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    console.log("Response from server:", data);
    alert("Password changed successfully");
  } catch (err) {
    setError(err.message);
    console.log(err);
  }
};
