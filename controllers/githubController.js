const db = require("../config/db");
const fetchGithubProfile = require("../services/githubService");

exports.analyzeProfile = async (req, res) => {

    try {

        const { username } = req.params;

        const githubData = await fetchGithubProfile(username);

        const profile = githubData.profile;
        const repos = githubData.repos;

        let totalStars = 0;
        let totalForks = 0;

        repos.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
        });

        let mostStarredRepo = null;

        if (repos.length > 0) {
            mostStarredRepo = repos.reduce((max, repo) =>
                repo.stargazers_count > max.stargazers_count ? repo : max
            );
        }

        const score =
            (profile.followers * 2) +
            (profile.public_repos * 3) +
            totalStars;

        const accountAgeYears =
            new Date().getFullYear() -
            new Date(profile.created_at).getFullYear();

        let level = "";

        if (score >= 50000) {
            level = "Expert";
        } else if (score >= 10000) {
            level = "Advanced";
        } else if (score >= 1000) {
            level = "Intermediate";
        } else {
            level = "Beginner";
        }

        await db.execute(
            `INSERT INTO github_profiles
            (
                username,
                name,
                public_repos,
                followers,
                following,
                public_gists,
                total_stars,
                total_forks,
                account_created_at,
                profile_url,
                avatar_url,
                analysis_score
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

            ON DUPLICATE KEY UPDATE

            public_repos = VALUES(public_repos),
            followers = VALUES(followers),
            following = VALUES(following),
            public_gists = VALUES(public_gists),
            total_stars = VALUES(total_stars),
            total_forks = VALUES(total_forks),
            analysis_score = VALUES(analysis_score)
            `,
            [
                profile.login,
                profile.name,
                profile.public_repos,
                profile.followers,
                profile.following,
                profile.public_gists,
                totalStars,
                totalForks,
                new Date(profile.created_at),
                profile.html_url,
                profile.avatar_url,
                score
            ]
        );

        res.status(200).json({
            success: true,
            username,
            score,
            level,
            accountAgeYears,
            totalStars,
            totalForks,
            mostStarredRepo: mostStarredRepo
                ? mostStarredRepo.name
                : "No repositories"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllProfiles = async (req, res) => {

    try {

        const [rows] = await db.execute(
            "SELECT * FROM github_profiles"
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getSingleProfile = async (req, res) => {

    try {

        const { username } = req.params;

        const [rows] = await db.execute(
            "SELECT * FROM github_profiles WHERE username=?",
            [username]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getTopProfile = async (req, res) => {

    try {

        const [rows] = await db.execute(
            `SELECT *
             FROM github_profiles
             ORDER BY analysis_score DESC
             LIMIT 1`
        );

        res.json(rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};