import { ref } from "vue";


export let user = ref(JSON.parse(localStorage.getItem("user")) || null);

export let token = ref(localStorage.getItem("token") || null);


export function isAdmin() {
    return user.value?.admin === true;
}

export function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    user.value = null;
    token.value = null;
}

export function isLoggedIn() {
    return !!token.value;
}

window.addEventListener("storage", () => {
    user.value = ref(JSON.parse(localStorage.getItem("user")) || null);
    token.value = ref(localStorage.getItem("token") || null);
});
