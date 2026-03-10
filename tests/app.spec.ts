import { test, expect } from '@playwright/test'
 
test('should navigate to the about page', async ({ page }) => {
  // インデックスページから開始（baseURLはplaywright.config.tsのwebServerを通じて設定されています）
  await page.goto('/')
  // 'About'というテキストを持つ要素を見つけてクリックします
  await page.click('text=ブログ新規作成')
  // 新しいURLは "/about" になるはずです（baseURLがここで使用されます）
  await expect(page).toHaveURL('/blog/add')
  // 新しいページには "About" という見出しh1が含まれているはずです
  await expect(page.locator('h1')).toContainText('ブログ新規作成')
})