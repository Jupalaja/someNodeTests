require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const getPopularRepositories = async (req, res) => {
  const username = 'google';
  const url = `https://api.github.com/users/${username}/repos`;

  try {
    const response = await axios.get(url);
    const repos = response.data;
    const topRepos = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10)
      .map((repo) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        url: repo.html_url,
      }));

    res.json(topRepos);
  } catch (error) {
    console.error('Error fetching data: ', error.message);
    res.status(500).send('Error fetching data from GitHub API');
  }
};

app.get('/', getPopularRepositories);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
