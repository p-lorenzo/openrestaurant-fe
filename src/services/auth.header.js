export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { "X-AUTH-TOKEN": 'Bearer ' + user.token };
    } else {
        return {};
    }
}