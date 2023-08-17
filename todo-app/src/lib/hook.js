export const getSession = async ({ locals }) => {
    return {
        user: locals.currentUser,
    };
};
