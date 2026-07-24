import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Map,
  MessageCircle,
  Radio,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton } from '@/components/auth-actions';
import { MapOverview } from '@/components/map-overview';
import { ServerStatusPanel } from '@/components/server-status-panel';
import { TikTokFeature } from '@/components/tiktok-feature';
import { TransmissionFeedPanel } from '@/components/transmission-feed';
import { factionPreviews, publicLinks, quickLinks } from '@/config/site';
import { getPortalChangelog, getTransmissionFeed } from '@/lib/bot-portal';
import { getScheduledEvents } from '@/lib/scheduled-events';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [session, transmissionFeed, scheduledEvents, changelogResult] = await Promise.all([
    auth(),
    getTransmissionFeed(),
    getScheduledEvents(),
    getPortalChangelog(3),
  ]);
  const activeEvent = scheduledEvents[0];
  const changelog = changelogResult.ok ? changelogResult.data : [];

  return (
    <>
      <section className="tn-hero">
        <div className="tn-hero-image" aria-hidden="true" />
        <div className="tn-hero-scan" aria-hidden="true" />
        <div className="tn-hero-copy">
          <span className="tn-eyebrow">
            <span className="tn-pulse" aria-hidden="true" />
            Réseau sécurisé · Canal 07
          </span>
          <h1>
            Réseau de transmission
            <span>des survivants</span>
          </h1>
          <p>
            État du serveur, alertes terrain et accès rapide à l’univers Last Survivors.
            Chaque donnée en direct est signalée par sa source.
          </p>
          <div className="tn-hero-actions">
            <Link className="button button-primary" href="/jouer">
              Accéder au serveur <ArrowRight size={18} />
            </Link>
            <a
              className="button button-secondary"
              href={publicLinks.discordUrl}
              target="_blank"
              rel="noreferrer"
            >
              Discord officiel <MessageCircle size={18} />
            </a>
          </div>
          <div className="tn-hero-stamp" aria-label="Identité du réseau">
            <strong>LS</strong>
            <span>Dernier relais humain</span>
          </div>
        </div>

        <aside className="tn-hero-console" aria-label="Console réseau">
          <ServerStatusPanel />
          <article className="tn-active-operation">
            <header>
              <span>Opération confirmée</span>
              <Radio size={17} aria-hidden="true" />
            </header>
            {activeEvent ? (
              <>
                <h2>{activeEvent.title}</h2>
                <p>{activeEvent.text}</p>
                <div>
                  <span>{activeEvent.schedule}</span>
                  <strong>{activeEvent.location}</strong>
                </div>
              </>
            ) : (
              <>
                <h2>Aucune opération annoncée</h2>
                <p>Le réseau n’a reçu aucun événement public confirmé.</p>
                <div>
                  <span>État vide vérifié</span>
                  <strong>Canal calme</strong>
                </div>
              </>
            )}
          </article>
        </aside>
      </section>

      <TransmissionFeedPanel initialFeed={transmissionFeed} />

      <section className="tn-section tn-zones">
        <div className="tn-section-heading">
          <div>
            <span className="tn-eyebrow">Dossier territoire</span>
            <h2>Factions et zones publiques</h2>
            <p>Des repères suffisants pour préparer une sortie, sans révéler de positions sensibles.</p>
          </div>
          <Link className="button button-secondary" href="/serveur">
            Ouvrir le dossier <ArrowRight size={17} />
          </Link>
        </div>
        <div className="tn-zone-layout">
          <div className="tn-faction-grid">
            {factionPreviews.map((faction, index) => (
              <article key={faction.name}>
                <span>{String(index + 1).padStart(2, '0')} / {faction.role}</span>
                <h3>{faction.name}</h3>
                <p>{faction.text}</p>
              </article>
            ))}
          </div>
          <div className="tn-map-frame">
            <MapOverview compact />
            <Link href="/carte">
              Carte complète <Map size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="tn-section tn-changelog">
        <div className="tn-section-heading">
          <div>
            <span className="tn-eyebrow">Journal technique</span>
            <h2>Derniers changements</h2>
            <p>Entrées publiques publiées par le bot, sans identité Discord ni données internes.</p>
          </div>
          <Link className="button button-ghost" href="/changelog">
            Tout consulter <CalendarDays size={17} />
          </Link>
        </div>
        {changelog.length > 0 ? (
          <div className="tn-changelog-grid">
            {changelog.map((entry) => (
              <article key={entry.id}>
                <span>{entry.version}</span>
                <h3>{entry.title}</h3>
                <p>{entry.changed || entry.added || entry.fixed || 'Mise à jour publiée.'}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="tn-empty-state">
            <ShieldCheck size={24} aria-hidden="true" />
            <div>
              <h3>Aucune note publique reçue</h3>
              <p>La roadmap éditoriale reste disponible, mais aucune mise à jour n’est présentée comme réelle.</p>
            </div>
          </div>
        )}
      </section>

      <TikTokFeature />

      <section className="tn-section">
        <div className="tn-section-heading">
          <div>
            <span className="tn-eyebrow">Raccourcis du réseau</span>
            <h2>Préparer une session</h2>
          </div>
          <Link className="button button-secondary" href="/photos">
            Médias <Camera size={17} />
          </Link>
        </div>
        <div className="tn-quick-grid">
          {quickLinks.map((item) => (
            <Link href={item.href} key={item.href}>
              <item.icon size={20} aria-hidden="true" />
              <div>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="tn-account-strip">
        <div>
          <span className="tn-eyebrow">Services joueur</span>
          <h2>
            {session?.user
              ? `Dossier actif — ${session.user.name ?? 'survivant'}`
              : 'Le compte Discord reste optionnel'}
          </h2>
          <p>Il sert uniquement au profil, au support et à la candidature staff.</p>
        </div>
        <div className="tn-hero-actions">
          {session?.user ? (
            <Link className="button button-primary" href="/dashboard">
              Mon dossier <UserRound size={18} />
            </Link>
          ) : (
            <DiscordLoginButton className="button button-primary" />
          )}
          <Link className="button button-secondary" href="/support">
            Support <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
