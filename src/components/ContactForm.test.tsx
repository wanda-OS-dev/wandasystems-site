import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from './ContactForm';
import React from 'react';

describe('ContactForm Error Path', () => {
  let originalFetch: typeof fetch;
  const mockFetch = vi.fn();

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = mockFetch;
    mockFetch.mockReset();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should display an error message if submission fails', async () => {
    // Mock fetch to return a failed response
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<ContactForm />);

    // Fill out the required fields
    fireEvent.change(screen.getByLabelText(/Name \*/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email \*/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Your Request \*/i), { target: { value: 'This is a test request.' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Send message/i }));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Submission failed\. Please write directly to/i)).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
