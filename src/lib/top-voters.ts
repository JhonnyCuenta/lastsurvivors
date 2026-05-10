export type PublicTopVoter = {
  rank: number;
  playername: string;
  votes: number;
  lastVoteAt?: string;
};

export type PublicTopVotersFeed = {
  voters: PublicTopVoter[];
  lastCheckedAt: string;
  source: 'fivem-resource' | 'fallback';
};

const DEFAULT_SERVER_ENDPOINT = 'http://49.12.121.140:30175';

function getFiveMBaseEndpoint() {
  const raw = (process.env.FIVEM_SERVER_ENDPOINT || DEFAULT_SERVER_ENDPOINT).trim();
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `http://${raw}`;
  return withProtocol.replace(/\/dynamic\.json$/i, '').replace(/\/+$/, '');
}

function getTopVotersEndpoint() {
  const configured = process.env.VOTE_TOP_ENDPOINT?.trim();
  if (configured) return configured;
  return `${getFiveMBaseEndpoint()}/voterecompense/top-voters`;
}

function fallbackFeed(): PublicTopVotersFeed {
  return {
    voters: [],
    lastCheckedAt: new Date().toISOString(),
    source: 'fallback',
  };
}

function asSafeString(value: unknown, fallback: string, maxLength = 50) {
  if (typeof value !== 'string') return fallback;
  const cleaned = value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

function asSafeVotes(value: unknown) {
  const votes = Number(value);
  if (!Number.isFinite(votes) || votes < 0) return 0;
  return Math.min(Math.round(votes), 100000);
}

function normalizeFeed(payload: unknown): PublicTopVotersFeed {
  const data = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {};
  const rows = Array.isArray(data.voters) ? data.voters : [];

  return {
    voters: rows.slice(0, 10).map((row, index) => {
      const voter = row && typeof row === 'object' ? (row as Record<string, unknown>) : {};
      return {
        rank: index + 1,
        playername: asSafeString(voter.playername ?? voter.name, 'Survivant'),
        votes: asSafeVotes(voter.votes),
        lastVoteAt: typeof voter.lastVoteAt === 'string' ? voter.lastVoteAt : undefined,
      };
    }),
    lastCheckedAt: new Date().toISOString(),
    source: 'fivem-resource',
  };
}

export async function getTopVoters(): Promise<PublicTopVotersFeed> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(getTopVotersEndpoint(), {
      cache: 'no-store',
      headers: { accept: 'application/json' },
      signal: controller.signal,
    });

    if (!response.ok) return fallbackFeed();

    return normalizeFeed(await response.json());
  } catch {
    return fallbackFeed();
  } finally {
    clearTimeout(timeout);
  }
}
