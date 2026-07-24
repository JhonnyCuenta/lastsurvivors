import Link from 'next/link';
import { CalendarDays, LifeBuoy, MessageCircle, Radio } from 'lucide-react';
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
      <a className="tn-skip-link" href="#contenu-principal">
        Aller au contenu
      </a>
      <div className="tn-atmosphere" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="brand" aria-label="Accueil Last Survivors">
            <span className="brand-mark" aria-hidden="true">
              <b>L</b><b>S</b>
            </span>
            <span className="brand-copy">
              <span className="brand-title">{siteConfig.name}</span>
              <small>Réseau de transmission</small>
            </span>
          </Link>
          <SiteNav />
          <div className="header-actions">
            <CopyConnectButton className="button button-primary header-connect" compact />
            <HeaderAuth session={session} authStatus={authStatus} />
          </div>
        </div>
      </header>
      <main className="main-content" id="contenu-principal">{children}</main>
      <footer className="footer">
        <div className="footer-inner">
          <span className="tn-footer-signal">
            <Radio size={15} aria-hidden="true" /> LS · Relais public
          </span>
          <span className="footer-links">
            <Link href="/changelog">
              <CalendarDays size={16} /> Journal
            </Link>
            <Link href="/support">
              <LifeBuoy size={16} /> Support
            </Link>
            <Link href="/communaute">
              <MessageCircle size={16} /> Communauté
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
