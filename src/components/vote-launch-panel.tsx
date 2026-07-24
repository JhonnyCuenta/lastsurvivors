'use client';

import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Vote } from 'lucide-react';

type Props = {
  voteUrl: string;
};

function buildVoteUrl(baseUrl: string, pseudo: string) {
  const cleanPseudo = pseudo.replace(/[<>]/g, '').trim().slice(0, 50);

  try {
    const url = new URL(baseUrl);
    if (cleanPseudo) url.searchParams.set('pseudo', cleanPseudo);
    return url.toString();
  } catch {
    if (!cleanPseudo) return baseUrl;
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}pseudo=${encodeURIComponent(cleanPseudo)}`;
  }
}

export function VoteLaunchPanel({ voteUrl }: Props) {
  const [pseudo, setPseudo] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedPseudo = window.localStorage.getItem('last-survivors-vote-pseudo');
      if (savedPseudo) setPseudo(savedPseudo);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const href = useMemo(() => buildVoteUrl(voteUrl, pseudo), [pseudo, voteUrl]);
  const disabled = voteUrl.trim().length === 0;

  function handlePseudoChange(value: string) {
    const cleanValue = value.replace(/[<>]/g, '').slice(0, 50);
    setPseudo(cleanValue);
    window.localStorage.setItem('last-survivors-vote-pseudo', cleanValue);
  }

  return (
    <div className="vote-launch-panel">
      <label htmlFor="vote-pseudo">Pseudo FiveM exact</label>
      <div className="vote-form-row">
        <input
          id="vote-pseudo"
          className="vote-name-input"
          value={pseudo}
          onChange={(event) => handlePseudoChange(event.target.value)}
          placeholder="Ex: Jhonny Lacuent..."
          maxLength={50}
          autoComplete="nickname"
        />
        {disabled ? (
          <span className="button button-primary disabled-button">Vote indisponible</span>
        ) : (
          <a className="button button-primary" href={href} target="_blank" rel="noreferrer">
            Voter <Vote size={18} />
          </a>
        )}
      </div>
      <p>
        Utilise le même pseudo que sur FiveM. Le vote est reçu par le script serveur, puis la récompense se
        recupere en jeu aupres du PNJ de vote.
      </p>
      {!disabled ? (
        <a className="vote-raw-link" href={voteUrl} target="_blank" rel="noreferrer">
          Ouvrir Top-Serveurs sans pseudo <ExternalLink size={14} />
        </a>
      ) : null}
    </div>
  );
}
