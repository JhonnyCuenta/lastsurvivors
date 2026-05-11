import Link from 'next/link';
import { AlertTriangle, ArrowRight, CalendarDays, ClipboardList, HelpCircle, MessageCircle, Radio, UserRound } from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton, DiscordLogoutButton } from '@/components/auth-actions';
import { CopyConnectButton } from '@/components/copy-connect-button';
import { publicLinks } from '@/config/site';
import { getDiscordAuthStatus } from '@/lib/auth-config';

export const dynamic = 'force-dynamic';

type DashboardPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

function authErrorMessage(error?: string) {
  if (error === 'discord-guild' || error === 'AccessDenied') {
    return 'Connexion refusee: rejoins le Discord Last Survivors puis reessaie.';
  }

  if (error === 'discord-auth') {
    return 'Discord n a pas confirme ton identite. Reessaie dans quelques secondes.';
  }

  if (error === 'Configuration') {
    return 'Connexion Discord en preparation. Il reste des variables a ajouter sur Vercel.';
  }

  return null;
}

function oauthSetupMessage(missingOAuthEnv: string[]) {
  if (missingOAuthEnv.length === 0) return null;
  return `Connexion Discord en preparation: ${missingOAuthEnv.join(', ')} a ajouter dans Vercel.`;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const session = await auth();
  const authStatus = getDiscordAuthStatus();
  const params = await searchParams;
  const errorMessage = authErrorMessage(params?.error) || oauthSetupMessage(authStatus.missingOAuthEnv);

  if (!session?.user) {
    return (
      <>
        <header className="page-heading">
          <h1>Dashboard joueur</h1>
          <p>Un espace optionnel pour regrouper candidature, support, Discord et raccourcis de session.</p>
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
            <h2>Connexion Discord</h2>
            <p>Connecte-toi seulement si tu veux utiliser les fonctions joueur. Le reste du site reste ouvert.</p>
            <DiscordLoginButton className="button button-primary" disabled={!authStatus.oauthReady} />
          </article>
          <article className="profile-card muted-card">
            <span className="card-icon">
              <Radio size={22} />
            </span>
            <h2>Ce que tu retrouves ici</h2>
            <p>Candidature, support Discord, events, connexion FiveM et prochains outils joueur.</p>
          </article>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="page-heading dashboard-heading">
        <h1>Dashboard</h1>
        <p>Bienvenue {session.user.name ?? 'survivant'}. Prepare ta session, ouvre une demande ou rejoins directement le serveur.</p>
      </header>

      <section className="dashboard-grid">
        <article className="dashboard-profile-card">
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
              <p>{session.user.guildVerified ? 'Membre Last Survivors confirme.' : 'Discord connecte.'}</p>
            </div>
          </div>
          <div className="profile-actions">
            <CopyConnectButton />
            <DiscordLogoutButton />
          </div>
        </article>

        <Link className="dashboard-action-card" href="/candidature">
          <ClipboardList size={24} />
          <h3>Candidature</h3>
          <p>Envoyer ou preparer une demande propre pour rejoindre le projet RP.</p>
          <span>Ouvrir <ArrowRight size={15} /></span>
        </Link>

        <a className="dashboard-action-card" href={publicLinks.discordUrl} target="_blank" rel="noreferrer">
          <HelpCircle size={24} />
          <h3>Support</h3>
          <p>Tickets, questions, bug ou besoin d aide: tout part depuis Discord.</p>
          <span>Discord <ArrowRight size={15} /></span>
        </a>

        <Link className="dashboard-action-card" href="/evenements">
          <CalendarDays size={24} />
          <h3>Events</h3>
          <p>Suivre les alertes live, hordes, airdrops et futurs rendez-vous RP.</p>
          <span>Voir <ArrowRight size={15} /></span>
        </Link>

        <a className="dashboard-action-card" href={publicLinks.discordUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={24} />
          <h3>Whitelist</h3>
          <p>Les etapes whitelist et les echanges vocaux se font depuis le Discord.</p>
          <span>Rejoindre <ArrowRight size={15} /></span>
        </a>
      </section>
    </>
  );
}
