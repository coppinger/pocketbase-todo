<script>
    import Login from "$lib/Login.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<div
    class="flex flex-col justify-center items-center bg-pink-200 w-screen h-screen"
>
    <h1 class="text-4xl">TODO MMO</h1>
    <p>Todo's, together!</p>

    <Login />
</div>
