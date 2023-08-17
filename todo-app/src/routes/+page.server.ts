import { pb, currentUser } from "$lib/pocketbase";
import type { Actions, Load } from "@sveltejs/kit";

async function createTask(taskInput: string, userId: string) {
    await pb
        .collection("todos")
        .create({ task: taskInput, status: "false", user: userId });
}

async function deleteTask(id: string) {
    await pb.collection("todos").delete(id);
}

async function toggleTaskStatus(id: string, status: boolean) {
    await pb.collection("todos").update(id, { status: !status });
    // .update(id, { status: status === "true" ? "false" : "true" });
}

export const load = async ({ locals }) => {
    try {
        let todoList = await locals.pb.collection("todos").getFullList({
            sort: "-created",
            filter: `user="${locals.user?.id}"`,
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

    yeet: async (event) => {
        const data = await event.request.formData();
        deleteTask(data.get("todo-id") as string);
    },

    toggleStatus: async (event) => {
        const data = await event.request.formData();
        let todoStatus = !!data.get("todo-status");

        toggleTaskStatus(data.get("todo-id") as string, todoStatus);
    },
} satisfies Actions;
