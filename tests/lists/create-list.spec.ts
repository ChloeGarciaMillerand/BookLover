import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";
import { fillListName } from "tests/helpers/fillListName";

test("Authenticated users can create lists", async ({ page, testUser }) => {
    // connexion
    await signin(page, testUser.email, testUser.password);

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
