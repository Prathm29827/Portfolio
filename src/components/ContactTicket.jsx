import { useState } from 'react';
import Reveal from './Reveal.jsx';

const PRIORITY_OPTIONS = [
  { value: '', label: 'Select priority…' },
  { value: 'Low', label: 'Low — Consultation' },
  { value: 'Medium', label: 'Medium — Collaboration' },
  { value: 'Critical', label: 'Critical — Hiring' },
];

const PRIORITY_BADGE = {
  Low: 'text-teal border-teal/40 bg-teal/10',
  Medium: 'text-amber border-amber/40 bg-amber/10',
  Critical: 'text-crimson border-crimson/40 bg-crimson/10',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM = { name: '', email: '', priority: '', description: '' };

/**
 * Pure client-side validation. Returns an object keyed by field name —
 * an empty object means the form is valid. No field is optional here;
 * a missing required value is treated the same way a missing required
 * parameter would be treated by a strict API contract.
 */
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'required parameter "name" is undefined';
  if (!form.email.trim()) errors.email = 'required parameter "email" is undefined';
  else if (!EMAIL_PATTERN.test(form.email.trim()))
    errors.email = 'value failed format validation: expected user@domain.tld';
  if (!form.priority) errors.priority = 'required parameter "priority" is undefined';
  if (!form.description.trim())
    errors.description = 'required parameter "description" is undefined';
  else if (form.description.trim().length < 10)
    errors.description = 'value too short — minimum 10 characters expected';
  return errors;
}

export default function ContactTicket() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [ticket, setTicket] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setAttempted(true);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }

    setStatus('submitting');
    // Simulated network round-trip — swap for a real endpoint
    // (e.g. Formspree or EmailJS) when wiring this up to live email delivery.
    setTimeout(() => {
      setTicket({
        id: `QA-${Math.floor(1000 + Math.random() * 9000)}`,
        ...form,
        loggedAt: new Date().toLocaleString(),
      });
      setStatus('success');
    }, 900);
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setAttempted(false);
    setStatus('idle');
    setTicket(null);
  };

  const fieldClass = (field) =>
    `w-full bg-ink border rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 transition-all duration-200 outline-none ${
      errors[field]
        ? 'border-crimson shadow-[0_0_0_3px_rgba(244,63,94,0.15)]'
        : 'border-line focus:border-cyan focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]'
    }`;

  return (
    <section id="contact" className="relative px-5 sm:px-8 py-24 max-w-3xl mx-auto">
      <Reveal>
        <p className="font-mono text-xs text-teal mb-3 tracking-wide">[NEW_TICKET]</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
          Open a ticket
        </h2>
        <p className="text-slate-400 leading-relaxed mb-10">
          Hiring, collaboration, or just want to talk testing strategy? File
          a ticket below — it gets read by an actual human, not a triage bot.
        </p>
      </Reveal>

      <Reveal>
        <div
          className={`glass-card rounded-xl overflow-hidden ${shake ? 'animate-shake' : ''}`}
        >
          {/* Ticket header bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-surfacealt/60">
            <span className="font-mono text-xs text-slate-400">
              new_ticket.portal
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              project: portfolio-contact
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {status === 'success' && ticket ? (
              <div className="animate-popIn">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-teal/15 text-teal text-lg">
                    ✓
                  </span>
                  <div>
                    <p className="text-slate-100 font-semibold">
                      Issue Logged Successfully
                    </p>
                    <p className="text-slate-500 text-xs font-mono">
                      Your message has been received.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-line bg-ink/60 p-5 font-mono text-sm space-y-3">
                  <div className="flex justify-between border-b border-line/70 pb-3">
                    <span className="text-slate-500">ticket_id</span>
                    <span className="text-cyan font-semibold">{ticket.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">reporter</span>
                    <span className="text-slate-200">{ticket.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">contact</span>
                    <span className="text-slate-200">{ticket.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">priority</span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded border ${PRIORITY_BADGE[ticket.priority]}`}
                    >
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">logged_at</span>
                    <span className="text-slate-200">{ticket.loggedAt}</span>
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="mt-6 font-mono text-xs px-5 py-2.5 rounded-lg border border-line text-slate-300 hover:border-cyan/60 hover:text-cyan transition-all duration-200"
                >
                  file_another_ticket()
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {attempted && Object.keys(errors).length > 0 && (
                  <div className="mb-6 rounded-lg border border-crimson/40 bg-crimson/10 px-4 py-3 flex items-start gap-2.5">
                    <span className="text-crimson mt-0.5">⚠</span>
                    <p className="font-mono text-xs text-crimson-soft leading-relaxed">
                      Unhandled exception: {Object.keys(errors).length} required
                      parameter(s) missing or invalid. See fields below.
                    </p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-2">
                      reporter_name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Jane Doe"
                      className={fieldClass('name')}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-crimson font-mono">
                        ⚠ {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-2">
                      contact_email *
                    </label>
                    <input
                      type="text"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="jane@company.com"
                      className={fieldClass('email')}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-crimson font-mono">
                        ⚠ {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block font-mono text-xs text-slate-400 mb-2">
                    ticket_priority *
                  </label>
                  <select
                    value={form.priority}
                    onChange={handleChange('priority')}
                    className={`${fieldClass('priority')} appearance-none cursor-pointer`}
                  >
                    {PRIORITY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-ink">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.priority && (
                    <p className="mt-1.5 text-xs text-crimson font-mono">
                      ⚠ {errors.priority}
                    </p>
                  )}
                </div>

                <div className="mt-5">
                  <label className="block font-mono text-xs text-slate-400 mb-2">
                    description *
                  </label>
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={handleChange('description')}
                    placeholder="What are we working on?"
                    className={`${fieldClass('description')} resize-none`}
                  />
                  {errors.description && (
                    <p className="mt-1.5 text-xs text-crimson font-mono">
                      ⚠ {errors.description}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-7 w-full sm:w-auto px-7 py-3 rounded-lg bg-cyan text-void font-semibold text-sm tracking-wide hover:bg-cyan-soft hover:shadow-[0_0_24px_rgba(34,211,238,0.45)] transition-all duration-200 disabled:opacity-60 disabled:cursor-wait"
                >
                  {status === 'submitting' ? 'Logging ticket…' : 'Submit Ticket'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
