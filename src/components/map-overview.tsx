import Image from 'next/image';
import { HeartPulse, MapPin, ShieldCheck, Skull } from 'lucide-react';
import { mapZones } from '@/config/site';

type Props = {
  compact?: boolean;
};

export function MapOverview({ compact = false }: Props) {
  const zones = compact ? mapZones.slice(0, 4) : mapZones;
  const markerIcons: Record<string, typeof MapPin> = {
    calm: ShieldCheck,
    danger: Skull,
    medical: HeartPulse,
    strategic: MapPin,
  };

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
        {zones.map((zone) => {
          const MarkerIcon = markerIcons[zone.tone] ?? MapPin;

          return (
            <span
              key={zone.name}
              className={`map-marker ${zone.tone} ${zone.kind}`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              title={zone.name}
            >
              <MarkerIcon size={13} />
              <span className="map-marker-label">{zone.shortLabel}</span>
            </span>
          );
        })}
      </div>
      <div className="zone-list">
        {zones.map((zone) => (
          <article className={`zone-item ${zone.tone}`} key={zone.name}>
            <strong>{zone.name}</strong>
            <span>{zone.type}</span>
            <p>{zone.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
