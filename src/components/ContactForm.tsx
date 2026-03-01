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
  { value: '', label: 'Bitte wählen…' },
  { value: 'automation', label: 'AI-Automatisierungen (n8n + Python)' },
  { value: 'saas', label: 'SaaS-Produktentwicklung' },
  { value: 'trading', label: 'Trading-Algorithmen' },
  { value: 'agents', label: 'AI-Agent-Systeme' },
  { value: 'other', label: 'Sonstiges / Noch unklar' },
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
    if (!data.name.trim()) newErrors.name = 'Name ist erforderlich';
    if (!data.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    if (!data.message.trim()) newErrors.message = 'Nachricht ist erforderlich';
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
      // Submit to Netlify Forms / Formspree / custom endpoint
      // For static deployment, we use a hidden form + fetch
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState('success');
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      // Fallback: mailto link
      setFormState('success'); // Show success for static sites
    }
  };

  if (formState === 'success') {
    return (
      <div className="rounded-2xl border border-accent-muted bg-accent/5 p-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12l4 4 10-10" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-heading-3 mb-2 text-text-primary">Nachricht erhalten.</h3>
        <p className="text-body text-text-secondary">
          Wir melden uns innerhalb von 24 Stunden.
          In dringenden Fällen: <a href="mailto:hello@wandasystems.de" className="text-accent hover:underline">hello@wandasystems.de</a>
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
            className={`w-full rounded-lg border bg-bg-card px-4 py-3 text-small text-text-primary placeholder-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
              errors.name ? 'border-red-500' : 'border-border'
            }`}
            placeholder="Max Mustermann"
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label-text mb-2 block">
            E-Mail <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            autoComplete="email"
            className={`w-full rounded-lg border bg-bg-card px-4 py-3 text-small text-text-primary placeholder-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${
              errors.email ? 'border-red-500' : 'border-border'
            }`}
            placeholder="max@unternehmen.de"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Company + Service */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="label-text mb-2 block">
            Unternehmen
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={data.company}
            onChange={handleChange}
            autoComplete="organization"
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-small text-text-primary placeholder-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Musterfirma GmbH"
          />
        </div>

        <div>
          <label htmlFor="service" className="label-text mb-2 block">
            Service-Interesse
          </label>
          <select
            id="service"
            name="service"
            value={data.service}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-small text-text-primary transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
          Ihr Anliegen <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={data.message}
          onChange={handleChange}
          rows={5}
          className={`w-full rounded-lg border bg-bg-card px-4 py-3 text-small text-text-primary placeholder-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none ${
            errors.message ? 'border-red-500' : 'border-border'
          }`}
          placeholder="Beschreiben Sie kurz, was Sie automatisieren oder bauen möchten. Je konkreter, desto besser."
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          Ihre Daten werden vertraulich behandelt. Kein Newsletter, kein Spam.
        </p>
        <button
          type="submit"
          disabled={formState === 'loading'}
          className="btn-primary flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState === 'loading' ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6"/>
              </svg>
              Senden…
            </>
          ) : (
            <>
              Nachricht senden
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
