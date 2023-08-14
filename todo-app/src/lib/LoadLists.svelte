<script lang="ts">
    //@ts-nocheck
    import { onMount } from "svelte";
    import { currentUser, pb } from "./pocketbase";
    import { enhance } from "$app/forms";

    let todoLists = [];

    onMount(async () => {
        console.log($currentUser.id);
        try {
            todoLists = await pb.collection("todolists").getFullList({
                sort: "-created",
                filter: `user="${$currentUser.id}"`,
                expand: "todos",
            });
        } catch (err) {
            console.log("Failed to fetch todolists", err);
        }
    });
</script>

{#if todoLists != undefined && todoLists?.length > 0}
    <ul class="flex flex-col py-4 gap-2">
        {#each todoLists as todoList}
            {#each todoList.expand.todos as todo}
                <form action="?/create" method="post" use:enhance>
                    <input type="text" name="todo-input" id="" required />
                    <button type="submit">Submit</button>
                </form>
                <li>{todo.task}</li>
            {/each}
        {/each}
    </ul>
{/if}
