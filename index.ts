import express, { Request, Response } from 'express';
import { speechToText } from './functions/speechToText';
import "dotenv/config";

const port = process.env.PORT || 4000;

// 4000 is the port number
// index.ts file started in package.json --> scripts

const app = express();
app.use(
    express.json({
        // Audio limit is 50mb
        limit: "50mb",
    })
    );


// Setting up the handler for running speech-to-text
// Request and Response are coming from Express
 
app.post("/speech-to-text", (req: Request, res: Response) => {
    speechToText(req, res);
});

app.get("/", (req, res) => {
    res.send("The Speech-To-Text API is up and running")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});