const BASE_URL = "http://localhost:5000/api/auth";

export const login = async (data) => {
  const { email, password } = data;
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const signup = async (data) => {
  const { name, email, password } = data;
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Signup failed");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const getMe = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "GetMe failed");
    }
    return result;
  } catch (error) {
    throw error;
  }
};
