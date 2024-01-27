require('dotenv').config();
const axios = require('axios');

const getPopularRepositories = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);

    const repos = response.data
      .map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks,
        url: repo.html_url
      }))
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 10);

    return repos;
  } catch (error) {
    console.error('Error fetching repositories:', error.message);
    return [];
  }
};

const displayRepositories = (repos) => {
  console.log('Top 10 Repositorios Populares de Google:');
  repos.forEach((repo, index) => {
    console.log(`${index + 1}. ${repo.name} - 🌟: ${repo.stars} - 🍴: ${repo.forks}`);
    console.log(`   URL: ${repo.url}\n`);
  });
};

getPopularRepositories('google').then(displayRepositories);
