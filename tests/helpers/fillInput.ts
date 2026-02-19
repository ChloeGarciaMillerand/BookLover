import type { Locator } from "@playwright/test";

export async function fillInput(input: Locator, value: string) {
    await input.clear();
    await input.fill(value);
}
