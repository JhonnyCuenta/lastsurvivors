import { MapOverview } from '@/components/map-overview';

export default function CartePage() {
  return (
    <>
      <header className="page-heading">
        <h1>Carte utile</h1>
        <p>Une vue publique pour te reperer avant une sortie. Elle n affiche aucune position joueur et aucun emplacement staff sensible.</p>
      </header>

      <MapOverview />
    </>
  );
}
