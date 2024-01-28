const getPopularityIndex = (repos, starImportance, forkImportance) => {
  return repos
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      popularity_index:
        repo.stargazers_count * starImportance +
        repo.forks_count * forkImportance,
    }))
    .sort((a, b) => b.popularity_index - a.popularity_index)
    .slice(0, 10);
};

module.exports = getPopularityIndex;
