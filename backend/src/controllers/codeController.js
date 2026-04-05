import { executeCode } from "../services/pistonService.js";

export const runCode = async (req, res) => {
  const { language, code } = req.body;

  const result = await executeCode(language, code);

  res.json(result);
};