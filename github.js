export { getUserAndRepos };

async function getUserByUsername(username) {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const user = await response.json();
    if (user.message === "Not Found") {
        throw new Error(`${username} not found information`);
    }
    return user;
}

async function getReposByUsername(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`)
    const repos = await response.json();
    if (repos.message === "Not Found") {
        throw new Error(`${username} not found repositories`);
    }
    return repos;
}

async function getUserAndRepos(username) {
    let response;
    try {
        response = await Promise.all([getUserByUsername(username), getReposByUsername(username)]);
    } catch (error) {
        throw new Error(error);
    }
    return response;
}

