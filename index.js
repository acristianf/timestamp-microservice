const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (_, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res, next) => {
	var date;
	if (!req.params.date) date = new Date();
	else date = new Date(req.params.date);
	if (isNaN(date)) next();
	else res.json({ unix: date.getTime(), utc: date.toUTCString() });
}, (req, res, next) => {
	const unix_ms = new Number(req.params.date);
	const date = new Date(unix_ms);
	if (isNaN(date)) next();
	else res.json({ unix: unix_ms, utc: date.toUTCString() });
}, (_, res) => {
	res.json({ error: "Invalid Date" });
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
