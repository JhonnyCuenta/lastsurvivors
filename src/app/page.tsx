import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Camera,
  CheckCircle2,
  Flame,
  Map,
  MessageCircle,
  Radio,
  Skull,
  UserRound,
} from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton } from '@/components/auth-actions';
import { CopyConnectButton } from '@/components/copy-connect-button';
import { ServerStatusPanel } from '@/components/server-status-panel';
import { TikTokFeature } from '@/components/tiktok-feature';
import {
  factionPreviews,
  homeHighlights,
  playerQuotes,
  premiumStats,
  publicLinks,
  quickLinks,
} from '@/config/site';
import { getLiveEvents } from '@/lib/live-events';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [session, eventsFeed] = await Promise.all([auth(), getLiveEvents()]);
  const activeEvent = eventsFeed.active[0];

  return (
    <>
      <section className="premium-hero">
        <div className="premium-hero-copy">
          <span className="premium-overline">
            <span className="pulse-dot" />
            Serveur FiveM RP post-apocalyptique
          </span>
          <h1>Last Survivors</h1>
          <p className="premium-lead">
            Un serveur sombre, lisible et humain: survivre, negocier, reconstruire, perdre parfois, et repartir avec
            une histoire qui vaut le detour.
          </p>

          <div className="premium-actions">
            <CopyConnectButton />
            <a className="button button-secondary" href={publicLinks.discordUrl} target="_blank" rel="noreferrer">
              Discord <MessageCircle size={18} />
            </a>
            <Link className="button button-ghost" href={session?.user ? '/dashboard' : '/jouer'}>
              {session?.user ? 'Mon espace' : 'Commencer'} <ArrowRight size={18} />
            </Link>
          </div>

          <div className="premium-stat-row">
            {premiumStats.map((stat) => (
              <span key={stat.label}>
                <small>{stat.label}</small>
                <strong>{stat.value}</strong>
              </span>
            ))}
          </div>
        </div>

        <aside className="premium-hero-panel" aria-label="Signal serveur">
          <div className="premium-panel-top">
            <span>
              <Radio size={17} />
              Transmission
            </span>
            <strong>{activeEvent ? activeEvent.title : 'Canal calme'}</strong>
            <p>{activeEvent ? `${activeEvent.zone} - ${activeEvent.message}` : 'Aucun event critique pour le moment.'}</p>
          </div>
          <div className="premium-panel-links">
            <Link href="/evenements">
              Events live <ArrowRight size={15} />
            </Link>
            <Link href="/guide">
              Guide depart <ArrowRight size={15} />
            </Link>
          </div>
        </aside>
      </section>

      <section className="home-status-band">
        <ServerStatusPanel />
      </section>

      <section className="section premium-section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Entrer dans la Zone</span>
            <h2>Le plus court chemin vers le jeu</h2>
          </div>
          <p>Tout ce qu il faut avant de lancer FiveM: connexion, Discord, regles, guide et premiers reperes.</p>
        </div>

        <div className="premium-card-grid">
          <Link className="premium-feature-card primary-card" href="/jouer">
            <span className="card-icon">
              <Flame size={22} />
            </span>
            <h3>Jouer maintenant</h3>
            <p>Copie la commande, rejoins le Discord, verifie les infos importantes et arrive avec un personnage simple.</p>
            <strong>
              Ouvrir <ArrowRight size={15} />
            </strong>
          </Link>
          {homeHighlights.map((item) => (
            <Link className="premium-feature-card" href={item.href} key={item.title}>
              <span className="card-icon">
                <item.icon size={22} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <strong>
                Voir <ArrowRight size={15} />
              </strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section split-showcase">
        <div>
          <span className="section-kicker">Serveur vivant</span>
          <h2>Factions, routes, risques et choix</h2>
          <p>
            Last Survivors fonctionne mieux quand chaque joueur laisse une trace: un commerce qui tient, une alliance qui
            craque, une escorte qui tourne mal, un medecin qui arrive trop tard.
          </p>
          <div className="showcase-actions">
            <Link className="button button-primary" href="/serveur">
              Decouvrir le serveur <ArrowRight size={18} />
            </Link>
            <Link className="button button-secondary" href="/carte">
              Carte utile <Map size={18} />
            </Link>
          </div>
        </div>

        <div className="faction-mini-grid">
          {factionPreviews.map((faction) => (
            <article key={faction.name}>
              <span>{faction.role}</span>
              <h3>{faction.name}</h3>
              <p>{faction.text}</p>
            </article>
          ))}
        </div>
      </section>

      <TikTokFeature />

      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Acces rapide</span>
            <h2>Les pages utiles aux joueurs</h2>
          </div>
          <p>Une navigation simple: preparer une session, suivre les events, voter, ouvrir un ticket ou retrouver une info.</p>
        </div>
        <div className="quicklink-grid">
          {quickLinks.map((item) => (
            <Link className="quicklink-card" href={item.href} key={item.href}>
              <item.icon size={21} />
              <span>{item.title}</span>
              <p>{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section community-proof">
        <div className="proof-copy">
          <span className="section-kicker">Communaute</span>
          <h2>Un portail fait pour ramener les joueurs en jeu</h2>
          <p>
            Screenshots, votes, support, Discord et calendrier RP doivent servir la meme chose: donner envie de se
            connecter et de creer une scene propre.
          </p>
          <div className="showcase-actions">
            <Link className="button button-primary" href="/communaute">
              Communaute <Camera size={18} />
            </Link>
            <Link className="button button-secondary" href="/evenements">
              Events <CalendarDays size={18} />
            </Link>
          </div>
        </div>

        <div className="quote-stack">
          {playerQuotes.map((quote) => (
            <blockquote key={quote.author}>
              <Skull size={18} />
              <p>{quote.quote}</p>
              <cite>{quote.author}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section account-section refined-account">
        <div className="section-header">
          <div>
            <span className="section-kicker">Compte optionnel</span>
            <h2>{session?.user ? `Content de te revoir, ${session.user.name ?? 'survivant'}` : 'Discord seulement quand c est utile'}</h2>
          </div>
          <p>Le site reste ouvert. Le compte sert au support, a la candidature staff et aux futurs outils communautaires.</p>
        </div>

        <div className="account-cta premium-account-cta">
          <div>
            <CheckCircle2 size={24} />
            <h3>{session?.user ? 'Espace joueur actif' : 'Pas besoin de compte pour lire le site'}</h3>
            <p>
              {session?.user
                ? 'Ton espace rassemble les raccourcis utiles, le support et les prochaines fonctions joueur.'
                : 'Connecte Discord uniquement si tu veux ouvrir un ticket reconnu ou postuler staff.'}
            </p>
          </div>
          <div className="hero-actions">
            {session?.user ? (
              <Link className="button button-primary" href="/dashboard">
                Dashboard <UserRound size={18} />
              </Link>
            ) : (
              <DiscordLoginButton className="button button-primary" />
            )}
            <Link className="button button-secondary" href="/candidature">
              Candidature staff <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
