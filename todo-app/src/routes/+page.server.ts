import { pb } from "$lib/pocketbase";
import type { Actions } from "@sveltejs/kit";

async function createTask(input: string) {
    await pb.collection("todos").create({ task: input, status: "false" });
}

export const actions = {
    create: async (event) => {
        const data = await event.request.formData();
        createTask(data.get("todo-input") as string);
    },
} satisfies Actions;
