import { writable } from 'svelte/store';

export const currentItemStore = writable({});
export const forRefreshStore = writable(0);

export let userData = writable({
    uuid: "",
    username: "",
    email: "",
});

export let isLogin = writable(false);