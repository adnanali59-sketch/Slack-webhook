const https = require("https");

const webhookUrl = "https://hooks.slack.com/services/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";

const message = JSON.stringify({
  text: "🟢 Test: Connecteam webhook working!"
});

const url = new URL(webhookUrl);

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": message.length
  }
};

const req = https.request(options, res => {
  console.log("Message sent to Slack");
});

req.on("error", error => {
  console.error(error);
});

req.write(message);
req.end();
