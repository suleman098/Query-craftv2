require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (req, res) => {
  res.send("Hello, this is the Formula Generator backend.");
});

app.post("/chat", async (req, res) => {
  const { message: userMessage, type: helperType, action: taskType } = req.body;

  try {
    let systemMessage;

    if (helperType === "Microsoft Excel") {
      systemMessage = `You are an assistant that helps users with Excel spreadsheet formulas. ${
        taskType === "generate"
          ? "Generate only a formula based on this the formula description."
          : "Explain the given formula. Be as concise as possible "
      }`;
    } else if (helperType === "SQL") {
      systemMessage = `You are an assistant that helps users with SQL queries. ${
        taskType === "generate"
          ? "Generate an SQL query based on the request. Be as concise as possible and ensure that the formula is given in 1 line"
          : "Explain the given SQL query.Be as concise as possible"
      }`;
    } else {
      return res.status(400).json({
        error:
          'Invalid helper type. Must be either "Microsoft Excel" or "SQL".',
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
      max_tokens: 200,
      temperature: 0.5,
    });

    const botMessage = completion.choices[0].message.content.trim();
    res.json({ message: botMessage });
  } catch (error) {
    console.error("Error processing request:", error.message);
    if (error.response) {
      console.error("Error Details:", error.response.data);
    }

    const errorMessage =
      error.response && error.response.data && error.response.data.error
        ? error.response.data.error.message || "Error processing request"
        : "Error processing request";

    res.status(500).json({
      error: errorMessage,
      details: error.response ? error.response.data : error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
