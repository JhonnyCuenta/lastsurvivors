import { Camera, ExternalLink, Images, Radio } from 'lucide-react';
import { publicLinks } from '@/config/site';
import { getDiscordPhotos } from '@/lib/discord-photos';

export const dynamic = 'force-dynamic';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(new Date(value));
}

export default async function PhotosPage() {
  const feed = await getDiscordPhotos();
  const channelUrl = publicLinks.discordMediaChannelUrl || publicLinks.discordUrl;
  const diagnostics = feed.diagnostics;
  const checkedLabel = diagnostics
    ? `${diagnostics.messagesChecked} messages lus sur ${diagnostics.pagesChecked} lot${diagnostics.pagesChecked > 1 ? 's' : ''}, ${feed.photos.length} photo${feed.photos.length > 1 ? 's' : ''} affichée${feed.photos.length > 1 ? 's' : ''}`
    : null;

  return (
    <>
      <header className="page-heading photos-heading">
        <span className="hero-badge">
          <span className="pulse-dot" />
          Galerie Discord
        </span>
        <h1>Photos</h1>
        <p>
          Les meilleurs moments RP postés sur Discord peuvent apparaître ici : convois, rencontres, scènes tendues et
          souvenirs de survivants.
        </p>
        <div className="photo-toolbar">
          <span>
            <Radio size={16} />
            {feed.source === 'discord-channel' ? 'Flux Discord actif' : 'Flux Discord en attente'}
          </span>
          {channelUrl ? (
            <a href={channelUrl} target="_blank" rel="noreferrer">
              Ouvrir Discord <ExternalLink size={15} />
            </a>
          ) : null}
        </div>
      </header>

      {feed.photos.length > 0 ? (
        <section className="photo-grid">
          {feed.photos.map((photo) => (
            <article className="photo-card" key={photo.id}>
              <a href={photo.messageUrl || photo.url} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt={photo.filename} loading="lazy" referrerPolicy="no-referrer" />
              </a>
              <div>
                <strong>{photo.authorName}</strong>
                <span>{formatDate(photo.postedAt)}</span>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-gallery">
          <span className="card-icon">
            {feed.configured ? <Camera size={22} /> : <Images size={22} />}
          </span>
          <h2>{feed.configured ? 'Aucune photo récente' : 'Galerie en préparation'}</h2>
          <p>
            {feed.configured
              ? 'Aucune capture récente n’a été trouvée. Poste tes scènes sur le salon photo Discord.'
              : 'Les captures RP apparaîtront ici dès que la galerie Discord sera active.'}
          </p>
          {feed.configured && checkedLabel ? <p className="gallery-diagnostic">{checkedLabel}</p> : null}
        </section>
      )}
    </>
  );
}
