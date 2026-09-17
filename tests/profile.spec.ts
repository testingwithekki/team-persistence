import { expect, test } from '@playwright/test';

test('displays a profile name', async ({ page }) => {
  await page.setContent('<h1>Alex Morgan</h1>');
  await expect(page.getByRole('heading', { name: 'Alex Morgan' })).toBeVisible();
});

test('saves an edited display name', async ({ page }) => {
  await page.setContent(`
    <input aria-label="Display name" value="Alex" />
    <button onclick="document.querySelector('#saved').textContent =
      document.querySelector('input').value">Save</button>
    <span id="saved"></span>
  `);

  await page.getByRole('textbox', { name: 'Display name' }).fill('Morgan');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#saved')).toHaveText('Morgan');
});

test('requires a display name', async ({ page }) => {
  await page.setContent('<input aria-label="Display name" required /><button>Save</button>');
  const valueMissing = await page.getByRole('textbox', { name: 'Display name' })
    .evaluate((input: HTMLInputElement) => input.validity.valueMissing);
  expect(valueMissing).toBe(true);
});
