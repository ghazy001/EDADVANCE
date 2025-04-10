// src/controller/UserController.ts
export const getUserRankings = async (): Promise<any[]> => {
    try {
      const response = await fetch("http://localhost:3000/user/rankings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user rankings");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user rankings:", error);
      return [];
    }
  };