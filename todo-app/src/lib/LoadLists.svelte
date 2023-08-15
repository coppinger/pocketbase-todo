<script lang="ts">
    //@ts-nocheck
    import { currentUser, pb } from "./pocketbase";
    import { enhance } from "$app/forms";

    export let todoList;

    let inputVal = "";
</script>

<form
    action="?/create"
    method="post"
    use:enhance
    on:submit={() => {
        inputVal = "";
    }}
>
    <input type="text" bind:value={inputVal} name="todo-input" id="" required />
    <input type="hidden" name="user-id" id="" value={$currentUser.id} />
    <button type="submit">Submit</button>
</form>

<ul class="flex flex-col py-4 gap-2">
    {#if todoList != undefined && todoList?.length > 0}
        {#each todoList as todo}
            {#if todo.status}
                <li class="line-through">{todo.task}</li>
            {:else}
                <li>{todo.task}</li>
            {/if}
        {/each}
    {/if}
</ul>
