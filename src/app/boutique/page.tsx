import Link from 'next/link';
import {
  ArrowRight,
  Car,
  Command,
  CreditCard,
  Crosshair,
  ExternalLink,
  Gift,
  Shield,
  ShieldCheck,
  Store,
  Users,
  Zap,
} from 'lucide-react';

import { publicLinks } from '@/config/site';

const boutiqueChannelUrl = 'https://discord.com/channels/1427655279352484065/1442983607005085738';
const storeUrl = publicLinks.storeUrl.trim() || boutiqueChannelUrl;

const coinPacks = [
  { label: '1.000 Coins', price: '10$', detail: 'Pack starter pour tester la boutique.' },
  { label: '2.000 Coins', price: '15$', detail: 'Pack leger pour une arme ou une reserve.' },
  { label: '5.000 Coins', price: '30$', detail: 'Pack expedition pour vehicule ou plusieurs achats.' },
  { label: '10.000 Coins', price: '55$', detail: 'Pack groupe pour preparer une grosse session.' },
  { label: '20.000 Coins', price: '100$', detail: 'Pack soutien majeur pour les gros projets RP.' },
];

const shopSignals = [
  { label: 'Nom ressource', value: 'Boutique Z47', icon: Store },
  { label: 'Commande en jeu', value: '/boutique2', icon: Command },
  { label: 'Coins offerts', value: '500 a la premiere connexion', icon: Gift },
  { label: 'Categories actives', value: 'Vehicules, armes, gestion coins', icon: ShieldCheck },
];

const categories = [
  {
    title: 'Vehicules',
    state: 'Active',
    text: '12 modeles boutique configures avec test vehicule et achat par coins.',
  },
  {
    title: 'Armes',
    state: 'Active',
    text: '22 armes de melee/improvisees a 1.250 coins, coherentes avec le theme survie.',
  },
  {
    title: 'Gestion',
    state: 'Active',
    text: 'Achat de coins et transfert possible via code boutique joueur.',
  },
  {
    title: 'Argent / caisses',
    state: 'Desactive',
    text: 'Les packs argent et caisses existent dans le script mais sont masques par la configuration actuelle.',
  },
];

const vehicles = [
  { label: 'Apollo', model: 'apollo', coins: 3000, speed: 110, seats: 4, image: '/shop/vehicles/apollo.png' },
  { label: 'Ares', model: 'ares', coins: 3000, speed: 110, seats: 4, image: '/shop/vehicles/ares.png' },
  { label: 'Ant', model: 'ant', coins: 2500, speed: 110, seats: 2, image: '/shop/vehicles/ant.png' },
  { label: 'Beast', model: 'beast', coins: 5000, speed: 110, seats: 2, image: '/shop/vehicles/beast.png' },
  { label: 'Burutus', model: 'burutus', coins: 5000, speed: 110, seats: 4, image: '/shop/vehicles/burutus.png' },
  { label: 'Hawk', model: 'hawk', coins: 5000, speed: 110, seats: 4, image: '/shop/vehicles/hawk.png' },
  { label: 'Knight', model: 'knight', coins: 5000, speed: 110, seats: 2, image: '/shop/vehicles/knight.png' },
  { label: 'Mammoth', model: 'mammoth', coins: 5000, speed: 110, seats: 4, image: '/shop/vehicles/mammoth.png' },
  { label: 'Moth', model: 'moth', coins: 5000, speed: 110, seats: 2, image: '/shop/vehicles/moth.png' },
  { label: 'Panther', model: 'panther', coins: 5000, speed: 110, seats: 4, image: '/shop/vehicles/panther.png' },
  { label: 'Rambo', model: 'rambo', coins: 4000, speed: 110, seats: 4, image: '/shop/vehicles/rambo.png' },
  { label: 'Wasp', model: 'wasp', coins: 3000, speed: 110, seats: 2, image: '/shop/vehicles/wasp.png' },
];

