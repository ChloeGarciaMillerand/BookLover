import type { Page } from "@playwright/test";

export async function fillBookName(page: Page, title = "Test title") {
    await page.getByLabel("Titre*").fill(title);
}
