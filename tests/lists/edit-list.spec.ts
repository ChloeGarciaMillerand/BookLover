import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";
import { createList } from "tests/helpers/createList";
import { fillInput } from "tests/helpers/fillInput";

test("Authenticated users can update lists", async ({ page, testUser }) => {
    // connexion
    await signin(page, testUser.email, testUser.password);

    //create a list
    await createList(page);

    // navigate to edit list
    await page.getByRole("link", { name: /Modifier la liste/i }).click();
    await page.waitForURL(/\/edit-list\/.+/);

    // update list
    const titleInput = page.getByLabel("Titre*");
    await expect(titleInput).toBeVisible();
    await fillInput(titleInput, "Updated Playwright List");
    await page.getByRole("button", { name: /Modifier la liste/i }).click();

    //Expects the list name is updated
    const ListItem = page.getByText("Updated Playwright List");
    await expect(ListItem).toBeVisible();
});
