import { useState } from "react";
import "./Card.css";

/* ─────────────────────────────────────────────
   ProductCard — McGray Juice
   Props:
     product: {
       id, name, description, price, volume,
       badge, badgeType, tag, images: string[]
     }
   badgeType: "fresh" | "bestseller" | "new" | "limited"
───────────────────────────────────────────── */

export default function ProductCard({ product }) {
  const {
    name = "Mango Passion Blend",
    description = "Freshly squeezed, naturally sweet. No preservatives, no shortcuts.",
    price = "KSh 150",
    volume = "500ml",
    badge = "Bestseller",
    badgeType = "bestseller",
    tag = "🥭 Mango · Passion",
    images = [],
  } = product || {};

  const [activeImg, setActiveImg] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgError, setImgError] = useState({});

  const displayImages = images.length > 0 ? images : [null];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  const whatsappMsg = encodeURIComponent(
    `Hi McGray Juice! 🍊 I'd like to order *${name}* (${volume}) for *${price}*. Please confirm availability.`
  );
  const whatsappUrl = `https://wa.me/254707515846?text=${whatsappMsg}`;

  const badgeLabels = {
    fresh: { label: "✦ Fresh Today", cls: "badge--fresh" },
    bestseller: { label: "🔥 Bestseller", cls: "badge--bestseller" },
    new: { label: "✨ New Blend", cls: "badge--new" },
    limited: { label: "⚡ Limited", cls: "badge--limited" },
  };
  const badgeInfo = badgeLabels[badgeType] || badgeLabels.fresh;

  return (
    <article className="pc">
      {/* ── IMAGE AREA ── */}
      <div className="pc__img-wrap">
        {/* Badge */}
        <span className={`pc__badge ${badgeInfo.cls}`}>{badgeInfo.label}</span>

        {/* Uniform image container — object-fit handles all sizes */}
        <div className="pc__img-frame">
          {displayImages[activeImg] && !imgError[activeImg] ? (
            <img
              className="pc__img"
              src={displayImages[activeImg]}
              alt={name}
              onError={() => setImgError((e) => ({ ...e, [activeImg]: true }))}
            />
          ) : (
            <div className="pc__img-placeholder">
              <span className="pc__placeholder-icon">🍹</span>
              <span className="pc__placeholder-text">McGray Juice</span>
            </div>
          )}

          {/* Glow orb behind image */}
          <div className="pc__img-glow" />
        </div>

        {/* Thumbnail strip — only if multiple images */}
        {displayImages.length > 1 && (
          <div className="pc__thumbs">
            {displayImages.map((img, i) => (
              <button
                key={i}
                className={`pc__thumb ${i === activeImg ? "pc__thumb--active" : ""}`}
                onClick={() => setActiveImg(i)}
                aria-label={`View image ${i + 1}`}
              >
                {img && !imgError[i] ? (
                  <img src={img} alt="" onError={() => setImgError((e) => ({ ...e, [i]: true }))} />
                ) : (
                  <span>🍹</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── BODY ── */}
      <div className="pc__body">

        {/* Flavor tag */}
        <span className="pc__tag">{tag}</span>

        {/* Name */}
        <h3 className="pc__name">{name}</h3>

        {/* Description */}
        <p className="pc__desc">{description}</p>

        {/* Price row */}
        <div className="pc__price-row">
          <div className="pc__price">
            <span className="pc__price-amount">{price}</span>
            <span className="pc__price-vol">/ {volume}</span>
          </div>
          <div className="pc__freshness">
            <span className="pc__dot" />
            <span>Made fresh daily</span>
          </div>
        </div>

        {/* ── CTA BUTTONS ── */}
        <div className="pc__ctas">

          {/* Add to cart */}
          <button
            className={`pc__btn pc__btn--cart ${addedToCart ? "pc__btn--added" : ""}`}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <span className="pc__btn-icon">
              {addedToCart ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
                </svg>
              )}
            </span>
            <span className="pc__btn-label">
              {addedToCart ? "Added!" : "Add to Cart"}
            </span>
            {addedToCart && <span className="pc__btn-ripple" />}
          </button>

          {/* WhatsApp */}
          <a
            className="pc__btn pc__btn--whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy via WhatsApp"
          >
            <span className="pc__btn-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.535 5.845L.057 23.617a.75.75 0 00.92.92l5.772-1.478A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.2-1.374l-.374-.214-3.878.993.993-3.878-.214-.374A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </span>
            <span className="pc__btn-label">Buy via WhatsApp</span>
          </a>

        </div>
      </div>
    </article>
  );
}


/* ─────────────────────────────────────────────
   DEMO — shows card grid with mock DB data
───────────────────────────────────────────── */
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Mango Passion Blend",
    description: "Sun-ripened mangoes fused with wild passion fruit. Pure tropical energy in every sip.",
    price: "KSh 150",
    volume: "500ml",
    badge: "Bestseller",
    badgeType: "bestseller",
    tag: "🥭 Mango · 💜 Passion",
    images: [
      "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80",
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
    ],
  },
  {
    id: 2,
    name: "Pineapple Citrus Crush",
    description: "Fresh pineapple meets zesty orange for a tangy, thirst-crushing blend. Loaded with vitamin C.",
    price: "KSh 180",
    volume: "1L",
    badge: "Fresh Today",
    badgeType: "fresh",
    tag: "🍍 Pineapple · 🍊 Orange",
    images: [
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
    ],
  },
  {
    id: 3,
    name: "Green Detox Elixir",
    description: "A clean, vibrant blend of cucumber, green apple and a dash of ginger. Your daily reset.",
    price: "KSh 200",
    volume: "500ml",
    badge: "New Blend",
    badgeType: "new",
    tag: "🥒 Cucumber · 🍎 Apple · 🫚 Ginger",
    images: [],
  },
  {
    id: 4,
    name: "Tamarind Passion Sting",
    description: "Bold tamarind tang wrapped around passion fruit sweetness. One sip and you're hooked.",
    price: "KSh 160",
    volume: "500ml",
    badge: "Limited",
    badgeType: "limited",
    tag: "🌿 Tamarind · 💜 Passion",
    images: [
      "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80",
      "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80",
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
    ],
  },
];

export function ProductCardDemo() {
  return (
    <div className="pc-demo">
      <div className="pc-demo__header">
        <span className="pc-demo__eyebrow">Our Menu</span>
        <h2 className="pc-demo__title">Fresh Blends, <em>Daily</em></h2>
        <p className="pc-demo__sub">Nairobi's realest juice. No cap, no additives.</p>
      </div>
      <div className="pc-grid">
        {MOCK_PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}