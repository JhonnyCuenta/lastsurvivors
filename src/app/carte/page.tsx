import { MapOverview } from '@/components/map-overview';

export default function CartePage() {
  return (
    <>
      <header className="page-heading">
        <h1>Carte utile</h1>
        <p>
          Les grands reperes pour preparer une sortie: point de depart, observatoire, nord dangereux et sud plus calme.
          Prends la carte comme une aide de route, pas comme une garantie de survie.
        </p>
      </header>

      <MapOverview />
    </>
  );
}
