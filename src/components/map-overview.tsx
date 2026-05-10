import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { mapZones } from '@/config/site';

type Props = {
  compact?: boolean;
};

export function MapOverview({ compact = false }: Props) {
  const zones = compact ? mapZones.slice(0, 4) : mapZones;

  return (
    <div className="map-stage">
      <div className="map-frame">
        <Image
          src="/mapgta.png"
          alt="Carte publique de San Andreas pour Last Survivors"
          fill
          sizes="(max-width: 900px) 100vw, 760px"
          priority
        />
        {zones.map((zone) => (
          <span
            key={zone.name}
            className={`map-marker ${zone.tone}`}
            style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
            title={zone.name}
          >
            <MapPin size={12} />
          </span>
        ))}
      </div>
      <div className="zone-list">
        {zones.map((zone) => (
          <article className="zone-item" key={zone.name}>
            <strong>{zone.name}</strong>
            <span>{zone.type}</span>
            <p>{zone.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
