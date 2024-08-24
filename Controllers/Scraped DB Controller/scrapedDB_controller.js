const mongoose = require("mongoose");
const scraped_dataBase = require("../../Models/Scraped/scraped_model");
require('dotenv').config()

const getScrapedData = async (brandName, stockName ) => {
    try {
        const query = { brand: brandName };
        if (stockName) {
            query.stock = stockName;
        }
        const results = await scraped_dataBase.find(query);

        return results
        .reverse()
        .slice(0 , 20);
    } catch (error) {
        console.error("Error occurred:", error);
        throw new Error("Internal Server Error");
    }
};

const get_scraped_fromDB = async (req , res) => {
    try {
        const brandName = req.body.brandName;
        const stockName = req.body.stockName;

        const result = await getScrapedData(brandName , stockName)
        res.status(200).json({ msg : "Scraped DB fetched successfully" , result})
    }
    catch (error) 
    {
        res.status(500).json({ msg : "Error in creating scraped DB" , error})
    }
};

module.exports = { get_scraped_fromDB , getScrapedData  };