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
	res.json({ unix: date.getTime(), utc: date.toUTCString() });
	next();
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})
