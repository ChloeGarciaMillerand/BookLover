import type { Page } from "@playwright/test";

export async function signin(page: Page, email: string, password: string) {
    await page.goto("/signin");
    await page.getByLabel(/email/i).fill(email);
    //await page.getByLabel(/password/i).fill(password);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: /Sign In/i }).click();
}
