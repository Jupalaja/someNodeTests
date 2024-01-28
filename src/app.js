require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const getPopularityIndex = require('./utils/getPopularityIndex');

const getPopularRepositories = async (req, res) => {
  const username = 'google';
  const url = `https://api.github.com/users/${username}/repos?sort=updated`;

  try {
    const { starImportance, forkImportance } = req.query;
    const response = await axios.get(url);
    const repos = response.data;
    const topRepos = getPopularityIndex(
      repos,
      starImportance ? parseFloat(starImportance) : 0,
      forkImportance ? parseFloat(forkImportance) : 0
    );

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
