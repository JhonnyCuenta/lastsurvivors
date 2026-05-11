import Link from 'next/link';
import { ArrowRight, Bug, HelpCircle, LifeBuoy, MessageCircle, ShoppingBag, UserRound } from 'lucide-react';
import { auth } from '@/auth';
import { DiscordLoginButton } from '@/components/auth-actions';
import { SupportTicketForm } from '@/components/support-ticket-form';
import { publicLinks } from '@/config/site';

export const dynamic = 'force-dynamic';

const supportTypes = [
  {
    title: 'Bug serveur',
    text: 'Erreur script, recompense manquante, souci inventaire, vehicule bloque ou comportement anormal.',
    icon: Bug,
  },
  {
    title: 'Signalement joueur',
    text: 'Scene abusive, HRP, comportement lourd ou situation a revoir calmement avec le staff.',
    icon: UserRound,
  },
  {
    title: 'Boutique',
    text: 'Question achat, pack, coins, lien boutique ou suivi d une commande.',
    icon: ShoppingBag,
  },
  {
    title: 'Question rapide',
    text: 'Reglement, events, connexion, vote ou information utile avant de jouer.',
    icon: HelpCircle,
  },
];

export default async function SupportPage() {
  const session = await auth();

  return (
    <>
      <section className="server-hero support-hero">
        <div>
          <span className="section-kicker">Support Last Survivors</span>
          <h1>Ouvre un ticket propre.</h1>
          <p>
            Un probleme en jeu, une question boutique ou une situation a signaler ? Decris les faits clairement et le
            staff reprendra la suite sur Discord.
          </p>
          <div className="premium-actions">
            <a className="button button-secondary" href={publicLinks.discordUrl} target="_blank" rel="noreferrer">
              Discord <MessageCircle size={18} />
            </a>
            <Link className="button button-ghost" href="/reglement">
              Reglement <ArrowRight size={18} />
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
          <h2>Avant d envoyer</h2>
          <p>
            Donne un sujet clair, l heure approximative, le lieu, les pseudos si tu les connais et ce que tu attends du
            staff. Plus c est precis, plus la reponse sera rapide.
          </p>
          <div className="link-stack">
            <Link href="/reglement">Relire le reglement</Link>
            <Link href="/guide">Voir le guide</Link>
            <Link href="/evenements">Voir les events</Link>
          </div>
          {!session?.user ? (
            <div className="support-login-note">
              <p>Connexion Discord optionnelle, mais conseillee pour etre reconnu automatiquement.</p>
              <DiscordLoginButton className="button button-secondary" />
            </div>
          ) : null}
        </article>

        <SupportTicketForm isLoggedIn={Boolean(session?.user)} discordName={session?.user?.name} />
      </section>
    </>
  );
}
