import Link from 'next/link';
import { ClipboardList, Database, ExternalLink, LifeBuoy, MessageCircle, Radio, ShieldCheck } from 'lucide-react';
import { TikTokFeature } from '@/components/tiktok-feature';
import { communityLinks, defaultCommunityAction, faqItems } from '@/config/site';

export default function CommunautePage() {
  const EmptyIcon = defaultCommunityAction.icon;

  return (
    <>
      <header className="page-heading">
        <h1>Communauté</h1>
        <p>Discord, votes, photos et support : les canaux vérifiés entre deux sessions.</p>
      </header>

      {communityLinks.length > 0 ? (
        <section className="community-list">
          <Link className="community-card" href="/candidature">
            <span className="card-icon">
              <ClipboardList size={22} />
            </span>
            <h3>Candidature staff</h3>
            <p>Propose ton aide pour rejoindre l’équipe et soutenir le serveur.</p>
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
            <p>Connecte Discord uniquement si tu veux postuler dans l’équipe.</p>
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
          <h2>Des sources clairement identifiées</h2>
          <p>
            Le portail distingue les données du bot, les informations FiveM et les publications
            Discord. Aucun témoignage anonyme n’est utilisé comme preuve sociale.
          </p>
        </div>
        <div className="quote-stack tn-source-stack">
          <article>
            <ShieldCheck size={18} />
            <strong>Discord officiel</strong>
            <p>Annonces et événements planifiés vérifiés.</p>
          </article>
          <article>
            <Database size={18} />
            <strong>Bot Last Survivors</strong>
            <p>Transmissions publiques filtrées, sans données sensibles.</p>
          </article>
          <article>
            <Radio size={18} />
            <strong>FiveM</strong>
            <p>Statut et signaux terrain, conservés comme obsolètes en cas de coupure.</p>
          </article>
        </div>
      </section>

      <TikTokFeature compact />

      <section className="premium-section split-showcase">
        <div>
          <span className="premium-overline">
            <Radio size={16} />
            Questions rapides
          </span>
          <h2>FAQ joueur</h2>
          <p>
            Les réponses simples avant de rejoindre le serveur. Pour un cas précis, passe par le Discord officiel.
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
