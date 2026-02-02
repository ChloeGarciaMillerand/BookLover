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

async function fillListName(page: Page, name = "Playwright List") {
    await page.getByLabel("Titre*").fill(name);
}

async function fillBookName(page: Page, title = "Test title") {
    await page.getByLabel("Titre*").fill(title);
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

test("Authenticated users can update lists", async ({ page }) => {
    // connexion
    await using _test = await setup();
    await signin(page);

    //create a list
    await page.getByRole("button", { name: /Créer une liste/i }).click();
    await page.waitForURL("/add-list");
    await fillListName(page);
    await page.getByRole("button", { name: /Créer une liste/i }).click();

    // check list title and click
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
