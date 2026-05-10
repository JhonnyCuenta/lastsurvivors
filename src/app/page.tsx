import Link from 'next/link';
import { ArrowRight, Flame, Radio, ShieldCheck, Skull, UserRound } from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton } from '@/components/auth-actions';
import { CopyConnectButton } from '@/components/copy-connect-button';
import { MapOverview } from '@/components/map-overview';
import { ServerStatusPanel } from '@/components/server-status-panel';
import { accountBenefits, healthSignals, quickLinks, staffSignals } from '@/config/site';

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <section className="hero decay-hero">
        <div className="hero-center">
          <span className="hero-badge">
            <span className="pulse-dot" />
            Serveur FiveM post-apocalyptique
          </span>
          <div className="survivor-logo" aria-label="Last Survivors">
            <span className="survivor-logo-mark">
              <Skull size={58} />
            </span>
            <h1>
              <span>LAST</span>
              <span>SURVIVORS</span>
            </h1>
          </div>
          <p className="hero-subtitle">Tenez la zone un jour de plus</p>
          <p className="hero-copy">
            Portail des survivants: connexion rapide, statut serveur, guide utile, carte publique et transmissions RP pour rester en vie dans la Zone.
          </p>
          <div className="hero-actions">
            <CopyConnectButton />
            <Link className="button button-secondary" href="/guide">
              Guide de survie <ArrowRight size={18} />
            </Link>
            {session?.user ? (
              <Link className="button button-secondary" href="/profil">
                Mon profil <UserRound size={18} />
              </Link>
            ) : null}
          </div>
          <div className="security-strip" aria-label="Donnees protegees">
            {staffSignals.map((signal) => (
              <span key={signal}>
                <ShieldCheck size={14} style={{ display: 'inline', marginRight: 6 }} />
                {signal}
              </span>
            ))}
          </div>
          <div className="decay-signal-row" aria-label="Signaux RP">
            <span>
              <Radio size={15} />
              Transmissions Discord
            </span>
            <span>
              <Flame size={15} />
              Tempetes, hordes, airdrops
            </span>
          </div>
        </div>
      </section>

      <section className="server-status-strip">
        <ServerStatusPanel />
      </section>

      <section className="section account-section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Compte optionnel</span>
            <h2>Public pour tous, profil pour les membres Discord</h2>
          </div>
          <p>Le site ne force pas de compte. La connexion Discord sert seulement aux fonctions joueur qui ont besoin d eviter le spam.</p>
        </div>
        <div className="account-panel">
          <div className="account-benefits">
            {accountBenefits.map((item) => (
              <article key={item.title}>
                <span className="card-icon">
                  <item.icon size={21} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="account-cta">
            <h3>{session?.user ? `Connecte: ${session.user.name ?? 'survivant'}` : 'Envie de candidater ?'}</h3>
            <p>
              {session?.user
                ? 'Ton Discord est verifie. Tu peux ouvrir ton espace joueur ou envoyer une candidature.'
                : 'Connecte Discord si tu veux acceder a ton espace joueur et au formulaire candidature.'}
            </p>
            <div className="hero-actions">
              {session?.user ? (
                <Link className="button button-primary" href="/profil">
                  Ouvrir mon profil <ArrowRight size={18} />
                </Link>
              ) : (
                <DiscordLoginButton className="button button-primary" />
              )}
              <Link className="button button-secondary" href="/candidature">
                Candidature <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Acces rapide</span>
            <h2>Ce qui sert vraiment en jeu</h2>
          </div>
          <p>Le site est fait pour les joueurs: moins de blabla, plus de reperes utiles avant de se connecter.</p>
        </div>
        <div className="card-grid">
          {quickLinks.map((item) => (
            <article className="info-card" key={item.href}>
              <span className="card-icon">
                <item.icon size={22} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link href={item.href}>
                Ouvrir <ArrowRight size={15} style={{ display: 'inline', marginLeft: 6 }} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Carte publique</span>
            <h2>Reperes sans fuite sensible</h2>
          </div>
          <p>Les marqueurs donnent une orientation RP. Les positions des joueurs, inventaires et actions staff ne sont jamais exposees.</p>
        </div>
        <MapOverview compact />
      </section>

      <section className="section">
        <div className="card-grid">
          {healthSignals.map((item) => (
            <article className="info-card" key={item.label} style={{ minHeight: 150 }}>
              <span className="card-icon">
                <item.icon size={22} />
              </span>
              <h3>{item.label}</h3>
              <p>{item.value}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
