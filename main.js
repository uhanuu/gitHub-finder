import { getUserAndRepos, searchUser } from './github.js';

const USER_DETAILS_INDEX = 0;
const USER_REPOS_INDEX = 1;

const searchBarEl = document.querySelector(".search-container_bar");
searchBarEl.addEventListener("keyup", (e) => {
    const username = e.target.value;
    console.log(findUser(username));
});

function findUser() {
    const username = searchBarEl.value;
    console.log(username);
    getUserAndRepos(username);
}