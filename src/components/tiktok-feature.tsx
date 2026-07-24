import { ExternalLink, Play } from 'lucide-react';
import { featuredTikTok } from '@/config/site';

type Props = {
  compact?: boolean;
};

export function TikTokFeature({ compact = false }: Props) {
  return (
    <section className={`section tiktok-feature${compact ? ' tiktok-feature-compact' : ''}`}>
      <div className="tiktok-copy">
        <span className="section-kicker">Spot officiel</span>
        <h2>L’ambiance Last Survivors en vidéo</h2>
        <p>
          Un aperçu court et direct de l’ambiance serveur : routes mortes, groupes qui se
          forment, tension RP et survie francophone.
        </p>
        <div className="showcase-actions">
          <a className="button button-primary" href={featuredTikTok.url} target="_blank" rel="noreferrer">
            Voir sur TikTok <ExternalLink size={18} />
          </a>
          <span className="tiktok-author">
            <Play size={16} />
            {featuredTikTok.author}
          </span>
        </div>
      </div>

      <div className="tiktok-frame-shell">
        <iframe
          title="Vidéo TikTok officielle Last Survivors"
          src={featuredTikTok.embedUrl}
          loading="lazy"
          allow="encrypted-media; clipboard-write; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
