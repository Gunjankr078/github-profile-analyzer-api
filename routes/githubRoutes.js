const express = require("express");

const router = express.Router();

const {
    analyzeProfile,
    getAllProfiles,
    getSingleProfile,
    getTopProfile
} = require("../controllers/githubController");

router.post("/analyze/:username", analyzeProfile);

router.get("/profiles", getAllProfiles);

router.get("/profiles/:username", getSingleProfile);

router.get("/top", getTopProfile);

module.exports = router;