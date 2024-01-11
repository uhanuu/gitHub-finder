import { getUserAndRepos } from './github.js';

const debounce = (callback, delay = 500) => {
    let timer;

    return (e) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => callback(e), delay);
    };
};
/*
    repo넣은 것처럼 html으로 넣어주는게 좋을지 
    document.querySelector 난발하면서... html 파싱시키고 꼽아서 넣어주는게 좋을지 모르겠어용,,,
*/
const searchBarEl = document.querySelector(".search-container_bar");
searchBarEl.addEventListener("keyup", debounce(displayUserDetails));
const mainEl = document.querySelector("main");
const profileImageEl = document.querySelector(".userDetails-container_profile img");
const reposEl = document.getElementById("repos");
const gistsEl = document.getElementById("gists");
const followersEl = document.getElementById("followers");
const followingEl = document.getElementById("following");
const companyEl = document.getElementById("company");
const blogEl = document.getElementById("blog");
const locationEl = document.getElementById("location");
const sinceEl = document.getElementById("since");
const LatestReposEl = document.querySelector(".userLatest-repos-container");

function displayUserDetails(e) {
    const username = e.target.value;
    const userPromise = getUserAndRepos(username);
    console.log(userPromise);

    userPromise.then((data) => {
        const [user, repos] = data;
        setProfile([
            user["avatar_url"],
            [
                user["public_repos"],
                user["public_gists"],
                user["followers"],
                user["following"]
            ],
            [
                user["company"],
                user["blog"],
                user["location"],
                user["created_at"]
            ]]);
        setGitHubRepositorys(repos);
        mainEl.setAttribute("style", "display: grid;");
    }).catch((error) => {
        mainEl.setAttribute("style", "display: none;");
        console.error(error);
    });
}

function setProfile(details) {
    const [profileUrl, gitHubDetails, additionalDetails] = details;

    setProfileImage(profileUrl);
    setGitHubDetails(gitHubDetails);
    setAdditionalDetails(additionalDetails);
}

function setProfileImage(profileUrl) {
    profileImageEl.setAttribute("src", profileUrl);
}

function setGitHubDetails(details) {
    const [repos, gists, followers, following] = details;

    reposEl.innerHTML = "Public Repos: " + repos;
    gistsEl.innerHTML = "Public Gists: " + gists;
    followersEl.innerHTML = "Followers: " + followers
    followingEl.innerHTML = "Following: " + following;
}

function setAdditionalDetails(details) {
    const [company, blog, location, since] = details;

    companyEl.innerHTML = "Company: " + company;
    blogEl.innerHTML = "Website/Blog: " + blog;
    locationEl.innerHTML = "Location: " + location
    sinceEl.innerHTML = "Member Since: " + since;
}

/*
    append로 계속 시키는것보다 한번에 join해서 처리하는게 좋을까요?
    Java로 따지면 IO작업하기 전에 StringBuilder로 한번에 모아서 처리할 수 있을거 같은데 
    html 넣어줄 때 성능 문제가 있나요?
*/
function setGitHubRepositorys(repos) {
    LatestReposEl.innerHTML = getGitHubRepositorys(repos);
}

function getGitHubRepositorys(repos) {
    return `
        <h1>Latest Repos</h1>
        ${repos.map(getGitHubRepository).join("\n")}`;
}

function getGitHubRepository(repo) {
    const { html_url, name, stargazers_count, watchers_count, fork } = repo;
    console.log(repo);
    console.log(html_url, name, stargazers_count, watchers_count, fork);
    return `
    <div class="userLatest-repos-container_repo">
        <a href="${html_url}">${name}</a>
        <div class="userLatest-repos-container_btn">
            <button id="stars">Stars: ${stargazers_count}</button>
            <button id="watchers">Watchers: : ${watchers_count}</button>
            <button id="forks">Forks: ${fork}</button>
        </div>
    </div>
    `
}