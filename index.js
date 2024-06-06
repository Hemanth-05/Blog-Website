import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.render("index.ejs");
})

// Server-side code
app.post("/submit", (req, res) => {
    // Process form data and send a response with the necessary data
    const dataReceived = req.body;
    console.log(dataReceived);
    res.json(dataReceived); // Send JSON response instead of rendering a page
});


app.listen(port, () => {
    console.log(`The server is up and running at ${port}`);
});