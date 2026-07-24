import Link from 'next/link';
import { ClipboardList, MessageCircle, Radio } from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton } from '@/components/auth-actions';
import { CandidatureForm } from '@/components/candidature-form';
import { getDiscordAuthStatus } from '@/lib/auth-config';

export const dynamic = 'force-dynamic';

function oauthSetupMessage(missingOAuthEnv: string[]) {
  if (missingOAuthEnv.length === 0) return null;
  return `La connexion Discord est en préparation. Variable${missingOAuthEnv.length > 1 ? 's' : ''} manquante${
    missingOAuthEnv.length > 1 ? 's' : ''
  }: ${missingOAuthEnv.join(', ')}.`;
}

export default async function CandidaturePage() {
  const session = await auth();
  const authStatus = getDiscordAuthStatus();
  const setupMessage = oauthSetupMessage(authStatus.missingOAuthEnv);

  if (!session?.user) {
    return (
      <>
        <header className="page-heading">
          <h1>Candidature staff</h1>
          <p>Le serveur n’est pas whitelist. Cette page sert uniquement à proposer ton aide dans l’équipe staff.</p>
        </header>

        <section className="profile-grid">
          <article className="profile-card">
            <span className="card-icon">
              <ClipboardList size={22} />
            </span>
            <h2>Connexion requise pour postuler staff</h2>
            <p>
              {authStatus.oauthReady
                ? 'Connecte ton Discord pour envoyer une demande staff et garder la suite de l’échange au même endroit.'
                : setupMessage}
            </p>
            <DiscordLoginButton className="button button-primary" disabled={!authStatus.oauthReady} />
          </article>
          <article className="profile-card muted-card">
            <span className="card-icon">
              <MessageCircle size={22} />
            </span>
            <h2>Un échange staff</h2>
            <p>Ta demande arrive au staff, puis l’équipe te répond sur Discord si elle veut organiser un entretien.</p>
          </article>
        </section>
      </>
    );
  }

  if (session.user.guildVerified !== true) {
    return (
      <>
        <header className="page-heading">
          <h1>Candidature staff</h1>
          <p>Ton Discord est connecté, mais la candidature staff n’est pas encore ouverte pour ton compte.</p>
        </header>

        <section className="profile-grid">
          <article className="profile-card">
            <span className="card-icon">
              <ClipboardList size={22} />
            </span>
            <h2>Accès en attente</h2>
            <p>
              Rejoins le Discord Last Survivors puis réessaie. Si le problème continue, ouvre un ticket support et donne ton
              pseudo Discord.
            </p>
          </article>
          <article className="profile-card muted-card">
            <span className="card-icon">
              <Radio size={22} />
            </span>
            <h2>Besoin d’aide ?</h2>
            <p>La page Support peut aussi servir si ta connexion Discord bloque.</p>
          </article>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="page-heading candidature-heading">
        <h1>Candidature staff</h1>
        <p>
          Connecté en tant que <strong>{session.user.name ?? 'survivant Discord'}</strong>. Remplis le formulaire avec
          des infos claires sur ton expérience, tes disponibilités et ce que tu peux apporter au staff.
        </p>
      </header>

      <section className="two-grid form-layout">
        <article className="profile-card muted-card">
          <span className="card-icon">
            <ClipboardList size={22} />
          </span>
          <h2>Avant d’envoyer</h2>
          <p>Sois précis, honnête sur ton expérience, et explique comment tu gères les joueurs avec calme.</p>
          <div className="link-stack">
            <Link href="/reglement">Relire le règlement</Link>
            <Link href="/support">Page support</Link>
            <Link href="/communaute">Liens communauté</Link>
          </div>
        </article>
        <CandidatureForm />
      </section>
    </>
  );
}
