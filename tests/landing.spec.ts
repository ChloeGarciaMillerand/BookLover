import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
    await page.goto("/landing");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("BookLover - Accueil");
});

test("display landing page", async ({ page }) => {
    await page.goto("/landing");

    // Click the get started link.
    const heading = page.getByRole("heading", { level: 1, name: /BookLover/i });

    // Expects page to have a heading with the name of Installation.
    await expect(heading).toBeVisible();
});
