import { test, expect } from "tests/fixtures/auth";
import { signin } from "tests/helpers/signin";
import { createList } from "tests/helpers/createList";

test("Authenticated users can create lists", async ({ page, testUser }) => {
    // connexion
    await signin(page, testUser.email, testUser.password);

    // check heading
    const heading = page.getByRole("heading", { level: 1, name: /My Lists/i });
    await expect(heading).toBeVisible();

    // check button
    const button = page.getByRole("button", { name: /Create a list/i });
    await expect(button).toBeVisible();

    // create a list
    await createList(page);

    // check list title
    const headingList = page.getByRole("heading", { name: /Playwright List/i });
    await expect(headingList).toBeVisible();
});
