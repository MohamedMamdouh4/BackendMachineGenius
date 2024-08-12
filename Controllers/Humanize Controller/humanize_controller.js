require('dotenv').config();
const axios = require('axios');

const humanizeContent = async (text, style, startIndex) => {
    try {
        const response = await axios.post(
            'https://api.ai21.com/studio/v1/paraphrase',
            {
                text, 
                style, 
                startIndex
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.UNDETECTABLE_KEY}`,
                }
            }
        );

        if (response.data) {
            return response.data;
        } else {
            console.error('API Error:', response.data.error);
            throw new Error(response.data.error);
        }
    } catch (error) {
        console.error('Error humanizing content:', error);
        throw error;
    }
};

const getContent = async (req, res) => {
    try {
        const { text, style, startIndex } = req.body;

        if (!text) {
            return res.status(400).json({ success: false, error: 'No content provided' });
        }

        const humanizedContent = await humanizeContent(text, style, startIndex);

        res.json({ success: true, humanizedContent });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getContent
};
