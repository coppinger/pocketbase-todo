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
            <div class="flex gap-2">
                <form action="?/yeet" method="post" use:enhance>
                    <input type="hidden" name="todo-id" value={todo.id} />
                    <button type="submit">🗑️</button>
                </form>
                {#if todo.status}
                    <li class="line-through">{todo.task}</li>
                {:else}
                    <li>{todo.task}</li>
                {/if}
                <form action="?/toggleStatus" method="post" use:enhance>
                    <input type="hidden" name="todo-id" value={todo.id} />
                    <input
                        type="checkbox"
                        name="todo-status"
                        checked={todo.status}
                        hidden
                    />
                    <button type="submit">✅</button>
                </form>
            </div>
        {/each}
    {/if}
</ul>
