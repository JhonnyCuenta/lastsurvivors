import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-heading">
      <h1>Signal perdu</h1>
      <p>Cette page n existe pas dans le portail public Last Survivors.</p>
      <Link className="button button-primary" href="/" style={{ marginTop: 24 }}>
        Retour accueil
      </Link>
    </section>
  );
}
