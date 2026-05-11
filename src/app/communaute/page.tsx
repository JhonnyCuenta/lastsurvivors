import Link from 'next/link';
import { ClipboardList, ExternalLink, LifeBuoy, MessageCircle, Quote, Radio } from 'lucide-react';
import { communityLinks, defaultCommunityAction, faqItems, playerQuotes } from '@/config/site';

export default function CommunautePage() {
  const EmptyIcon = defaultCommunityAction.icon;

  return (
    <>
      <header className="page-heading">
        <h1>Communaute</h1>
        <p>Discord, votes, photos, support et prochains rendez-vous. C est ici que le serveur continue entre deux sessions.</p>
      </header>

      {communityLinks.length > 0 ? (
        <section className="community-list">
          <Link className="community-card" href="/candidature">
            <span className="card-icon">
              <ClipboardList size={22} />
            </span>
            <h3>Candidature staff</h3>
            <p>Propose ton aide pour rejoindre l equipe et soutenir le serveur.</p>
            <span className="community-action">
              Ouvrir <ExternalLink size={15} />
            </span>
          </Link>
          <Link className="community-card" href="/support">
            <span className="card-icon">
              <LifeBuoy size={22} />
            </span>
            <h3>Support</h3>
            <p>Ouvre un ticket propre pour bug, boutique, joueur ou question serveur.</p>
            <span className="community-action">
              Ouvrir <ExternalLink size={15} />
            </span>
          </Link>
          {communityLinks.map((link) => (
            <a className="community-card" href={link.href} key={link.label} target="_blank" rel="noreferrer">
              <span className="card-icon">
                <link.icon size={22} />
              </span>
              <h3>{link.label}</h3>
              <p>{link.text}</p>
              <span className="community-action">
                Ouvrir <ExternalLink size={15} />
              </span>
            </a>
          ))}
        </section>
      ) : (
        <section className="community-list">
          <Link className="community-card" href="/candidature">
            <span className="card-icon">
              <ClipboardList size={22} />
            </span>
            <h3>Candidature staff</h3>
            <p>Connecte Discord uniquement si tu veux postuler staff.</p>
          </Link>
          <Link className="community-card" href="/support">
            <span className="card-icon">
              <LifeBuoy size={22} />
            </span>
            <h3>Support</h3>
            <p>Ouvre un ticket depuis le site, avec ou sans connexion Discord.</p>
          </Link>
          <article className="community-card">
            <span className="card-icon">
              <EmptyIcon size={22} />
            </span>
            <h3>{defaultCommunityAction.title}</h3>
            <p>{defaultCommunityAction.text}</p>
          </article>
        </section>
      )}

      <section className="premium-section community-proof">
        <div className="proof-copy">
          <span className="premium-overline">
            <MessageCircle size={16} />
            Vie du serveur
          </span>
          <h2>Une communaute qui joue le RP.</h2>
          <p>
            Last Survivors marche quand les joueurs prennent le temps de construire des scenes, des alliances,
            des tensions et des vraies consequences en jeu.
          </p>
        </div>
        <div className="quote-stack">
          {playerQuotes.map((quote) => (
            <blockquote key={quote.author}>
              <Quote size={18} />
              <p>{quote.quote}</p>
              <cite>{quote.author}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="premium-section split-showcase">
        <div>
          <span className="premium-overline">
            <Radio size={16} />
            Questions rapides
          </span>
          <h2>FAQ joueur</h2>
          <p>
            Les reponses simples avant de rejoindre le serveur. Pour un cas precis, passe par le Discord.
          </p>
        </div>
        <div className="faq-list">
          {faqItems.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
