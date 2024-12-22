const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// OpenAI Configuration
const openai = new OpenAIApi(
    new Configuration({ apiKey: "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" })
);

app.post("/chat", async (req, res) => {
    const { message } = req.body;
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            max_tokens: 150,
        });
        res.json({ response: completion.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error communicating with OpenAI");
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
