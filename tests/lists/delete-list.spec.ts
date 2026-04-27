import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";
import { createList } from "tests/helpers/createList";

test("Authenticated users can delete lists", async ({ page, testUser }) => {
    // connexion
    await signin(page, testUser.email, testUser.password);

    //create a list
    await createList(page);

    // accept confirmation
    page.once("dialog", async (dialog) => {
        await dialog.accept();
    });

    //open dropdown menu
    await page.getByRole("button", { name: /open menu/i }).click();

    // delete list
    await page.getByRole("button", { name: /Delete the list/i }).click();

    //Expects the list doesn't exist anymore
    await expect(page.getByRole("heading", { name: /Playwright List/i })).toHaveCount(0);
});
