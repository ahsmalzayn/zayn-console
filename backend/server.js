import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
    const message = req.body.message;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: message }],
            }),
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "No reply from Zayn.";
        res.send({ reply });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ reply: "Zayn crashed. Try again." });
    }
});

app.listen(3000, "0.0.0.0", () => console.log("Zayn backend is online at port 3000"));
