import { useState, useEffect, useRef } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  _gotcha: string;
}

const serviceOptions = [
  { value: '', label: 'Please select...' },
  { value: 'automation', label: 'AI Automations (n8n + Python)' },
  { value: 'saas', label: 'SaaS Product Development' },
  { value: 'agents', label: 'AI Agent Systems' },
  { value: 'other', label: 'Other / Not sure yet' },
];

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 🎨 Palette: Accessibility Enhancement
    // 💡 What: Programmatically focus the success message container upon form success.
    // 🎯 Why: When the form is submitted and unmounted, focus is lost, resetting to the body. This prevents keyboard/screen reader users from losing their context.
    if (formState === 'success' && successRef.current) {
      successRef.current.focus();
    }
  }, [formState]);

  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    _gotcha: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    // Check if there is a 'service' query parameter to pre-fill intent
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam && serviceOptions.some((opt) => opt.value === serviceParam)) {
      setData((prev) => ({ ...prev, service: serviceParam }));
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (data.name.length > 100) {
      newErrors.name = 'Name must be 100 characters or less';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (data.email.length > 254) {
      newErrors.email = 'Email must be 254 characters or less';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (data.company && data.company.length > 100) {
      newErrors.company = 'Company must be 100 characters or less';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (data.message.length > 2000) {
      newErrors.message = 'Message must be 2000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // 🎨 Palette: Accessibility Enhancement
      // 💡 What: Auto-focus the first invalid input on form submission failure.
      // 🎯 Why: Improves keyboard navigation and assists screen reader users by immediately directing them to the error.
      // ⚡ Bolt: Wrapped in setTimeout to defer execution until after React has rendered the error states and aria-invalid attributes.
      setTimeout(() => {
        const firstInvalidElement = document.querySelector('[aria-invalid="true"]');
        if (firstInvalidElement instanceof HTMLElement) {
          firstInvalidElement.focus();
        }
      }, 0);
      return;
    }

    setFormState('loading');

    // Security: Honeypot check to prevent automated spam bot submissions.
    // Real users will not see or fill this visually hidden field.
    if (data._gotcha) {
      // Simulate successful submission to fool the bot without sending real data
      setTimeout(() => setFormState('success'), 1000);
      return;
    }

    try {
      const payload = new FormData();
      payload.append('name', data.name);
      payload.append('email', data.email);
      payload.append('company', data.company);
      payload.append('service', data.service);
      payload.append('message', data.message);

      // Security: Add timeout to external API calls to prevent hanging and resource exhaustion
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch('https://wanda.lazytechlab.de/n8n/webhook/customer-inquiry', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setFormState('success');
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-2xl border border-white/5 bg-brand-gold/5 p-10 text-center focus:outline-none"
        aria-live="assertive"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/15">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12l4 4 10-10" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-heading-3 mb-2 text-text-primary">Message received.</h3>
        <p className="text-body text-text-secondary">
          We will get back to you within 24 hours.
          For urgent matters: <a href="mailto:wanda.devops@gmail.com" className="text-brand-gold hover:underline">wanda.devops@gmail.com</a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          e.currentTarget.requestSubmit();
        }
      }}
      noValidate
      className="space-y-6"
    >
      {/* Security: Honeypot field. Must remain empty. */}
      <input
        type="text"
        name="_gotcha"
        value={data._gotcha}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-text mb-2 block">
            Name <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            autoComplete="name"
            // Security: Limit input length to prevent excessively large payloads
            maxLength={100}
            aria-required="true"
            className={`w-full rounded-lg border bg-bg-card px-4 py-3 text-small text-text-primary placeholder-text-muted transition-colors focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold ${
              errors.name ? 'border-red-500' : 'border-border'
            }`}
            placeholder="John Doe"
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400" role="alert" aria-live="polite">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label-text mb-2 block">
            Email <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            autoComplete="email"
            // Security: Limit input length to prevent excessively large payloads
            maxLength={254}
            aria-required="true"
            className={`w-full rounded-lg border bg-bg-card px-4 py-3 text-small text-text-primary placeholder-text-muted transition-colors focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold ${
              errors.email ? 'border-red-500' : 'border-border'
            }`}
            placeholder="john@company.com"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400" role="alert" aria-live="polite">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Company + Service */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="label-text mb-2 block">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={data.company}
            onChange={handleChange}
            autoComplete="organization"
            // Security: Limit input length to prevent excessively large payloads
            maxLength={100}
            className={`w-full rounded-lg border bg-bg-card px-4 py-3 text-small text-text-primary placeholder-text-muted transition-colors focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold ${
              errors.company ? 'border-red-500' : 'border-border'
            }`}
            placeholder="Acme Corp"
            aria-describedby={errors.company ? 'company-error' : undefined}
            aria-invalid={!!errors.company}
          />
          {errors.company && (
            <p id="company-error" className="mt-1.5 text-xs text-red-400" role="alert" aria-live="polite">
              {errors.company}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="label-text mb-2 block">
            Service Interest
          </label>
          <select
            id="service"
            name="service"
            value={data.service}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-small text-text-primary transition-colors focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
          >
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-bg-card">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label-text mb-2 block">
          Your Request <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={data.message}
          onChange={handleChange}
          rows={5}
          // Security: Limit input length to prevent excessively large payloads
          maxLength={2000}
          aria-required="true"
          aria-keyshortcuts="Control+Enter Meta+Enter"
          className={`w-full rounded-lg border bg-bg-card px-4 py-3 text-small text-text-primary placeholder-text-muted transition-colors focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none ${
            errors.message ? 'border-red-500' : 'border-border'
          }`}
          placeholder="Briefly describe what you want to automate or build. The more specific, the better."
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        <div className="mt-1.5 flex items-center justify-between">
          {errors.message ? (
            <p id="message-error" className="text-xs text-red-400" role="alert" aria-live="polite">
              {errors.message}
            </p>
          ) : (
            <div />
          )}
          <p
            className={`text-[10px] font-medium uppercase tracking-widest transition-colors ${
              data.message.length >= 1900 ? 'text-red-400' : 'text-text-muted'
            }`}
            aria-hidden="true"
          >
            {data.message.length} / 2000
          </p>
          {/* 🎨 Palette: Accessibility Enhancement
              Conditionally render visually hidden text for screen readers when approaching the limit.
              This prevents overwhelming the user with announcements on every keystroke. */}
          {data.message.length >= 1900 && (
            <p className="sr-only" aria-live="polite">
              {2000 - data.message.length} characters remaining
            </p>
          )}
        </div>
      </div>

      {formState === 'error' && (
        <p className="text-sm text-red-400" aria-live="assertive">
          Submission failed. Please write directly to{' '}
          <a href="mailto:wanda.devops@gmail.com" className="text-brand-gold hover:underline">wanda.devops@gmail.com</a>.
        </p>
      )}

      {/* Submit */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          Your data is treated confidentially. No newsletter, no spam.
        </p>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-text-muted sm:inline-block" aria-hidden="true">
            Press <kbd className="font-sans rounded border border-border bg-bg-card px-1 py-0.5 text-[10px]">Cmd</kbd> + <kbd className="font-sans rounded border border-border bg-bg-card px-1 py-0.5 text-[10px]">Enter</kbd> to submit
          </span>
          <button
            type="submit"
            aria-busy={formState === 'loading'}
            disabled={formState === 'loading'}
            className="btn-primary flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
          {formState === 'loading' ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6"/>
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send message
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
        </div>
      </div>
    </form>
  );
}
