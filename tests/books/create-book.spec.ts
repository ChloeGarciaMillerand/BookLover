import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";
import { createList } from "tests/helpers/createList";
import { createBook } from "tests/helpers/createBook";
import { openListAndGetId } from "tests/helpers/openListAndGetId";

test("Authenticated users can add book", async ({ page, testUser }) => {
    const listName = "Playwright List";

    // connexion
    await signin(page, testUser.email, testUser.password);

    // create a list
    await createList(page);

    // navigate to test list and get the id of the list
    const listId = await openListAndGetId(page, listName);

    // create a book
    await createBook(page, listId);

    // expects the new book is visible
    const BookItem = page.getByText("Test title");
    await expect(BookItem).toBeVisible();
});
