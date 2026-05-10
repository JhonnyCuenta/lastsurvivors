import Link from 'next/link';
import { ArrowRight, ExternalLink, ShieldCheck, Store } from 'lucide-react';
import { publicLinks, shopCards } from '@/config/site';

export default function BoutiquePage() {
  const hasStore = publicLinks.storeUrl.trim().length > 0;

  return (
    <>
      <header className="page-heading shop-heading">
        <span className="hero-badge">
          <span className="pulse-dot" />
          Soutien serveur
        </span>
        <h1>Boutique</h1>
        <p>
          Une boutique propre pour soutenir Last Survivors sans transformer la survie en pay-to-win. Les avantages doivent
          rester RP, cosmetiques ou communautaires.
        </p>
        <div className="hero-actions">
          {hasStore ? (
            <a className="button button-primary" href={publicLinks.storeUrl} target="_blank" rel="noreferrer">
              Ouvrir la boutique <ExternalLink size={18} />
            </a>
          ) : (
            <span className="button button-secondary disabled-button">
              Boutique en preparation <Store size={18} />
            </span>
          )}
          <Link className="button button-secondary" href="/reglement">
            Regles serveur <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      <section className="shop-warning">
        <ShieldCheck size={22} />
        <p>
          Aucun achat ne doit donner d argent, item rare, arme ou permission abusive directement en jeu. Les rewards
          sensibles restent controles cote serveur et staff.
        </p>
      </section>

      <section className="shop-grid">
        {shopCards.map((card) => (
          <article className="shop-card" key={card.title}>
            <span className="card-kicker">{card.price}</span>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <ul>
              {card.items.map((item) => (
                <li key={item}>
                  <ShieldCheck size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
