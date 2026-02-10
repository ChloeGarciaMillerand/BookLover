import type { Page } from "@playwright/test";

export async function openListAndGetId(page: Page, name: string) {
    const heading = page.getByRole("heading", { name: new RegExp(name, "i") });
    await heading.click();
    await page.waitForURL(/\/list\/.+/);

    return page.url().split("/list/")[1];
}
