const OpenAI = require('openai');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateTitles = async (content , myPrompt) => {
    try {
        const prompt = `${myPrompt} Here's the content: \n\n${content}`;

        // Send the prompt to OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "user", content: prompt.trim() },
            ],
        });

        // Extract the response and format it
        const result = completion.choices[0].message.content.trim();

        console.log("Results-->"+result)
        const sections = result.split(/\d+\.\s*General Title:\s*/).map(section => section.trim()).filter(section => section);

       
        const structuredResults = sections.map(section => {
            const lines = section.split('\n').map(line => line.trim()).filter(line => line);
            const generalTitle = lines[0].replace('General Title: ', '').trim();
            const id = uuidv4()

            return {
                id,
                generalTitle,
            };
        });

        // Return general titles as an array
        return structuredResults;
    } catch (error) {
        console.error("Error generating title and articles:", error);
        throw error;
    }
};

const generateThumbnails = async (content , myPrompt) => {
    try {
        const prompt = `${myPrompt} Here's the content: \n\n${content}`;

        // Send the prompt to OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "user", content: prompt.trim() },
            ],
        });

        // Extract the response and format it
        const result = completion.choices[0].message.content.trim();

        console.log("Results-->"+result)
        const sections = result.split(/\d+\.\s*Thumbnail:\s*/).map(section => section.trim()).filter(section => section);

       
        const structuredResults = sections.map(section => {
            const lines = section.split('\n').map(line => line.trim()).filter(line => line);
            const Thumbnail = lines[0].replace('Thumbnail: ', '').trim();
            const id = uuidv4()

            return {
                id,
                Thumbnail,
            };
        });

        // Return general titles as an array
        return structuredResults;
    } catch (error) {
        console.error("Error generating title and articles:", error);
        throw error;
    }
};

const generateContentTitles = async (req, res) => {
    try {
        const { content, brandName } = req.body;
        if (!content || !brandName) {
          return res
            .status(400)
            .json({ success: false, error: "No content or brand name provided" });
        }
        let prompt = "";
        if (brandName === "streetPoliticsCanada") 
        {
            prompt = `You are given content. Your task is Create at least 10 hooking titles with a maximum of eight words for the topic selected. Make it provocative and aggressive, and include clickbait context.
            1. General Title: [hooking title here]
            
            2. General Title: [hooking title here]
            and so on ......`;
        } 
        else if 
        (brandName == "investocracy") 
        {
            prompt = `You are given content. Your task is Create at least 10 hooking titles with a maximum of eight words for the topic selected. Make it ecstatic and positive , and include clickbait context...
            Return the result in the following format:
            
            1. General Title: [hooking title here]
            
            2. General Title: [hooking title here]
            and so on ......`;
        }
        else if 
        (brandName == "movieMyth") 
        {
            prompt = `You are given content. Your task is Create at least 10 hooking titles with a maximum of eight words for the topic selected. Make it thrilling yet mysterious and suspenseful, and include clickbait context...
            Return the result in the following format:
            
            1. General Title: [hooking title here]
            
            2. General Title: [hooking title here]`;
        }
        else
        {
            return res
            .status(404)
            .json({ success: false, error: "brandName Not correct" });
        }
        const generatedTitles= await generateTitles(content , prompt);
        res.json({ success: true, Titles: generatedTitles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const generateContentThumbnails = async (req, res) => {
    try {
        const { content, brandName } = req.body;
        if (!content || !brandName) {
          return res
            .status(400)
            .json({ success: false, error: "No content or brand name provided" });
        }
        let prompt = "";
        if (brandName === "streetPoliticsCanada") 
        {
            prompt = `Create a hooking title with a maximum of five words for the topic selected. Start with a grasping exclamation of one adjective. Make it clickbait and provocative, Creating atleast 10 Thumbnails
            Return the result in the following format:
            
            1. Thumbnail: [hooking title here]
            
            2. Thumbnail: [hooking title here]
            and so on ......`;
        } 
        else if 
        (brandName == "investocracy") 
        {
            prompt = `Create a hooking title for the topic selected, with a word count of three to five words. Include Clickbait , Creating atleast 10.
              
            1. Thumbnail: [hooking title here]
            
            2. Thumbnail: [hooking title here]
            and so on ......`;
        }
        else
        {
            return res
            .status(404)
            .json({ success: false, error: "brandName Not correct" });
        }
        const generatedThumbnail = await generateThumbnails(content , prompt);
        res.json({ success: true, Thumbnail: generatedThumbnail });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    generateContentTitles,
    generateContentThumbnails
}