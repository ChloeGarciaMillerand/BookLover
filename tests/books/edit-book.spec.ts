import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";
import { fillInput } from "tests/helpers/fillInput";

test("Authenticated users can update books", async ({ page, testUser }) => {
    // connexion
    await signin(page, testUser.email, testUser.password);

    //create a list
    await page.getByRole("button", { name: /Créer une liste/i }).click();
    await page.waitForURL("/add-list");
    await fillInput(page.getByLabel("Titre*"), "Playwright List");
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
    await fillInput(titleInput, "Test title");
    await page.getByRole("button", { name: /Ajouter un livre/i }).click();

    // expects the new book is visible
    const BookItem = page.getByText("Test title");
    await expect(BookItem).toBeVisible();

    // navigate to edit book
    await page.getByRole("link", { name: /Modifier le livre/i }).click();
    await page.waitForURL(/\/edit-book\/.+/);

    //update book
    const titleEditInput = page.getByLabel("Titre*");
    await expect(titleEditInput).toBeVisible();
    await fillInput(titleEditInput, "Updated Playwright Book");
    await page.getByRole("button", { name: /Modifier le livre/i }).click();

    //expects the book name is updated
    const updatedBook = page.getByText("Updated Playwright Book");
    await expect(updatedBook).toBeVisible();
});
