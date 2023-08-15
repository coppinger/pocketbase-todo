import { pb, currentUser } from "$lib/pocketbase";
import type { Actions, Load } from "@sveltejs/kit";

async function createTask(taskInput: string, userId: string) {
    await pb
        .collection("todos")
        .create({ task: taskInput, status: "false", user: userId });
}

export const load = async () => {
    try {
        let todoList = await pb.collection("todos").getFullList({
            sort: "-created",
            // filter: `user="${pb.authStore.model.currentUser.id}"`,
        });
        return { todoList: todoList.map((todo) => ({ ...todo })) };
    } catch (err) {
        console.log("Failed to fetch todolists", err);
    }
};

export const actions = {
    create: async (event) => {
        const data = await event.request.formData();
        console.log(data.get("user-id") as string);

        createTask(
            data.get("todo-input") as string,
            data.get("user-id") as string
        );
    },
} satisfies Actions;
