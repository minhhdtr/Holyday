import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/';

test('should allow user to sign in', async ({ page }) => {
  await page.goto(BASE_URL);

  // get the sign in button and click it
  await page.getByRole('link', { name: 'Sign in' }).click();

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

  // fill in the email and password fields
  await page.locator('input[name="email"]').fill('email@gmail.com');
  await page.locator('input[name="password"]').fill('password');

  // click the sign in button
  await page.getByRole('button', { name: 'Sign in' }).click();


  await expect(page.getByText('Sign in successful')).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test('should allow user to register', async ({ page }) => {
  const email = `testuser${Date.now()}@example.com`;

  await page.goto(BASE_URL);

  // get the sign up button and click it
  await page.getByRole('link', { name: 'Register' }).click();

  await page.locator('input[name="firstName"]').fill('John');
  await page.locator('input[name="lastName"]').fill('Doe');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('password');
  await page.locator('input[name="confirmPassword"]').fill('password');

  // click the sign up button
  await page.getByRole('button', { name: 'Create account' }).click();

  await expect(page.getByText('Registration successful')).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
