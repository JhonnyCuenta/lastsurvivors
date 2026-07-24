import { Download, Maximize2 } from 'lucide-react';

type Props = {
  compact?: boolean;
};

export function MapOverview({ compact = false }: Props) {
  return (
    <figure className={`server-map-stage${compact ? ' compact' : ''}`}>
      <a
        className="server-map-frame"
        href="/media/server-map.webp"
        target="_blank"
        rel="noreferrer"
        aria-label="Ouvrir la carte officielle en grand"
      >
        <picture>
          <source
            srcSet="/media/server-map-900.avif 900w, /media/server-map.avif 1800w"
            sizes={compact ? '(max-width: 700px) 100vw, 620px' : '(max-width: 960px) 100vw, 920px'}
            type="image/avif"
          />
          <source
            srcSet="/media/server-map-900.webp 900w, /media/server-map.webp 1800w"
            sizes={compact ? '(max-width: 700px) 100vw, 620px' : '(max-width: 960px) 100vw, 920px'}
            type="image/webp"
          />
          <img
            src="/media/server-map.webp"
            srcSet="/media/server-map-900.webp 900w, /media/server-map.webp 1800w"
            sizes={compact ? '(max-width: 700px) 100vw, 620px' : '(max-width: 960px) 100vw, 920px'}
            width="1800"
            height="2700"
            alt="Carte officielle Last Survivors avec les zones sûres, contaminées et les principaux points d’intérêt"
            loading={compact ? 'lazy' : 'eager'}
          />
        </picture>
        <span className="server-map-zoom" aria-hidden="true">
          <Maximize2 size={16} />
        </span>
      </a>
      <figcaption>
        <div>
          <strong>Carte officielle du serveur</strong>
          <span>Zones, routes et points d’intérêt issus directement de la ressource ml_custommap.</span>
        </div>
        <a href="/media/server-map.webp" download>
          <Download size={16} />
          Télécharger
        </a>
      </figcaption>
    </figure>
  );
}
