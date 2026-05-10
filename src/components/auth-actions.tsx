import Link from 'next/link';
import { LogIn, LogOut, UserRound } from 'lucide-react';
import { signIn, signOut } from '@/auth';
import type { Session } from 'next-auth';

export function DiscordLoginButton({
  label = 'Connexion Discord',
  className = 'button button-secondary',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('discord', { redirectTo: '/profil' });
      }}
      className="auth-form"
    >
      <button type="submit" className={className}>
        <LogIn size={17} />
        {label}
      </button>
    </form>
  );
}

export function DiscordLogoutButton({ compact = false }: { compact?: boolean }) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
      className="auth-form"
    >
      <button type="submit" className="icon-button" aria-label="Deconnexion Discord">
        <LogOut size={17} />
        {!compact ? <span>Quitter</span> : null}
      </button>
    </form>
  );
}

export function HeaderAuth({ session }: { session: Session | null }) {
  if (!session?.user) {
    return <DiscordLoginButton label="Discord" className="button button-secondary header-auth-button" />;
  }

  return (
    <div className="auth-menu" aria-label="Compte Discord">
      <Link href="/profil" className="auth-profile">
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="" className="avatar" referrerPolicy="no-referrer" />
        ) : (
          <span className="avatar avatar-fallback">
            <UserRound size={16} />
          </span>
        )}
        <span className="auth-name">{session.user.name ?? 'Survivant'}</span>
      </Link>
      <DiscordLogoutButton compact />
    </div>
  );
}
