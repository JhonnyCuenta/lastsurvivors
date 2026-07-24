'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '@/config/site';

type Props = {
  className?: string;
  compact?: boolean;
};

export function CopyConnectButton({ className = 'button button-primary', compact = false }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(siteConfig.connectCommand);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className={className} onClick={copyCommand}>
      {copied ? <Check size={18} /> : <Copy size={18} />}
      {copied ? 'Copié' : compact ? 'Connexion' : 'Copier la commande'}
    </button>
  );
}
