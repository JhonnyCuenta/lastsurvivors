import Link from 'next/link';
import { AlertTriangle, CheckCircle2, ClipboardList, Radio, ShieldCheck, UserRound } from 'lucide-react';
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
    return "Connexion refusee: ton compte Discord doit etre membre du serveur Last Survivors.";
  }

  if (error === 'discord-auth') {
    return 'Discord n a pas confirme ton identite. Reessaie dans quelques secondes.';
  }

  if (error === 'Configuration') {
    return 'Connexion Discord non configuree: il manque le client ID ou le secret Discord cote Vercel.';
  }

  return null;
}

export default async function ProfilPage({ searchParams }: ProfilePageProps) {
  const session = await auth();
  const authStatus = getDiscordAuthStatus();
  const params = await searchParams;
  const errorMessage =
    authErrorMessage(params?.error) ||
    (!authStatus.oauthReady ? 'Connexion Discord en preparation: AUTH_DISCORD_ID et AUTH_DISCORD_SECRET sont encore a ajouter dans Vercel.' : null);

  if (!session?.user) {
    return (
      <>
        <header className="page-heading">
          <h1>Espace survivant</h1>
          <p>Le compte est optionnel. Il sert uniquement a verifier ton Discord pour ton profil et les candidatures.</p>
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
              Tu peux lire le guide, la carte, les evenements et le reglement sans compte. Connecte Discord seulement si
              tu veux utiliser l espace joueur ou envoyer une candidature.
            </p>
            <DiscordLoginButton className="button button-primary" disabled={!authStatus.oauthReady} />
          </article>
          <article className="profile-card muted-card">
            <span className="card-icon">
              <ShieldCheck size={22} />
            </span>
            <h2>Verification membre</h2>
            <p>
              Le portail demande le scope Discord <strong>identify guilds</strong> pour verifier ton appartenance au
              serveur. Le token ne part jamais dans le frontend.
              {!authStatus.guildCheckReady ? ' Il manque encore le DISCORD_GUILD_ID pour valider les candidatures.' : ''}
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
        <p>Bienvenue dans ton espace joueur. Ici, rien d obligatoire: juste les raccourcis utiles et ton statut Discord.</p>
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
              Membre Discord Last Survivors verifie
            </span>
          ) : (
            <span className="alert-panel inline-alert">
              <AlertTriangle size={18} />
              Verification membre Discord en attente de configuration.
            </span>
          )}
          <div className="profile-actions">
            <CopyConnectButton />
            <Link className={`button button-secondary${session.user.guildVerified ? '' : ' disabled-button'}`} href="/candidature">
              <ClipboardList size={17} />
              Candidature
            </Link>
            <DiscordLogoutButton />
          </div>
        </article>

        <article className="profile-card">
          <span className="card-icon">
            <Radio size={22} />
          </span>
          <h2>Raccourcis joueur</h2>
          <p>Prepare ton arrivee avant de te connecter: guide, carte publique, evenements et reglement.</p>
          <div className="link-stack">
            <Link href="/guide">Guide de survie</Link>
            <Link href="/carte">Carte publique</Link>
            <Link href="/evenements">Evenements RP</Link>
            <Link href="/reglement">Reglement</Link>
          </div>
        </article>
      </section>
    </>
  );
}
