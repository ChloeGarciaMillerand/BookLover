import type { Page } from "@playwright/test";

export async function editListName(page: Page, name = "Updated Playwright List") {
    await page.getByLabel("Titre*").fill(name);
}
