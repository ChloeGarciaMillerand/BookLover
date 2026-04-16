import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";
import { fillInput } from "tests/helpers/fillInput";
import { createList } from "tests/helpers/createList";
import { createBook } from "tests/helpers/createBook";
import { openListAndGetId } from "tests/helpers/openListAndGetId";

test("Authenticated users can update books", async ({ page, testUser }) => {
    const listName = "Playwright List";

    // connexion
    await signin(page, testUser.email, testUser.password);

    //create a list
    await createList(page);

    // navigate to test list and get the id of the list
    const listId = await openListAndGetId(page, listName);

    // create a book
    await createBook(page, listId);

    // navigate to edit book
    await page.getByRole("link", { name: /Edit the book/i }).click();
    await page.waitForURL(/\/edit-book\/.+/);

    //update book
    const titleEditInput = page.getByLabel(/Title/i);
    await expect(titleEditInput).toBeVisible();
    await fillInput(titleEditInput, "Updated Playwright Book");
    await page.getByRole("button", { name: /Update the book/i }).click();

    //expects the book name is updated
    const updatedBook = page.getByText("Updated Playwright Book");
    await expect(updatedBook).toBeVisible();
});
