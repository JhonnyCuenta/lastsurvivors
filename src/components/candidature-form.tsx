'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Send } from 'lucide-react';

type ApplicationForm = {
  pseudoRp: string;
  age: string;
  experienceRp: string;
  characterStory: string;
  motivation: string;
  availability: string;
  rulesAccepted: boolean;
  website: string;
};

const initialForm: ApplicationForm = {
  pseudoRp: '',
  age: '',
  experienceRp: '',
  characterStory: '',
  motivation: '',
  availability: '',
  rulesAccepted: false,
  website: '',
};

export function CandidatureForm() {
  const [form, setForm] = useState<ApplicationForm>(initialForm);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  function updateField<K extends keyof ApplicationForm>(key: K, value: ApplicationForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    try {
      const response = await fetch('/api/candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setMessage({ type: 'error', text: data.error ?? 'Candidature refusee.' });
        return;
      }

      setForm(initialForm);
      setMessage({ type: 'success', text: 'Candidature envoyee au staff. Surveille Discord pour la suite.' });
    } catch {
      setMessage({ type: 'error', text: 'Impossible de contacter le portail pour le moment.' });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="application-form" onSubmit={onSubmit}>
      <input
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(event) => updateField('website', event.target.value)}
        aria-hidden="true"
      />

      <div className="form-grid">
        <label>
          <span>Pseudo RP</span>
          <input
            value={form.pseudoRp}
            onChange={(event) => updateField('pseudoRp', event.target.value)}
            maxLength={40}
            placeholder="Ex: Karim Belkacem"
            required
          />
        </label>
        <label>
          <span>Age</span>
          <input
            value={form.age}
            onChange={(event) => updateField('age', event.target.value)}
            maxLength={32}
            placeholder="Ex: 18+ / mature"
            required
          />
        </label>
      </div>

      <label>
        <span>Experience RP</span>
        <textarea
          value={form.experienceRp}
          onChange={(event) => updateField('experienceRp', event.target.value)}
          maxLength={900}
          rows={4}
          placeholder="Tes anciens serveurs, ton style de RP, ce que tu sais jouer proprement."
          required
        />
      </label>

      <label>
        <span>Histoire du personnage</span>
        <textarea
          value={form.characterStory}
          onChange={(event) => updateField('characterStory', event.target.value)}
          maxLength={1800}
          rows={6}
          placeholder="Qui est ton personnage, ce qu'il a perdu, pourquoi il survit encore."
          required
        />
      </label>

      <label>
        <span>Motivation</span>
        <textarea
          value={form.motivation}
          onChange={(event) => updateField('motivation', event.target.value)}
          maxLength={1200}
          rows={4}
          placeholder="Pourquoi Last Survivors, ce que tu veux apporter au serveur."
          required
        />
      </label>

      <label>
        <span>Disponibilites</span>
        <textarea
          value={form.availability}
          onChange={(event) => updateField('availability', event.target.value)}
          maxLength={500}
          rows={3}
          placeholder="Tes horaires habituels, semaine/week-end, vocal possible ou non."
          required
        />
      </label>

      <label className="checkbox-line">
        <input
          type="checkbox"
          checked={form.rulesAccepted}
          onChange={(event) => updateField('rulesAccepted', event.target.checked)}
          required
        />
        <span>J'ai lu le reglement et j'accepte de jouer un RP fair-play.</span>
      </label>

      {message ? (
        <div className={`form-message ${message.type}`} role="status">
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          {message.text}
        </div>
      ) : null}

      <button type="submit" className="button button-primary form-submit" disabled={pending}>
        <Send size={17} />
        {pending ? 'Envoi...' : 'Envoyer la candidature'}
      </button>
    </form>
  );
}
