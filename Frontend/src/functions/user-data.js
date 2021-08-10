const names = () => JSON.parse(localStorage.getItem('jwt')).user.names;
const surnames = () =>  JSON.parse(localStorage.getItem('jwt')).user.surnames;
const status = () =>  JSON.parse(localStorage.getItem('jwt')).user.status;
const followers = () =>  JSON.parse(localStorage.getItem('jwt')).user.followers;
const following = () =>  JSON.parse(localStorage.getItem('jwt')).user.following;

export { names, surnames, status, followers, following };