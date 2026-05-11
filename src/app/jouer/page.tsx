import Link from 'next/link';
import { ArrowRight, ClipboardList, MessageCircle, Radio, Skull, UserRound } from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton } from '@/components/auth-actions';
import { CopyConnectButton } from '@/components/copy-connect-button';
import { ServerStatusPanel } from '@/components/server-status-panel';
import { publicLinks, whitelistSteps } from '@/config/site';

export const dynamic = 'force-dynamic';

export default async function JouerPage() {
  const session = await auth();

  return (
    <>
      <section className="play-hero">
        <div>
          <span className="section-kicker">Rejoindre Last Survivors</span>
          <h1>Entre dans la Zone</h1>
          <p>
            Prepare ton arrivee simplement: commande de connexion, Discord, reglement et personnage credible. Le reste
            se construit en jeu, avec les rencontres et les mauvais choix.
          </p>
          <div className="premium-actions">
            <CopyConnectButton />
            <a className="button button-secondary" href={publicLinks.discordUrl} target="_blank" rel="noreferrer">
              Discord <MessageCircle size={18} />
            </a>
            <Link className="button button-ghost" href="/guide">
              Guide de depart <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <aside className="play-card">
          <Radio size={28} />
          <strong>Connexion FiveM</strong>
          <p>Ouvre FiveM, appuie sur F8, colle la commande, puis valide.</p>
          <CopyConnectButton className="button button-primary" compact={false} />
        </aside>
      </section>

      <section className="home-status-band">
        <ServerStatusPanel />
      </section>

      <section className="section play-grid">
        <article className="play-panel">
          <span className="card-icon">
            <ClipboardList size={22} />
          </span>
          <h2>Whitelist & candidature</h2>
          <p>
            Tu peux decouvrir le site sans compte. Pour envoyer une candidature, connecte ton Discord et prends le temps
            de poser un personnage simple, jouable et coherent avec l apocalypse.
          </p>
          <ol className="premium-step-list">
            {whitelistSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <Link className="button button-primary" href="/candidature">
            Candidature <ArrowRight size={18} />
          </Link>
        </article>

        <article className="play-panel">
          <span className="card-icon">
            <Skull size={22} />
          </span>
          <h2>Avant ta premiere session</h2>
          <p>
            N arrive pas comme un heros invincible. Last Survivors fonctionne mieux avec des personnages capables de
            douter, negocier, fuir, perdre du materiel et revenir plus intelligemment.
          </p>
          <div className="link-stack">
            <Link href="/reglement">Lire le reglement</Link>
            <Link href="/serveur">Comprendre le serveur</Link>
            <Link href="/carte">Voir les reperes</Link>
          </div>
        </article>

        <article className="play-panel">
          <span className="card-icon">
            <UserRound size={22} />
          </span>
          <h2>{session?.user ? 'Compte connecte' : 'Compte optionnel'}</h2>
          <p>
            {session?.user
              ? 'Ton Discord est connecte. Tu peux ouvrir ton dashboard pour retrouver candidature, support et raccourcis.'
              : 'La connexion Discord sert uniquement aux fonctions joueur. Tu peux jouer et lire le site sans creer de compte.'}
          </p>
          {session?.user ? (
            <Link className="button button-secondary" href="/dashboard">
              Mon dashboard <ArrowRight size={18} />
            </Link>
          ) : (
            <DiscordLoginButton className="button button-secondary" />
          )}
        </article>
      </section>
    </>
  );
}
