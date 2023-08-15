<script lang="ts">
    import LoadLists from "./LoadLists.svelte";
    import { currentUser, pb } from "./pocketbase";

    export let todoList;

    let username: string;
    let password: string;

    async function login() {
        const user = await pb
            .collection("users")
            .authWithPassword(username, password);
        console.log(user);
    }

    async function signUp() {
        // Attempt to signup with the provided username and password from the signup form
        try {
            // Here's the data to use for the signup
            const data = {
                username,
                password,
                passwordConfirm: password,
                name: "hi, mother!",
            };
            // Now we have the data set, create a user
            const createdUser = await pb.collection("users").create(data);
            // Once it's done, login using the same username and password
            await login();
        } catch (err) {
            // Log an error if something fails :(
            console.log(err);
        }
    }

    function signOut() {
        pb.authStore.clear();
    }
</script>

{#if $currentUser}
    <div class="flex flex-col gap-2">
        <p>Here are your todo lists, {$currentUser.username}</p>
        <p>Your ID is {$currentUser.id}</p>
        <LoadLists {todoList} />
        <button on:click={signOut}>Sign me out, Scotty</button>
    </div>
{:else}
    <form on:submit|preventDefault>
        <input
            type="text"
            name="username"
            id=""
            required
            bind:value={username}
        />
        <input
            type="password"
            name="password"
            id=""
            required
            bind:value={password}
        />
        <!-- <input type="password" name="passwordConfirm" id="" required /> -->
        <button on:click={signUp}>Sign-up</button>
        <button on:click={login}>Login</button>
    </form>
{/if}
