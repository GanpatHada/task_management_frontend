const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;

interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  statusCode: number;
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const loginUser = async (
  loginCredentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${backendUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCredentials),
    });

    const result = (await response.json()) as LoginResponse;
    if (!result.success)
      throw new Error(result.message || "Login failed. Please try again.");
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(
      (error as Error).message || "Something went wrong during login."
    );
  }
};

export const registerUser = async (userData: any): Promise<any> => {
  try {
    const response = await fetch(`${backendUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    if (!result.success)
      throw new Error(result.message || "Login failed. Please try again.");
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(
      (error as Error).message || "Something went wrong during login."
    );
  }
};

export const fetchUserDetails=async():Promise<any>=>{
  try {
    const response = await fetch(`${backendUrl}/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJnYW5wYXQ0QGdtYWlsLmNvbSIsImlhdCI6MTc0MTI3MTAxOSwiZXhwIjoxNzQxODc1ODE5fQ.9pjFZKmb-4Ns3R4f1_VaYZX9VKxjjjVW9ZuzA1FFZww"

      }
    });

    const result = await response.json();
    if (!result.success)
      throw new Error(result.message || "fetching failed. Please try again.");
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(
      (error as Error).message || "Something went wrong during fetching user"
    );
  }
}
