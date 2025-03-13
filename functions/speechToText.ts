import {Request, Response} from "express";

// Setting up reqeuest and response

export const speechToText = async (req: Request, res: Response) => {
    const data = req.body;
    const audioUrl = data?.audioUrl;
    const audioConfig = data?.config;

    if (!audioUrl) return res.status(422).send("No Audio URL was provided");
    if (!audioConfig) return res.status(422).send("No Audio Config was provided");

    // Handle logic that will handle audio conversion

    try {

        // speech recognition endpoint for REST API
        // Sending back speechresults to the client (const)
        const speechResults = await fetch("https://speech.googleapis.com/v1/speech:recognize", {
            method: "POST",
            body: JSON.stringify({
                audio: {
                    content: audioUrl
                },
                config: audioConfig
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-goog-api-key": `${process.env.GOOGLE_SPEECH_TO_TEXT_API_KEY}`,
                // Google API key is stored in .env file
            },
        }
    ).then((response) => response.json());
    // When get results back from google API
    console.log({ speechResults });
    return res.send(speechResults);
    } catch (err) {
        console.error("Error converting speech to text: ", err);
        res.status(404).send(err);
        return err;
    }

};