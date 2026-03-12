const reviews = [
  {
    id: "0x7f3a9b",
    product: "CloudHost Pro",
    rating: "★★★★★",
    text: '"Exceptional uptime and support..."',
  },
  {
    id: "0x2c8d4e",
    product: "DevTools Suite",
    rating: "★★★★★",
    text: '"Great features, minor bugs..."',
  },
  {
    id: "0x9a1f5c",
    product: "SecureVPN",
    rating: "★★★★★",
    text: `"Best privacy solution I've used..."`,
  },
];

function ReviewItem({ id, product, rating, text }) {
  return (
    <div className="terminal-review-item">
      <p className="text-white/35">[REVIEW_ID: {id}]</p>
      <p>
        Product:{" "}
        <span className="font-semibold text-[var(--terminal-green)]">
          {product}
        </span>
      </p>
      <p>
        Rating: <span className="text-[var(--terminal-green)]">{rating}</span>
      </p>
      <p className="text-white/25">{text}</p>
    </div>
  );
}

function ReviewFeedGroup() {
  return (
    <div className="terminal-feed-group" aria-hidden="true">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          id={review.id}
          product={review.product}
          rating={review.rating}
          text={review.text}
        />
      ))}

      <p className="pt-1 font-semibold text-[var(--terminal-green)]">$ _</p>
    </div>
  );
}

export default function TerminalWindow() {
  return (
    <div className="terminal-window mt-10 w-full max-w-[760px] text-left">
      <div className="terminal-window-topbar">
        <div className="flex items-center gap-3">
          <span className="terminal-window-dot bg-red-400" />
          <span className="terminal-window-dot bg-yellow-400" />
          <span className="terminal-window-dot bg-green-400" />
        </div>

        <p className="terminal-window-title">review_terminal_v2.sh</p>

        <div className="w-[60px]" />
      </div>

      <div className="terminal-window-body">
        <p className="mb-4 text-white/30">$ cat recent_reviews.json</p>

        <p className="mb-4 font-semibold text-[var(--terminal-green)]">
          {'{status: "verified", "reviews_loaded": 3}'}
        </p>

        <div className="terminal-feed-viewport">
          <div className="terminal-feed-track">
            <ReviewFeedGroup />
            <ReviewFeedGroup />
          </div>
        </div>
      </div>
    </div>
  );
}
