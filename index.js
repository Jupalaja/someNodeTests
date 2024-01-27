const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; 
const getPopularRepositories = async (req, res) => {
    try {
        const username = 'google';
        const url = `https://api.github.com/users/${username}/repos`;
        const response = await axios.get(url);
        const repos = response.data;
        const sortedRepos = repos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 10)
            .map(repo => ({
                name: repo.name,
                stars: repo.stargazers_count,
                url: repo.html_url
            }));

        res.json(sortedRepos);
    } catch (error) {
        console.error('Error fetching data from GitHub API: ', error);
        res.status(500).send('Error fetching data from GitHub API');
    }
};

app.get('/', getPopularRepositories);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
