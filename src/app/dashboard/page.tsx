import Link from 'next/link';
import { AlertTriangle, ArrowRight, CalendarDays, ClipboardList, HelpCircle, LifeBuoy, Radio, UserRound } from 'lucide-react';
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
    return 'Connexion Discord en préparation. Il reste des variables à ajouter sur Vercel.';
  }

  return null;
}

function oauthSetupMessage(missingOAuthEnv: string[]) {
  if (missingOAuthEnv.length === 0) return null;
  return `Connexion Discord en préparation : ${missingOAuthEnv.join(', ')} à ajouter dans Vercel.`;
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
          <p>Un espace optionnel pour regrouper support, candidature staff, Discord et raccourcis de session.</p>
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
            <p>Ticket support, candidature staff, events organises, connexion FiveM et prochains outils joueur.</p>
          </article>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="page-heading dashboard-heading">
        <h1>Dashboard</h1>
        <p>Bienvenue {session.user.name ?? 'survivant'}. Prepare ta session, ouvre un ticket ou rejoins directement le serveur.</p>
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
          <h3>Candidature staff</h3>
          <p>Postuler pour aider l’équipe : support, événements, modération ou organisation du serveur.</p>
          <span>Ouvrir <ArrowRight size={15} /></span>
        </Link>

        <Link className="dashboard-action-card" href="/support">
          <HelpCircle size={24} />
          <h3>Support</h3>
          <p>Ouvrir un ticket pour bug, boutique, joueur, vote ou question serveur.</p>
          <span>Ticket <ArrowRight size={15} /></span>
        </Link>

        <Link className="dashboard-action-card" href="/evenements">
          <CalendarDays size={24} />
          <h3>Events</h3>
          <p>Suivre les alertes live et les prochains events organises.</p>
          <span>Voir <ArrowRight size={15} /></span>
        </Link>

        <a className="dashboard-action-card" href={publicLinks.discordUrl} target="_blank" rel="noreferrer">
          <LifeBuoy size={24} />
          <h3>Discord</h3>
          <p>Suivre les reponses staff, annonces, salons media et organisation RP.</p>
          <span>Ouvrir <ArrowRight size={15} /></span>
        </a>
      </section>
    </>
  );
}
