import { test, expect } from "@playwright/test";

test.describe("ブログ削除機能", () => {
  test("投稿済みの記事を削除し、変更が反映されること", async ({ page }) => {
    //削除対象の記事を作成する
    const uniqueId = crypto.randomUUID().slice(0, 8);
    const initialTitle = `削除対象-${uniqueId}`;
    await page.goto("/blog/add");
    await page.fill('input[name="title"]', initialTitle);
    await page.fill('textarea[name="description"]', "削除対象の投稿");

    await page.getByRole("button", { name: "投稿" }).click();

    await expect(page).toHaveURL("/");

    // 作成した記事の編集画面に遷移
    const blogItem = page.locator("li", { hasText: initialTitle });
    await blogItem.getByRole("link", { name: "編集" }).click();

    //既存データが表示されているか確認して、削除ボタンをクリック
    await expect(page.locator('input[name="title"]')).toHaveValue(initialTitle);
    await page.getByRole("button", { name: "削除" }).click();

    // 古いタイトルが消え、新しいタイトルが表示されていることを確認
    await expect(page).toHaveURL("/");
    await expect(page.locator("body")).not.toHaveText(initialTitle);
  });
});
