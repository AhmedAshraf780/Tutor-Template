const BASE_URL = "http://localhost:3001";

export const authService = {
  async sendOTPTOEmail({
    email,
    age,
    phone,
    name,
    place,
    address,
    grade,
    password,
  }) {
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          age,
          phone,
          name,
          place,
          address,
          grade,
          password,
        }),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Something went Wrong , please try again later",
      };
    }
  },
  async verfiyOTP(sessionId, otp) {
    try {
      const res = await fetch(`${BASE_URL}/auth/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, otp }),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Something went Wrong , please try again later",
      };
    }
  },

  async resendOTP(sessionId) {
    try {
      const res = await fetch(`${BASE_URL}/auth/resendOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Something went Wrong , please try again later",
      };
    }
  },
  async signIn(email, password) {
    try {
      alert("i am here")
      const res = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      alert("hyyyy")
      const data = await res.json();
      return data;
    } catch (err) {
      alert("I got an err")
      return {
        success: false,
        message: `Something went Wrong , please try again later ${err}`,
      };
    }
  },
  async checkSessionId(sessionId) {
    try {
      const res = await fetch(`${BASE_URL}/auth/checksessionid/${sessionId}`);
      const data = await res.json();
      return data;
    } catch (err) {
      return {
        success: false,
        message: "Something went Wrong , please try again later",
      };
    }
  },
  async forgotPassword(email) {
    try {
      const res = await fetch(`${BASE_URL}/auth/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return {
        success: false,
        message: "Something went Wrong , please try again later",
      };
    }
  },
  async resetPassword(password, sessionId) {
    try {
      const res = await fetch(`${BASE_URL}/auth/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, sessionId }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return {
        success: false,
        message: "Something went Wrong , please try again later",
      };
    }
  },

  async isLogged() {
    try {
      const res = await fetch(`${BASE_URL}/students/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (data.logged) {
        return {
          logged: true,
          user: data.user,
        };
      }
      return { logged: false };
    } catch (err) {
      return {
        logged: false,
        message: "Something went Wrong , please try again later",
      };
    }
  },
};
