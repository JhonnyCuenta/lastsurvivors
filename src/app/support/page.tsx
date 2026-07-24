import Link from 'next/link';
import { ArrowRight, Bug, HelpCircle, LifeBuoy, LockKeyhole, MessageCircle, ShoppingBag, UserRound } from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton } from '@/components/auth-actions';
import { SupportTicketForm } from '@/components/support-ticket-form';
import { publicLinks } from '@/config/site';

export const dynamic = 'force-dynamic';

const supportTypes = [
  {
    title: 'Bug serveur',
    text: 'Erreur script, récompense manquante, souci d’inventaire, véhicule bloqué ou comportement anormal.',
    icon: Bug,
  },
  {
    title: 'Signalement joueur',
    text: 'Scène abusive, HRP, comportement lourd ou situation à revoir calmement avec le staff.',
    icon: UserRound,
  },
  {
    title: 'Boutique',
    text: 'Question sur un achat, un pack, des coins, le lien boutique ou le suivi d’une commande.',
    icon: ShoppingBag,
  },
  {
    title: 'Question rapide',
    text: 'Règlement, événements, connexion, vote ou information utile avant de jouer.',
    icon: HelpCircle,
  },
];

export default async function SupportPage() {
  const session = await auth();
  const canCreateTicket = Boolean(session?.user?.discordId);

  return (
    <>
      <section className="server-hero support-hero">
        <div>
          <span className="section-kicker">Support Last Survivors</span>
          <h1>Ouvre un vrai ticket Discord.</h1>
          <p>
            Ta demande crée directement un salon dans le système de tickets actuel du serveur. Le staff répond au même
            endroit, sans double envoi ni formulaire perdu.
          </p>
          <div className="premium-actions">
            <a className="button button-secondary" href={publicLinks.discordUrl} target="_blank" rel="noreferrer">
              Discord <MessageCircle size={18} />
            </a>
            <Link className="button button-ghost" href="/reglement">
              Règlement <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section premium-card-grid">
        {supportTypes.map((item) => (
          <article className="premium-feature-card" key={item.title}>
            <span className="card-icon">
              <item.icon size={22} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="two-grid form-layout section">
        <article className="profile-card muted-card">
          <span className="card-icon">
            <LifeBuoy size={22} />
          </span>
          <h2>Avant d’envoyer</h2>
          <p>
            Donne un sujet clair, l’heure approximative, le lieu, les pseudos si tu les connais et ce que tu attends du
            staff. Plus c’est précis, plus la réponse sera rapide.
          </p>
          <div className="link-stack">
            <Link href="/reglement">Relire le règlement</Link>
            <Link href="/guide">Voir le guide</Link>
            <Link href="/evenements">Voir les événements</Link>
          </div>
        </article>

        {canCreateTicket ? (
          <SupportTicketForm discordName={session?.user?.name} />
        ) : (
          <article className="application-form support-auth-required">
            <span className="card-icon">
              <LockKeyhole size={22} />
            </span>
            <h2>Connexion Discord requise</h2>
            <p>
              La connexion permet au bot de vérifier ton identité et de t’ajouter automatiquement au salon privé de ton
              ticket.
            </p>
            <DiscordLoginButton className="button button-primary" />
          </article>
        )}
      </section>
    </>
  );
}
