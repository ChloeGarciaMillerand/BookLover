import { expect, type Page } from "@playwright/test";
import { fillBookName } from "tests/helpers/fillBookName";

export async function createBook(page: Page, listId: string) {
    await page.getByRole("button", { name: /Ajouter un livre/i }).click();
    await page.waitForURL(`/list/${listId}/add-book`);

    const titleInput = page.getByLabel("Titre*");
    await expect(titleInput).toBeVisible();
    await fillBookName(page);
    await page.getByRole("button", { name: /Ajouter un livre/i }).click();
}
