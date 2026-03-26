https://hooks.slack.com/services/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const slackWebhook = "https://hooks.slack.com/services/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";const express = require("express");

const app = express();
app.use(express.json());

const slackWebhook = "https://hooks.slack.com/services/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";

async function sendToSlack(text) {
  try {
    await fetch(slackWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    console.log("Message sent to Slack");
  } catch (err) {
    console.error(err);
  }
}

app.post("/clockin", async (req, res) => {
  const employee = req.body.employee || "Unknown employee";
  const time = req.body.time || "Unknown time";

  await sendToSlack(`🟢 ${employee} clocked in at ${time}`);

  res.send("Clock-in notification sent");
});

app.post("/clockout", async (req, res) => {
  const employee = req.body.employee || "Unknown employee";
  const time = req.body.time || "Unknown time";

  await sendToSlack(`🔴 ${employee} clocked out at ${time}`);

  res.send("Clock-out notification sent");
});

app.listen(3000, () => {
  console.log("Webhook server running on port 3000");
});
