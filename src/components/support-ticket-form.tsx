'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Send } from 'lucide-react';

type SupportTicketFormState = {
  category: string;
  priority: string;
  subject: string;
  message: string;
  website: string;
  confirm: boolean;
};

const initialForm: SupportTicketFormState = {
  category: 'bug',
  priority: 'normal',
  subject: '',
  message: '',
  website: '',
  confirm: false,
};

export function SupportTicketForm({ discordName }: { discordName?: string | null }) {
  const [form, setForm] = useState<SupportTicketFormState>(initialForm);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  function updateField<K extends keyof SupportTicketFormState>(key: K, value: SupportTicketFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    try {
      const response = await fetch('/api/support-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string; ticketId?: string };
      if (!response.ok) {
        setMessage({ type: 'error', text: data.error ?? 'Ticket refusé.' });
        return;
      }

      setForm(initialForm);
      setMessage({
        type: 'success',
        text: `Ticket créé dans le système Discord${data.ticketId ? ` (${data.ticketId})` : ''}. Le staff te répondra dans le salon dédié.`,
      });
    } catch {
      setMessage({ type: 'error', text: 'Impossible de contacter le support pour le moment.' });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="application-form support-form" onSubmit={onSubmit}>
      <input
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(event) => updateField('website', event.target.value)}
        aria-hidden="true"
      />

      <div className="form-message success">
        <CheckCircle2 size={18} />
        Connecté avec Discord : {discordName ?? 'survivant'}
      </div>

      <div className="form-grid">
        <label>
          <span>Catégorie</span>
          <select value={form.category} onChange={(event) => updateField('category', event.target.value)} required>
            <option value="bug">Bug / problème technique</option>
            <option value="joueur">Signalement joueur</option>
            <option value="boutique">Boutique / achat</option>
            <option value="question">Question serveur</option>
            <option value="autre">Autre demande</option>
          </select>
        </label>
        <label>
          <span>Priorité déclarée</span>
          <select value={form.priority} onChange={(event) => updateField('priority', event.target.value)} required>
            <option value="normal">Normale</option>
            <option value="high">Importante</option>
            <option value="low">Simple question</option>
          </select>
        </label>
      </div>

      <label>
        <span>Sujet</span>
        <input
          value={form.subject}
          onChange={(event) => updateField('subject', event.target.value)}
          maxLength={120}
          placeholder="Ex. : problème de récompense de vote"
          required
        />
      </label>

      <label>
        <span>Message</span>
        <textarea
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          maxLength={1800}
          rows={7}
          placeholder="Explique les faits, le lieu, l’heure approximative, les joueurs concernés et ce que tu attends du staff."
          required
        />
      </label>

      <label className="checkbox-line">
        <input
          type="checkbox"
          checked={form.confirm}
          onChange={(event) => updateField('confirm', event.target.checked)}
          required
        />
        <span>J’envoie une vraie demande et je reste disponible pour répondre au staff.</span>
      </label>

      {message ? (
        <div className={`form-message ${message.type}`} role="status">
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          {message.text}
        </div>
      ) : null}

      <button type="submit" className="button button-primary form-submit" disabled={pending}>
        <Send size={17} />
        {pending ? 'Création...' : 'Créer le ticket Discord'}
      </button>
    </form>
  );
}
