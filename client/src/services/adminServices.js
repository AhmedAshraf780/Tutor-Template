const BASE_URL = "http://localhost:3001";
export const adminServices = {
  async getStudents() {
    try {
      const res = await fetch(`${BASE_URL}/admin/students`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Service response:", data); // Debug log

      if (data.success) {
        return data.students;
      } else {
        throw new Error(data.message || "Failed to fetch students");
      }
    } catch (err) {
      console.error("Service error:", err);
      throw err; // Re-throw so component can handle it
    }
  },

  async getMyGroups() {
    try {
      const res = await fetch(`${BASE_URL}/admin/mygroups`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) return data.adminGroups;
      else {
        throw new Error(data.message || "Failed to fetch groups");
      }
    } catch (err) {
      console.error("Get groups error:", err);
      throw err; // Re-throw so component can handle it
    }
  },

  async createGroup(name, students) {
    try {
      const res = await fetch(`${BASE_URL}/admin/mygroups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, students }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Failed to create group");
      }
    } catch (err) {
      console.error("Create group error:", err);
      throw err; // Re-throw so component can handle it
    }
  },

  async deleteGroup(groupId) {
    try {
      const res = await fetch(`${BASE_URL}/admin/mygroups/${groupId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Delete response:", data); // Debug log

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Failed to delete group");
      }
    } catch (err) {
      console.error("Delete group error:", err);
      throw err; // Re-throw so component can handle it
    }
  },
  async updateGroup(groupId, students) {
    try {
      const res = await fetch(`${BASE_URL}/admin/mygroups`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ groupId, students }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Update group response:", data); // Debug log

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Failed to update group");
      }
    } catch (err) {
      console.error("Update group error:", err);
      throw err; // Re-throw so component can handle it
    }
  },

  async createAssignment(payload) {
    try {
      const formData = new FormData();
      formData.append("type", payload.type);
      formData.append("groupId", payload.groupId);
      formData.append("name", payload.name);
      formData.append("googleForm", payload.googleForm);
      if (payload.pdfAssignment) {
        formData.append("pdfAssignment", payload.pdfAssignment);
      }
      if (payload.pdfSolution) {
        formData.append("pdfSolution", payload.pdfSolution);
      }
      const res = await fetch(`${BASE_URL}/admin/assignments`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Update group response:", data); // Debug log

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Failed to update group");
      }
    } catch (err) {
      console.error("Update group error:", err);
      throw err; // Re-throw so component can handle it
    }
  },

  async getAllAssignmentsForGroup(groupId) {
    try {
      const res = await fetch(`${BASE_URL}/admin/assignments${groupId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Update group response:", data); // Debug log

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Failed to update group");
      }
    } catch (err) {
      console.error("Update group error:", err);
      throw err; // Re-throw so component can handle it
    }
  },

  async getSolutionsForAssignment(assignmentId, type) {
    try {
      const res = await fetch(
        `${BASE_URL}/admin/assignments/solutions/?assignmentId=${assignmentId}&type=${type}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Get solutions response:", data); // Debug log

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Failed to fetch solutions");
      }
    } catch (err) {
      console.error("Get solutions error:", err);
      throw err; // Re-throw so component can handle it
    }
  },
};
