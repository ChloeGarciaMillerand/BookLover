import { test, expect, type Page } from "@playwright/test";
import { supabase } from "./supabase";

async function setup() {
    const { data, error } = await supabase.auth.admin.createUser({
        email: "chloe@test.com",
        password: "grosmotdepasse",
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
            await supabase.auth.admin.deleteUser(data.user.id);
        },
    };
}

async function signin(page: Page, email = "chloe@test.com", password = "grosmotdepasse") {
    await page.goto("/signin");
    await page.getByLabel("Email*").fill(email);
    await page.getByLabel("Mot de passe*").fill(password);
    await page.getByRole("button", { name: /OK/i }).click();
}

test("Authenticated users can create lists", async ({ page }) => {
    await using _test = await setup();
    await signin(page);
    const heading = page.getByRole("heading", { level: 1, name: /Mes listes/i });

    // Expects page to have a heading with the name of Installation.
    await expect(heading).toBeVisible();

    const button = page.getByRole("button", { name: /Créer une liste/i });

    // Expects page to have a heading with the name of Installation.
    await expect(button).toBeVisible();
});
