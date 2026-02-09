import { test, expect, type Page } from "@playwright/test";
import { supabase } from "tests/supabase";

const testUserEmail = process.env.TEST_USER_EMAIL;
const testUserPassword = process.env.TEST_USER_PASSWORD;

if (!testUserEmail || !testUserPassword) {
    throw new Error("Missing TEST_USER_EMAIL or TEST_USER_PASSWORD");
}

async function setup() {
    const { data, error } = await supabase.auth.admin.createUser({
        email: testUserEmail,
        password: testUserPassword,
        email_confirm: true,
    });
    if (error) {
        throw error;
    }
    // solution from https://www.epicweb.dev/better-test-setup-with-disposable-objects
    // delete test user
    return {
        user: data.user,
        async [Symbol.asyncDispose]() {
            // get user list
            const { data: lists } = await supabase.from("list").select("id").eq("user_id", data.user.id);

            // delete books
            if (lists) {
                for (const list of lists) {
                    await supabase.from("booklist").delete().eq("list_id", list.id);
                }
            }

            // delete lists
            await supabase.from("list").delete().eq("user_id", data.user.id);

            // delete auth user
            await supabase.auth.admin.deleteUser(data.user.id);
        },
    };
}

async function signin(page: Page, email = testUserEmail!, password = testUserPassword!) {
    await page.goto("/signin");
    await page.getByLabel("Email*").fill(email);
    await page.getByLabel("Mot de passe*").fill(password);
    await page.getByRole("button", { name: /OK/i }).click();
}

async function fillListName(page: Page, name = "Playwright List") {
    await page.getByLabel("Titre*").fill(name);
}

test("Authenticated users can create lists", async ({ page }) => {
    // connexion
    await using _test = await setup();
    await signin(page);

    // check heading and button
    const heading = page.getByRole("heading", { level: 1, name: /Mes listes/i });
    await expect(heading).toBeVisible();

    const button = page.getByRole("button", { name: /Créer une liste/i });
    await expect(button).toBeVisible();

    // Create a list
    await page.getByRole("button", { name: /Créer une liste/i }).click();
    await page.waitForURL("/add-list");
    const titleInput = page.getByLabel("Titre*");
    await expect(titleInput).toBeVisible();
    await fillListName(page);
    await page.getByRole("button", { name: /Créer une liste/i }).click();

    //Expects the new list is visible
    const listItem = page.getByText("Playwright List");
    await expect(listItem).toBeVisible();
});
