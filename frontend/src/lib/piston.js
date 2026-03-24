/*const BACKEND_API =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://interview-platform-r32c.onrender.com/"; */
    const BACKEND_API="https://interview-platform-r32c.onrender.com"

export async function executeCode(language, code) {
  try {
    const response = await fetch(`${BACKEND_API}/api/code/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        code,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error status: ${response.status}`,
      };
    }

    const data = await response.json();

    return data; // backend already formats response

  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}