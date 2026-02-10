import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";
import { fillListName } from "tests/helpers/fillListName";
import { editListName } from "tests/helpers/editListName";

test("Authenticated users can update lists", async ({ page, testUser }) => {
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

    // navigate to edit list
    await page.getByRole("link", { name: /Modifier la liste/i }).click();
    await page.waitForURL(/\/edit-list\/.+/);

    // update list
    const titleInput = page.getByLabel("Titre*");
    await expect(titleInput).toBeVisible();
    await editListName(page);
    await page.getByRole("button", { name: /Modifier la liste/i }).click();

    //Expects the list name is updated
    const ListItem = page.getByText("Updated Playwright List");
    await expect(ListItem).toBeVisible();
});
