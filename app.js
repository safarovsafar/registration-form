const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/reg/index.html");
});

app.use(express.static(__dirname + "/reg"));

app.post("/", (req, res) => {
  const {
    first_name,
    last_name,
    company,
    email,
    area_code,
    phone,
    subject,
    exist
  } = req.body;

  const data = {
    members: [
      {
        email_address: email,
        first_name: first_name,
        last_name: last_name,
        company: company,
        area_code: area_code,
        phone: phone,
        subject: subject,
        exist: exist,
        status: "subscribed"
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/3df20a1a73",
    method: "POST",
    headers: {
      Authorization: "Safar 4f63003643fc10742cb8ba0d16c52a16-us20"
    },
    body: jsonData
  };
  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.satatusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000");
});
