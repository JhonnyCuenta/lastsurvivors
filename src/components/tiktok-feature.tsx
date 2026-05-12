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
        <h2>La vibe Last Survivors en video</h2>
        <p>
          Un apercu court et direct de l ambiance serveur: routes mortes, groupes qui se forment, tension RP et survie
          francophone.
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
          title="Video TikTok officielle Last Survivors"
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
