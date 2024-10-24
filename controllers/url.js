// Import required modules
const URL = require("../models/url.js");
const shortId = require("shortid");

// Handler to generate a new short URL
const generatershortNewyurl = async (req, res) => {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const ShortID = shortId.generate(); 
    await URL.create({
        shortId: ShortID,
        redirectUrl: body.url,
        visithistory: [],
        CreatedBy:req.user._id
    });
    return res.render("home", {
        id: ShortID  
    });
    // return res.json({ id: ShortID });  // Return the generated short ID
};

// Handler for redirecting using short URL and updating visit history
const redirectWithTracking = async (req, res) => {
    const shortId = req.params.shortId;  
    const entry = await URL.findOneAndUpdate(
        { shortId },  
        {
            $push: {
                visithistory: { timestamp: Date.now() },  // Add visit timestamp
            }
        },
        { new: true }  // Return the updated document after the push
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectUrl);  // Redirect to the original URL
};

// Handler to get analytics for a short URL
const handlegetAnalytic = async (req, res) => {
    const shortId = req.params.shortId;  // Extract shortId from the route
    const result = await URL.findOne({ shortId });  // Find the document by shortId

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
        totalclick: result.visithistory.length,  // Total number of clicks
        analytic: result.visithistory  // Full visit history
    });
};

// Exporting the handlers to be used in the routes
module.exports = {
    generatershortNewyurl,       // Route to generate a new short URL
    redirectWithTracking,        // Route to handle redirection with tracking
    handlegetAnalytic            // Route to get analytics of a short URL
};
