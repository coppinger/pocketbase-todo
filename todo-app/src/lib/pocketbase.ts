// import PocketBase from "pocketbase";
import { writable } from "svelte/store";

// export const pb = new PocketBase("http://127.0.0.1:8090");

// pb.authStore.onChange((auth) => {
//     console.log("Auth changed!", auth);
//     currentUser.set(pb.authStore.model);
// });

import PocketBase from "pocketbase";

export function createInstance() {
    return new PocketBase("http://127.0.0.1:8090");
}

export const pb = createInstance();

export const currentUser = writable(pb.authStore.model);
