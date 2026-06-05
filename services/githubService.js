const axios = require("axios");

const fetchGithubProfile = async (username) => {

    const profileResponse = await axios.get(
        `https://api.github.com/users/${username}`
    );

    const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
    );

    return {
        profile: profileResponse.data,
        repos: reposResponse.data
    };
};

module.exports = fetchGithubProfile;