const weapons = [
  { label: 'Batte Cloutee du Survivant', code: 'weapon_bladedbat', image: '/shop/weapons/WEAPON_BLADEDBAT.png' },
  { label: 'Hache de Guerre Ravagee', code: 'WEAPON_BLADEHATCHET', image: '/shop/weapons/WEAPON_BLADEHATCHET.png' },
  { label: 'Hache Disque de Frein', code: 'WEAPON_BRAKEDISCAXE', image: '/shop/weapons/WEAPON_BRAKEDISCAXE.png' },
  { label: 'Pioche Griffe du Charognard', code: 'WEAPON_CLAWAXE', image: '/shop/weapons/WEAPON_CLAWAXE.png' },
  { label: 'Pied de biche du Charognard', code: 'weapon_crowbar', image: '/shop/weapons/weapon_crowbar.png' },
  { label: 'Hache Artisanale Brutale', code: 'WEAPON_CUSTOMAXE', image: '/shop/weapons/WEAPON_CUSTOMAXE.png' },
  { label: 'Batte Renforcee des Ruines', code: 'WEAPON_ENHANCEDBAT', image: '/shop/weapons/WEAPON_ENHANCEDBAT.png' },
  { label: 'Panneau Stop Sanglant', code: 'WEAPON_GIVEWAYSIGN', image: '/shop/weapons/WEAPON_GIVEWAYSIGN.png' },
  { label: 'Batte Meuleuse', code: 'WEAPON_GRINDERBAT', image: '/shop/weapons/WEAPON_GRINDERBAT.png' },
  { label: 'Hachette du Chasseur Dechu', code: 'WEAPON_HUNTERHATCHET', image: '/shop/weapons/WEAPON_HUNTERHATCHET.png' },
  { label: 'Couteau de Survie Rouille', code: 'weapon_knife', image: '/shop/weapons/weapon_knife.png' },
  { label: 'Batte Barbelee Lucille', code: 'WEAPON_LUCILLE', image: '/shop/weapons/WEAPON_LUCILLE.png' },
  { label: 'Faucille du Moissonneur', code: 'WEAPON_SICKLE', image: '/shop/weapons/WEAPON_SICKLE.png' },
  { label: 'Petite Hache de Camp', code: 'WEAPON_SMALLAXE', image: '/shop/weapons/WEAPON_SMALLAXE.png' },
  { label: 'Batte Cloutee Sauvage', code: 'WEAPON_SPIKEYSICKLE', image: '/shop/weapons/WEAPON_SPIKEYSICKLE.png' },
  { label: 'Cle Anglaise Lame Improvisee', code: 'WEAPON_WRENCHKNIFE', image: '/shop/weapons/WEAPON_WRENCHKNIFE.png' },
  { label: 'Hache du Zero Absolu', code: 'WEAPON_ZFIREAXE', image: '/shop/weapons/WEAPON_ZFIREAXE.png' },
  { label: 'Hallebarde du Chaos', code: 'WEAPON_ZHALBERD', image: '/shop/weapons/WEAPON_ZHALBERD.png' },
  { label: 'Marteau du Jugement', code: 'WEAPON_ZHAMMER', image: '/shop/weapons/WEAPON_ZHAMMER.png' },
  { label: 'Hachette du Devastateur', code: 'WEAPON_ZHATCHET', image: '/shop/weapons/WEAPON_ZHATCHET.png' },
  { label: 'Katana du Dernier Samourai', code: 'WEAPON_ZKATANA', image: '/shop/weapons/WEAPON_ZKATANA.png' },
  { label: 'Machette des Terres Brulees', code: 'WEAPON_ZMACHETTE', image: '/shop/weapons/WEAPON_ZMACHETTE.png' },
];

