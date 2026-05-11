import Link from 'next/link';
import { CalendarDays, LifeBuoy, MessageCircle } from 'lucide-react';
import { auth } from '@/auth';
import { HeaderAuth } from '@/components/auth-actions';
import { siteConfig } from '@/config/site';
import { SiteNav } from '@/components/site-nav';
import { CopyConnectButton } from '@/components/copy-connect-button';
import { getDiscordAuthStatus } from '@/lib/auth-config';

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const authStatus = getDiscordAuthStatus();

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="brand" aria-label="Accueil Last Survivors">
            <span className="brand-mark">LS</span>
            <span className="brand-copy">
              <span className="brand-title">{siteConfig.name}</span>
              <small>Portail survivants</small>
            </span>
          </Link>
          <SiteNav />
          <div className="header-actions">
            <CopyConnectButton className="button button-primary header-connect" compact />
            <HeaderAuth session={session} authStatus={authStatus} />
          </div>
        </div>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <span>LAST SURVIVORS - Portail joueurs</span>
          <span className="footer-links">
            <Link href="/changelog">
              <CalendarDays size={16} /> Roadmap
            </Link>
            <Link href="/support">
              <LifeBuoy size={16} /> Support
            </Link>
            <Link href="/communaute">
              <MessageCircle size={16} /> Communaute
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
