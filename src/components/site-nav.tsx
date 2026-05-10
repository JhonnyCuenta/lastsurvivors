'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '@/config/site';

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <>
      {siteConfig.nav.map((item) => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link
            className={`nav-link${active ? ' active' : ''}`}
            href={item.href}
            key={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {nav}
      </nav>
      <button
        type="button"
        className="button button-ghost mobile-menu-button"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      {open ? (
        <nav className="mobile-nav" aria-label="Navigation mobile">
          {nav}
        </nav>
      ) : null}
    </>
  );
}
