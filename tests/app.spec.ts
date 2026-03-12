import { test, expect } from '@playwright/test';

test.describe('ブログ基本機能', () => {
  test('新規投稿を作成し、一覧画面に表示されること', async ({ page }) => {
    //ホーム画面（一覧）にアクセス
    await page.goto('/');

    //ブログ新規作成」リンクをクリックして画面遷移を確認
    await page.getByRole('link', { name: 'ブログ新規作成' }).click();
    await expect(page).toHaveURL('/blog/add');

    //フォームに入力
    const uniqueTitle = `テスト記事: ${Date.now()}`;
    const uniqueContent = 'これはPlaywrightによって自動生成された本文です。';

    // name属性（title, content）で要素を特定して入力
    await page.fill('input[name="title"]', uniqueTitle);
    await page.fill('textarea[name="description"]', uniqueContent);

    // 投稿ボタンをクリック
    await page.getByRole('button', { name: "投稿" }).click();

    // ホーム画面（/）にリダイレクトされることを確認
    await expect(page).toHaveURL('/');

    // 新しく作成したタイトルが一覧の中に含まれているか検証
    const blogList = page.locator('body');
    await expect(blogList).toContainText(uniqueTitle);
  });
});