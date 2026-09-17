import { expect, test } from '@playwright/test';

const todoUrl = 'https://demo.playwright.dev/todomvc/';

test.beforeEach(async ({ page }) => {
  await page.goto(todoUrl);
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
});

test('keeps a todo after reload', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Keep this task');
  await input.press('Enter');

  await page.reload();
  await expect(page.locator('.todo-list li')).toHaveText('Keep this task');
});

test('keeps completion state after reload', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Finish this task');
  await input.press('Enter');
  await page.locator('.todo-list li .toggle').check();

  await page.reload();
  await expect(page.locator('.todo-list li .toggle')).toBeChecked();
});

test('keeps an edited todo after reload', async ({ page }) => {
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Original task');
  await input.press('Enter');
  await page.locator('.todo-list li label').dblclick();

  const editInput = page.locator('.todo-list li .edit');
  await editInput.fill('Updated task');
  await editInput.press('Enter');

  await page.reload();
  await expect(page.locator('.todo-list li')).toHaveText('Updated task');
});