export default function BoutiquePage() {
  return (
    <>
      <header className="shop-hero">
        <div className="shop-hero-copy">
          <span className="shop-kicker">Catalogue public / BoutiqueV4</span>
          <h1>Boutique Z47</h1>
          <p>
            Page mise a jour depuis la ressource FiveM BoutiqueV4. Le site presente les packs coins, les vehicules et
            les armes actuellement configures pour Last Survivors, sans exposer la logique serveur.
          </p>
          <div className="shop-hero-actions">
            <a className="button button-primary" href={storeUrl} target="_blank" rel="noreferrer">
              Ouvrir les offres <ExternalLink size={18} />
            </a>
            <Link className="button button-secondary" href="/reglement">
              Regles serveur <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <aside className="shop-terminal" aria-label="Infos boutique en jeu">
          <CreditCard size={30} />
          <strong>En jeu</strong>
          <p>
            Ouvre la boutique avec <code>/boutique2</code>. Le PNJ affiche <code>boutique LAST SURVIVORS</code>.
          </p>
        </aside>
      </header>

      <section className="shop-signal-grid" aria-label="Signaux boutique">
        {shopSignals.map((signal) => (
          <article className="shop-signal" key={signal.label}>
            <signal.icon size={21} />
            <span>{signal.label}</span>
            <strong>{signal.value}</strong>
          </article>
        ))}
      </section>

      <section className="shop-warning">
        <ShieldCheck size={22} />
        <p>
          Les achats restent lies aux coins boutique et aux validations serveur. Les packs argent et caisses sont
          visibles dans le script, mais desactives dans la configuration actuelle pour garder l economie sous controle.
        </p>
      </section>

      <section className="shop-category-grid" aria-label="Etat des categories">
        {categories.map((category) => (
          <article className="shop-category-card" data-state={category.state.toLowerCase()} key={category.title}>
            <span>{category.state}</span>
            <h2>{category.title}</h2>
            <p>{category.text}</p>
          </article>
        ))}
      </section>

      <section className="shop-credit-section" aria-labelledby="coin-packs-title">
        <div>
          <span className="section-kicker">Gestion active</span>
          <h2 id="coin-packs-title">Packs coins</h2>
          <p>
            Les liens de la ressource BoutiqueV4 pointent vers le salon Discord boutique. Les prix ci-dessous viennent
            de la configuration actuelle.
          </p>
        </div>

        <div className="shop-credit-grid">
          {coinPacks.map((pack) => (
            <a className="shop-credit-pack" href={storeUrl} target="_blank" rel="noreferrer" key={pack.label}>
              <img src="/shop/creditImg.png" alt="" loading="lazy" />
              <span>{pack.label}</span>
              <strong>{pack.price}</strong>
              <p>{pack.detail}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="shop-catalog-section" aria-labelledby="vehicle-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Vehicules boutique</span>
            <h2 id="vehicle-title">12 modeles disponibles</h2>
          </div>
          <p>Chaque vehicule est configure avec test en jeu, prix en coins, vitesse et nombre de places.</p>
        </div>

        <div className="shop-vehicle-grid">
          {vehicles.map((vehicle) => (
            <article className="shop-vehicle-card" key={vehicle.model}>
              <div className="shop-product-media">
                <img src={vehicle.image} alt={vehicle.label} loading="lazy" />
              </div>
              <div className="shop-product-body">
                <span>{vehicle.model}</span>
                <h3>{vehicle.label}</h3>
                <div className="shop-product-meta">
                  <strong>
                    <CreditCard size={15} />
                    {vehicle.coins} coins
                  </strong>
                  <strong>
                    <Zap size={15} />
                    {vehicle.speed}
                  </strong>
                  <strong>
                    <Users size={15} />
                    {vehicle.seats} places
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shop-catalog-section" aria-labelledby="weapon-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Armes boutique</span>
            <h2 id="weapon-title">22 armes de survie</h2>
          </div>
          <p>Toutes les armes configurees dans BoutiqueV4 sont a 1.250 coins.</p>
        </div>

        <div className="shop-weapon-grid">
          {weapons.map((weapon) => (
            <article className="shop-weapon-card" key={weapon.code}>
              <img src={weapon.image} alt={weapon.label} loading="lazy" />
              <div>
                <span>{weapon.code}</span>
                <h3>{weapon.label}</h3>
                <strong>
                  <CreditCard size={15} />
                  1250 coins
                </strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shop-final-panel">
        <div>
          <Shield size={26} />
          <h2>Important pour le RP</h2>
          <p>
            La boutique doit soutenir le serveur sans remplacer les scenes. Les vehicules et armes doivent rester
            justifies en RP: provenance, stockage, risques, pertes et consequences.
          </p>
        </div>

        <aside>
          <Car size={28} />
          <strong>Resume catalogue</strong>
          <ul>
            <li>
              <Store size={15} />
              Boutique active: vehicules, armes, gestion coins
            </li>
            <li>
              <Crosshair size={15} />
              Armes configurees comme items boutique
            </li>
            <li>
              <ShieldCheck size={15} />
              Argent et caisses masques par configuration
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}
