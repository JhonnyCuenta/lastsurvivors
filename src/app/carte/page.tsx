import { MapOverview } from '@/components/map-overview';

export default function CartePage() {
  return (
    <>
      <header className="page-heading">
        <span className="section-kicker">Renseignement terrain</span>
        <h1>Carte officielle</h1>
        <p>
          Cette carte remplace entièrement l’ancienne version du portail. Elle provient de la ressource active
          ml_custommap et présente les zones ainsi que les repères réellement prévus pour le serveur.
        </p>
      </header>

      <MapOverview />
    </>
  );
}
