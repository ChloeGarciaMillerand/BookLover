import type { Page } from "@playwright/test";
import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";

async function fillListName(page: Page, name = "Playwright List") {
    await page.getByLabel("Titre*").fill(name);
}

test("Authenticated users can delete lists", async ({ page, testUser }) => {
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

    // accept confirmation
    page.once("dialog", async (dialog) => {
        await dialog.accept();
    });

    // delete list
    await page.getByRole("button", { name: /Supprimer la liste/i }).click();

    //Expects the list doesn't exist anymore
    await expect(page.getByRole("heading", { name: /Playwright List/i })).toHaveCount(0);
});
