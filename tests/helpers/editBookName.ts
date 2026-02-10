import type { Page } from "@playwright/test";

export async function editBookName(page: Page, name = "Updated Playwright Book") {
    await page.getByLabel("Titre*").fill(name);
}
