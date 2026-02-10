import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";
import { createList } from "tests/helpers/createList";
import { createBook } from "tests/helpers/createBook";
import { openListAndGetId } from "tests/helpers/openListAndGetId";

test("Authenticated users can delete books", async ({ page, testUser }) => {
    const listName = "Playwright List";

    // connexion
    await signin(page, testUser.email, testUser.password);

    //create a list
    await createList(page);

    // navigate to test list and get the id of the list
    const listId = await openListAndGetId(page, listName);

    // create a book
    await createBook(page, listId);

    // accept confirmation
    page.once("dialog", async (dialog) => {
        await dialog.accept();
    });

    // delete book
    await page.getByRole("button", { name: /Supprimer le livre/i }).click();

    //Expects the list doesn't exist anymore
    await expect(page.getByRole("heading", { name: /Test title/i })).toHaveCount(0);
});
