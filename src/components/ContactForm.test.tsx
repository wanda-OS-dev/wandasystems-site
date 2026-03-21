import { test, describe, afterEach } from 'node:test';
import assert from 'node:assert';
import 'global-jsdom/register';
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm Validation', () => {
  afterEach(() => {
    cleanup();
  });

  test('shows required errors when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    assert.strictEqual(screen.getByText('Name is required').textContent, 'Name is required');
    assert.strictEqual(screen.getByText('Email is required').textContent, 'Email is required');
    assert.strictEqual(screen.getByText('Message is required').textContent, 'Message is required');
  });

  test('validates incorrect email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/email/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    assert.strictEqual(screen.getByText('Invalid email address').textContent, 'Invalid email address');
  });

  test('accepts valid email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    assert.strictEqual(screen.queryByText('Email is required'), null);
    assert.strictEqual(screen.queryByText('Invalid email address'), null);
  });

  test('clears name error on change', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));
    assert.ok(screen.getByText('Name is required'));

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    assert.strictEqual(screen.queryByText('Name is required'), null);
  });

  test('clears email error on change', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));
    assert.ok(screen.getByText('Email is required'));

    await user.type(screen.getByLabelText(/email/i), 't');
    assert.strictEqual(screen.queryByText('Email is required'), null);
  });

  test('clears message error on change', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));
    assert.ok(screen.getByText('Message is required'));

    await user.type(screen.getByLabelText(/your request/i), 'A message');
    assert.strictEqual(screen.queryByText('Message is required'), null);
  });
});
