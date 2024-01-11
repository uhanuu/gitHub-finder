export { getUserAndRepos, searchUser };

const PAGE = 1;
const PER_PAGE = 10;

async function searchUser(username) {
    let users;
    try {
        const response = await fetch(`https://api.github.com/search/users?q=${username}&page=${PAGE}&per_page=${PER_PAGE}`)
        users = await response.json();
        calculateTotalPage(users["total_count"]);
    } catch (error) {
        console.error(error);
    }
    console.log(users);
    return users;
}

function calculateTotalPage(totalCount) {
    let totalPage = Math.ceil(totalCount / PER_PAGE);
    console.log(totalPage);

    return totalPage;
}

async function getUserByUsername(username) {
    let user
    try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        user = await response.json();
    } catch (error) {
        console.error(error);
    }
    return user;
}

async function getReposByUsername(username) {
    let repos;
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`)
        repos = await response.json();
    } catch (error) {
        console.error(error);
    }
    return repos;
}

async function getUserAndRepos(username) {
    let response;
    try {
        response = await Promise.all([getUserByUsername(username), getReposByUsername(username)]);
    } catch (error) {
        console.error(error);
    }
    return response;
}

