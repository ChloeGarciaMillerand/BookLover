import type { Page } from "@playwright/test";
import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";

async function fillListName(page: Page, name = "Playwright List") {
    await page.getByLabel("Titre*").fill(name);
}

async function fillBookName(page: Page, title = "Test title") {
    await page.getByLabel("Titre*").fill(title);
}

test("Authenticated users can add book", async ({ page, testUser }) => {
    // connexion
    await signin(page, testUser.email, testUser.password);

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
