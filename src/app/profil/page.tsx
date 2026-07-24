import Link from 'next/link';
import { AlertTriangle, CheckCircle2, ClipboardList, MessageCircle, Radio, UserRound } from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton, DiscordLogoutButton } from '@/components/auth-actions';
import { CopyConnectButton } from '@/components/copy-connect-button';
import { getDiscordAuthStatus } from '@/lib/auth-config';

export const dynamic = 'force-dynamic';

type ProfilePageProps = {
  searchParams?: Promise<{ error?: string }>;
};

function authErrorMessage(error?: string) {
  if (error === 'discord-guild' || error === 'AccessDenied') {
    return "Connexion refusée : ton compte Discord doit être membre du serveur Last Survivors.";
  }

  if (error === 'discord-auth') {
    return 'Discord n’a pas confirmé ton identité. Réessaie dans quelques secondes.';
  }

  if (error === 'Configuration') {
    return 'Connexion Discord non configurée : il manque le client ID ou le secret Discord côté Vercel.';
  }

  return null;
}

function oauthSetupMessage(missingOAuthEnv: string[]) {
  if (missingOAuthEnv.length === 0) return null;
  return `Connexion Discord en préparation : variable${missingOAuthEnv.length > 1 ? 's' : ''} ${missingOAuthEnv.join(
    ', ',
  )} à ajouter dans Vercel.`;
}

export default async function ProfilPage({ searchParams }: ProfilePageProps) {
  const session = await auth();
  const authStatus = getDiscordAuthStatus();
  const params = await searchParams;
  const errorMessage =
    authErrorMessage(params?.error) ||
    oauthSetupMessage(authStatus.missingOAuthEnv);

  if (!session?.user) {
    return (
      <>
        <header className="page-heading">
          <h1>Espace survivant</h1>
          <p>Le compte est optionnel. Il sert à vérifier ton Discord pour le profil, le support et la candidature staff.</p>
        </header>

        {errorMessage ? (
          <section className="alert-panel">
            <AlertTriangle size={20} />
            <span>{errorMessage}</span>
          </section>
        ) : null}

        <section className="profile-grid">
          <article className="profile-card">
            <span className="card-icon">
              <UserRound size={22} />
            </span>
            <h2>Connexion Discord optionnelle</h2>
            <p>
              Tu peux lire le guide, la carte, les événements et le règlement sans compte. Connecte Discord seulement si
              tu veux utiliser l’espace joueur, ouvrir un ticket reconnu ou envoyer une candidature staff.
            </p>
            <DiscordLoginButton className="button button-primary" disabled={!authStatus.oauthReady} />
          </article>
          <article className="profile-card muted-card">
            <span className="card-icon">
              <MessageCircle size={22} />
            </span>
            <h2>Discord Last Survivors</h2>
            <p>
              La connexion sert à retrouver ton pseudo Discord et à garder les demandes au bon endroit.
              {!authStatus.guildCheckReady ? ' Si la candidature staff ne passe pas, ouvre un ticket support.' : ''}
            </p>
          </article>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="page-heading">
        <h1>Profil survivant</h1>
        <p>Bienvenue dans ton espace joueur. Ici, rien d’obligatoire : juste les raccourcis utiles et ton statut Discord.</p>
      </header>

      <section className="profile-grid">
        <article className="profile-card profile-main">
          <div className="profile-identity">
            {session.user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.image} alt="" className="profile-avatar" referrerPolicy="no-referrer" />
            ) : (
              <span className="profile-avatar profile-avatar-fallback">
                <UserRound size={28} />
              </span>
            )}
            <div>
              <span className="section-kicker">Compte Discord</span>
              <h2>{session.user.name ?? 'Survivant'}</h2>
              <p>{session.user.discordId ? `ID Discord: ${session.user.discordId}` : 'ID Discord masque.'}</p>
            </div>
          </div>
          {session.user.guildVerified ? (
            <span className="verified-line">
              <CheckCircle2 size={18} />
              Membre Discord Last Survivors vérifié
            </span>
          ) : (
            <span className="alert-panel inline-alert">
              <AlertTriangle size={18} />
              Discord connecté. Candidature staff à vérifier depuis le dashboard.
            </span>
          )}
          <div className="profile-actions">
            <CopyConnectButton />
            <Link className={`button button-secondary${session.user.guildVerified ? '' : ' disabled-button'}`} href="/candidature">
              <ClipboardList size={17} />
              Candidature staff
            </Link>
            <DiscordLogoutButton />
          </div>
        </article>

        <article className="profile-card">
          <span className="card-icon">
            <Radio size={22} />
          </span>
          <h2>Raccourcis joueur</h2>
          <p>Prépare ton arrivée avant de te connecter : guide, carte publique, événements et règlement.</p>
          <div className="link-stack">
            <Link href="/guide">Guide de survie</Link>
            <Link href="/support">Support ticket</Link>
            <Link href="/carte">Carte publique</Link>
            <Link href="/evenements">Événements RP</Link>
            <Link href="/reglement">Règlement</Link>
          </div>
        </article>
      </section>
    </>
  );
}
