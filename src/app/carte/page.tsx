import { MapOverview } from '@/components/map-overview';

export default function CartePage() {
  return (
    <>
      <header className="page-heading">
        <h1>Carte utile</h1>
        <p>
          Une vue publique pour reperer les zones de danger, les points strategiques et les trajets plus calmes.
          Aucune position joueur ni information staff sensible n est affichee.
        </p>
      </header>

      <MapOverview />
    </>
  );
}
