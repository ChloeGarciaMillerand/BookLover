import { test, expect, type Page } from "@playwright/test";
import { supabase } from "tests/supabase";

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

async function signin(page: Page, email = "chloe@test.com", password = "grosmotdepasse") {
    await page.goto("/signin");
    await page.getByLabel("Email*").fill(email);
    await page.getByLabel("Mot de passe*").fill(password);
    await page.getByRole("button", { name: /OK/i }).click();
}

async function fillListName(page: Page, name = "Playwright List") {
    await page.getByLabel("Titre*").fill(name);
}

async function fillBookName(page: Page, title = "Test title") {
    await page.getByLabel("Titre*").fill(title);
}

test("Authenticated users can add book", async ({ page }) => {
    // connexion
    await using _test = await setup();
    await signin(page);

    //create a list
    await page.getByRole("button", { name: /Créer une liste/i }).click();
    await page.waitForURL("/add-list");
    await fillListName(page);
    await page.getByRole("button", { name: /Créer une liste/i }).click();

    // check list title
    const heading = page.getByRole("heading", { name: /Playwright List/i });
    await expect(heading).toBeVisible();

    // navigate to test list
    await heading.click();
    await page.waitForURL(/\/list\/.+/);

    // get the id of the list
    const url = page.url();
    const listId = url.split("/list/")[1];

    // create a book
    await page.getByRole("button", { name: /Ajouter un livre/i }).click();
    await page.waitForURL(`/list/${listId}/add-book`);

    const titleInput = page.getByLabel("Titre*");
    await expect(titleInput).toBeVisible();
    await fillBookName(page);
    await page.getByRole("button", { name: /Ajouter un livre/i }).click();

    //Expects the new book is visible
    const BookItem = page.getByText("Test title");
    await expect(BookItem).toBeVisible();
});
