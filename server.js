const express = require("express");

const app = express();
app.use(express.json());

const slackWebhook = "https://hooks.slack.com/services/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";

async function sendToSlack(text) {
  try {
    const response = await fetch(slackWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    console.log("Slack response:", await response.text());
  } catch (error) {
    console.error("Slack error:", error);
  }
}

app.post("/clockin", async (req, res) => {
  const { employee, time } = req.body;

  await sendToSlack(`🟢 ${employee} clocked in at ${time}`);
  res.send("Clock-in notification sent");
});

app.post("/clockout", async (req, res) => {
  const { employee, time } = req.body;

  await sendToSlack(`🔴 ${employee} clocked out at ${time}`);
  res.send("Clock-out notification sent");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
