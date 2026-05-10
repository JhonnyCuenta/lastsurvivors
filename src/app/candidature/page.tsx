import Link from 'next/link';
import { ClipboardList, ShieldCheck } from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton } from '@/components/auth-actions';
import { CandidatureForm } from '@/components/candidature-form';

export const dynamic = 'force-dynamic';

export default async function CandidaturePage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <>
        <header className="page-heading">
          <h1>Candidature</h1>
          <p>Les candidatures sont reservees aux membres Discord pour eviter le spam et garder un suivi propre avec le staff.</p>
        </header>

        <section className="profile-grid">
          <article className="profile-card">
            <span className="card-icon">
              <ClipboardList size={22} />
            </span>
            <h2>Connexion requise pour candidater</h2>
            <p>Le reste du portail reste public. Pour envoyer une candidature, connecte ton Discord membre Last Survivors.</p>
            <DiscordLoginButton className="button button-primary" />
          </article>
          <article className="profile-card muted-card">
            <span className="card-icon">
              <ShieldCheck size={22} />
            </span>
            <h2>Donnees limitees</h2>
            <p>La candidature part au staff via webhook Discord. Aucune base joueur, inventaire ou donnee FiveMetrics n est lue ici.</p>
          </article>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="page-heading candidature-heading">
        <h1>Candidature</h1>
        <p>
          Connecte en tant que <strong>{session.user.name ?? 'survivant Discord'}</strong>. Remplis le formulaire avec
          des infos RP propres; il sera envoye directement au staff.
        </p>
      </header>

      <section className="two-grid form-layout">
        <article className="profile-card muted-card">
          <span className="card-icon">
            <ShieldCheck size={22} />
          </span>
          <h2>Avant d envoyer</h2>
          <p>Sois precis, evite le copier-coller vide, et garde une histoire jouable sur un serveur post-apo/zombies.</p>
          <div className="link-stack">
            <Link href="/reglement">Relire le reglement</Link>
            <Link href="/guide">Voir le guide de survie</Link>
            <Link href="/communaute">Liens communaute</Link>
          </div>
        </article>
        <CandidatureForm />
      </section>
    </>
  );
}
