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
        setMessage({ type: 'error', text: data.error ?? 'Candidature staff refusee.' });
        return;
      }

      setForm(initialForm);
      setMessage({ type: 'success', text: 'Candidature staff envoyee. Surveille Discord pour la suite.' });
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
          <span>Pseudo en jeu</span>
          <input
            value={form.pseudoRp}
            onChange={(event) => updateField('pseudoRp', event.target.value)}
            maxLength={40}
            placeholder="Ex: Jhonny Lacuent..."
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
        <span>Experience staff / RP</span>
        <textarea
          value={form.experienceRp}
          onChange={(event) => updateField('experienceRp', event.target.value)}
          maxLength={900}
          rows={4}
          placeholder="Tes anciens serveurs, roles staff deja faits, moderation, events, support joueur, outils connus."
          required
        />
      </label>

      <label>
        <span>Presentation staff</span>
        <textarea
          value={form.characterStory}
          onChange={(event) => updateField('characterStory', event.target.value)}
          maxLength={1800}
          rows={6}
          placeholder="Qui tu es, ton rapport au serveur, tes qualites, tes limites et ta facon de gerer un conflit joueur."
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
          placeholder="Pourquoi tu veux aider Last Survivors, ce que tu peux apporter au staff et a la communaute."
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
          placeholder="Tes horaires habituels, jours forts, vocal possible, moments ou tu peux gerer support/events."
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
        <span>Je comprends qu une candidature staff demande calme, discretion et respect des joueurs.</span>
      </label>

      {message ? (
        <div className={`form-message ${message.type}`} role="status">
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          {message.text}
        </div>
      ) : null}

      <button type="submit" className="button button-primary form-submit" disabled={pending}>
        <Send size={17} />
        {pending ? 'Envoi...' : 'Envoyer la candidature staff'}
      </button>
    </form>
  );
}
