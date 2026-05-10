import Link from 'next/link';
import { ClipboardList, ExternalLink } from 'lucide-react';
import { communityLinks, defaultCommunityAction } from '@/config/site';

export default function CommunautePage() {
  const EmptyIcon = defaultCommunityAction.icon;

  return (
    <>
      <header className="page-heading">
        <h1>Communaute</h1>
        <p>Les liens publics apparaissent ici des qu ils sont configures. Discord reste le point central pour support, annonces et candidatures.</p>
      </header>

      {communityLinks.length > 0 ? (
        <section className="community-list">
          <Link className="community-card" href="/candidature">
            <span className="card-icon">
              <ClipboardList size={22} />
            </span>
            <h3>Candidature</h3>
            <p>Envoie une candidature au staff avec verification Discord membre.</p>
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
            <h3>Candidature</h3>
            <p>Connexion Discord membre requise, sans compte obligatoire pour lire le portail.</p>
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
    </>
  );
}
