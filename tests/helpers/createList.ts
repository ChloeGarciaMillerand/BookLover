import type { Page } from "@playwright/test";
import { fillInput } from "tests/helpers/fillInput";

export async function createList(page: Page) {
    await page.getByRole("button", { name: /Créer une liste/i }).click();
    await page.waitForURL("/add-list");
    await fillInput(page.getByLabel("Titre*"), "Playwright List");
    await page.getByRole("button", { name: /Créer une liste/i }).click();
}
