import type { Page } from "@playwright/test";

export async function signin(page: Page, email: string, password: string) {
    await page.goto("/signin");
    await page.getByLabel("Email*").fill(email);
    await page.getByLabel("Mot de passe*").fill(password);
    await page.getByRole("button", { name: /OK/i }).click();
}
