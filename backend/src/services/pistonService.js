const CREATE_URL = "https://api.paiza.io/runners/create";
const DETAILS_URL = "https://api.paiza.io/runners/get_details";

export const executeCode = async (language, code) => {
  try {
    // Step 1: Create execution
    const createRes = await fetch(CREATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        language: "javascript",
        api_key: "guest",
      }),
    });

    const createData = await createRes.json();

    console.log("Create Response:", createData);

    let resultData;

    // 🔥 Step 2: Poll until completed
    while (true) {
      const resultRes = await fetch(
        `${DETAILS_URL}?id=${createData.id}&api_key=guest`
      );

      resultData = await resultRes.json();

      console.log("Polling Result:", resultData.status);

      if (resultData.status === "completed") break;

      // wait 1 second before retry
      await new Promise((res) => setTimeout(res, 1000));
    }

    console.log("Final Result:", resultData);

    // 🔥 Clean output
    const cleanOutput = resultData.stdout
  ? resultData.stdout.trim()  // ← NO .split("\n")[0]
  : "";

return {
  success: true,
  output: cleanOutput, // return full output
  error: resultData.stderr || "",
};

  } catch (error) {
    console.error("ERROR:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};