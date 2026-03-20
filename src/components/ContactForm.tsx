import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
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
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!data.message.trim()) newErrors.message = 'Message is required';
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
    if (!validate()) return;

    setFormState('loading');

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

      const response = await fetch('https://formspree.io/f/xpwzogdb', {
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
      <div className="rounded-2xl border border-white/5 bg-brand-gold/5 p-10 text-center" aria-live="assertive">
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
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-text mb-2 block">
            Name <span className="text-red-400">*</span>
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
            Email <span className="text-red-400">*</span>
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
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-small text-text-primary placeholder-text-muted transition-colors focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
            placeholder="Acme Corp"
          />
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
          Your Request <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={data.message}
          onChange={handleChange}
          rows={5}
          // Security: Limit input length to prevent excessively large payloads
          maxLength={2000}
          className={`w-full rounded-lg border bg-bg-card px-4 py-3 text-small text-text-primary placeholder-text-muted transition-colors focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none ${
            errors.message ? 'border-red-500' : 'border-border'
          }`}
          placeholder="Briefly describe what you want to automate or build. The more specific, the better."
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400" role="alert" aria-live="polite">
            {errors.message}
          </p>
        )}
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
    </form>
  );
}
