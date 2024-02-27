document.addEventListener("DOMContentLoaded", function () {
    const githubUsername = "ShashiSahani";
    const apiUrl = `https://api.github.com/graphql`;

    const query = `
    {
        user(login: "${githubUsername}") {
            repositories(first: 5, orderBy: {field: UPDATED_AT, direction: DESC}) {
                nodes {
                    name
                    stargazerCount
                    forkCount
                    updatedAt
                }
            }
            contributionsCollection {
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions
            }
        }
    }
    `;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_GITHUB_ACCESS_TOKEN",
        },
        body: JSON.stringify({ query }),
    };

    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            renderGitHubActivityOverview(data.data.user);
        })
        .catch(error => {
            console.error("Error fetching GitHub data:", error);
        });
});

function renderGitHubActivityOverview(user) {
    const githubActivityOverview = document.getElementById("github-activity-overview");

    // Display repositories
    const repositories = user.repositories.nodes;
    const repositoriesList = repositories.map(repo => `<li>${repo.name} - Stars: ${repo.stargazerCount}, Forks: ${repo.forkCount}, Last Updated: ${repo.updatedAt}</li>`).join("");
    
    // Display contributions
    const contributions = user.contributionsCollection;
    const contributionsHTML = `
        <p>Total Commit Contributions: ${contributions.totalCommitContributions}</p>
        <p>Total Issue Contributions: ${contributions.totalIssueContributions}</p>
        <p>Total Pull Request Contributions: ${contributions.totalPullRequestContributions}</p>
    `;

    // Append to the container
    githubActivityOverview.innerHTML = `
        <h2>GitHub Activity Overview</h2>
        <h3>Repositories:</h3>
        <ul>${repositoriesList}</ul>
        <h3>Contributions:</h3>
        ${contributionsHTML}
    `;
}
