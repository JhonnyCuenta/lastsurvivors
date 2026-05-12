import { TopVotersBoard } from '@/components/top-voters-board';
import { publicLinks } from '@/config/site';
import { getTopVoters } from '@/lib/top-voters';

export const dynamic = 'force-dynamic';

export default async function TopVotePage() {
  const feed = await getTopVoters();

  return <TopVotersBoard initialFeed={feed} voteUrl={publicLinks.voteUrl} />;
}
