import type { Page } from "@playwright/test";
import { fillListName } from "tests/helpers/fillListName";

export async function createList(page: Page) {
    await page.getByRole("button", { name: /Créer une liste/i }).click();
    await page.waitForURL("/add-list");
    await fillListName(page);
    await page.getByRole("button", { name: /Créer une liste/i }).click();
}
