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
	const date = new Date(req.params.date);
	if (isNaN(date)) next();
	else res.json({ unix: date.getTime(), utc: date.toUTCString() });
}, (req, res, next) => {
	const unix_ms = new Number(req.params.date);
	const date = new Date(unix_ms);
	if (isNaN(date)) next();
	else res.json({ unix: req.params.unix, utc: date.toUTCString() });
});

app.all("*", (_, res) => {
	res.status(404).send("<h1>404! Page not found!</h1>");
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
