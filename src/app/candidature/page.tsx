import Link from 'next/link';
import { ClipboardList, MessageCircle, Radio } from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton } from '@/components/auth-actions';
import { CandidatureForm } from '@/components/candidature-form';
import { getDiscordAuthStatus } from '@/lib/auth-config';

export const dynamic = 'force-dynamic';

function oauthSetupMessage(missingOAuthEnv: string[]) {
  if (missingOAuthEnv.length === 0) return null;
  return `La connexion Discord est en preparation. Variable${missingOAuthEnv.length > 1 ? 's' : ''} manquante${
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
          <h1>Candidature</h1>
          <p>Presente ton personnage, ton envie de jeu ou ton projet de groupe. Le but est simple: comprendre comment tu veux jouer.</p>
        </header>

        <section className="profile-grid">
          <article className="profile-card">
            <span className="card-icon">
              <ClipboardList size={22} />
            </span>
            <h2>Connexion requise pour candidater</h2>
            <p>
              {authStatus.oauthReady
                ? 'Connecte ton Discord pour envoyer une demande et garder la suite de l echange au meme endroit.'
                : setupMessage}
            </p>
            <DiscordLoginButton className="button button-primary" disabled={!authStatus.oauthReady} />
          </article>
          <article className="profile-card muted-card">
            <span className="card-icon">
              <MessageCircle size={22} />
            </span>
            <h2>Un echange Discord</h2>
            <p>Ta demande arrive dans le salon prevu, puis l equipe te repond sur Discord si elle a besoin de precision.</p>
          </article>
        </section>
      </>
    );
  }

  if (session.user.guildVerified !== true) {
    return (
      <>
        <header className="page-heading">
          <h1>Candidature</h1>
          <p>Ton Discord est connecte, mais la candidature n est pas encore ouverte pour ton compte.</p>
        </header>

        <section className="profile-grid">
          <article className="profile-card">
            <span className="card-icon">
              <ClipboardList size={22} />
            </span>
            <h2>Acces en attente</h2>
            <p>
              Rejoins le Discord Last Survivors puis reessaie. Si le probleme continue, ouvre un ticket et donne ton
              pseudo Discord.
            </p>
          </article>
          <article className="profile-card muted-card">
            <span className="card-icon">
              <Radio size={22} />
            </span>
            <h2>Besoin d aide ?</h2>
            <p>Le Discord reste le meilleur endroit pour regler une erreur de compte ou une demande bloquee.</p>
          </article>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="page-heading candidature-heading">
        <h1>Candidature</h1>
        <p>
          Connecte en tant que <strong>{session.user.name ?? 'survivant Discord'}</strong>. Remplis le formulaire avec
          des infos RP propres; il sera transmis a l equipe.
        </p>
      </header>

      <section className="two-grid form-layout">
        <article className="profile-card muted-card">
          <span className="card-icon">
            <ClipboardList size={22} />
          </span>
          <h2>Avant d envoyer</h2>
          <p>Sois precis, evite le copier-coller vide, et garde une histoire jouable sur un serveur post-apo/zombies.</p>
          <div className="link-stack">
            <Link href="/reglement">Relire le reglement</Link>
            <Link href="/guide">Voir le guide de survie</Link>
            <Link href="/communaute">Liens communaute</Link>
          </div>
        </article>
        <CandidatureForm />
      </section>
    </>
  );
}
