const BASE_URL = "http://localhost:3001";
export const studentServices = {
  async getAssignements() {
    try {
      const res = await fetch(`${BASE_URL}/student/assignments`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong,try again later",
      };
    }
  },

  async submitSolution(payload) {
    try {
      const formData = new FormData();
      formData.append("type", payload.type);
      formData.append("assignmentId", payload.assignmentId);
      formData.append("solution", payload.solution);
      formData.append("studentId", payload.studentId);
      const res = await fetch(`${BASE_URL}/student/assignments`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong,try again later",
      };
    }
  },
  async getNotes() {
    try {
      const res = await fetch(`${BASE_URL}/student/notes`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong,try again later",
      };
    }
  },

  async createNote(note) {
    try {
      const res = await fetch(`${BASE_URL}/student/notes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong,try again later",
      };
    }
  },
};
