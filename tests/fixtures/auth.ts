import { test as base } from "@playwright/test";
import { supabase } from "../supabase";

type AuthFixtures = {
    testUser: {
        id: string;
        email: string;
        password: string;
    };
};

export const test = base.extend<AuthFixtures>({
    // @ts-ignore Playwright guarantees object is never undefined
    testUser: async ({}, use) => {
        const email = process.env.TEST_USER_EMAIL!;
        const password = process.env.TEST_USER_PASSWORD!;

        if (!email || !password) {
            throw new Error("Missing TEST_USER_EMAIL or TEST_USER_PASSWORD");
        }

        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });

        if (error) throw error;

        const userId = data.user.id;

        // setup done → expose user to tests
        await use({ id: userId, email, password });

        // cleanup (eq. Symbol.asyncDispose)
        const { data: lists } = await supabase.from("list").select("id").eq("user_id", userId);

        if (lists?.length) {
            for (const list of lists) {
                await supabase.from("booklist").delete().eq("list_id", list.id);
            }
        }

        await supabase.from("list").delete().eq("user_id", userId);
        await supabase.auth.admin.deleteUser(userId);
    },
});

export { expect } from "@playwright/test";
