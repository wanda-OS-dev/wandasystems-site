import 'global-jsdom/register';
import { test, describe, afterEach, beforeEach, mock } from 'node:test';
import assert from 'node:assert';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import ContactForm from './ContactForm.tsx';

// Make React globally available for JSX runtime when running tests via tsx
(global as any).React = React;

describe('ContactForm', () => {
    let originalFetch: typeof global.fetch;

    beforeEach(() => {
        originalFetch = global.fetch;
    });

    afterEach(() => {
        global.fetch = originalFetch;
        // cleanup DOM
        document.body.innerHTML = '';
    });

    test('should show error state on fetch failure', async () => {
        global.fetch = mock.fn(async () => {
            return {
                ok: false,
                status: 500,
                json: async () => ({})
            } as Response;
        });

        render(<ContactForm />);

        const nameInput = screen.getByLabelText(/Name/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const messageInput = screen.getByLabelText(/Your Request/i);
        const submitButton = screen.getByRole('button', { name: /Send message/i });

        fireEvent.change(nameInput, { target: { value: 'Test User' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            const errorMessage = screen.getByText(/Submission failed/i);
            assert.ok(errorMessage);
        });
    });
});
