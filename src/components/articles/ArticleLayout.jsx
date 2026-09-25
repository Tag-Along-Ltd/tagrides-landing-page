import Link from 'next/link';
import './articles.css';

export default function ArticleLayout({ children, review = false }) {
  return (
    <div className="editorial">
      {review && (
        <div className="editorial-review-bar">
          <span>
            <i aria-hidden="true" /> Local preview · Website release
          </span>
          <Link href="/blog">
            All articles <span aria-hidden="true">↗</span>
          </Link>
        </div>
      )}
      <header className="editorial-header">
        <Link href="/" aria-label="TagRides home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/brand/lockup-horizontal.svg" width="187" height="40" alt="TagRides" />
        </Link>
        <nav aria-label="Editorial navigation">
          <Link href="/blog">Articles</Link>
          <Link href="/pitch">
            Our story <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>
      {children}
      <footer className="editorial-footer">
        <div>
          <strong>Their route. Your ride.</strong>
          <p>A Lagos-first idea. A shared opportunity.</p>
        </div>
        <span>
          TagRides · TAG-ALONG LTD
          <br />
          <Link href="/blog">Articles</Link> · <Link href="/support">Support the pilot</Link>
        </span>
      </footer>
    </div>
  );
}
