import Link from 'next/link';
export default function ArticleCollection({ articles }) {
  const draftCount = articles.filter(({ status }) => status === 'draft').length;
  return (
    <main id="main-content">
      <section className="editorial-index-intro">
        <p className="editorial-eyebrow">TagRides / Articles & field notes</p>
        <h1>
          A better journey.
          <br />
          <em>More value for everyone.</em>
        </h1>
        <p className="editorial-deck">
          For the driver behind the wheel. The rider heading to school, work, business or the people
          who matter. And the city they share. Stories about the opportunity in journeys already
          happening.
        </p>
        <div className="editorial-series-meta">
          <span>Ideas, people and progress</span>
          <span>
            {articles.length} articles{draftCount ? ` · ${draftCount} in review` : ''}
          </span>
          <span>Explore the collection ↓</span>
        </div>
      </section>
      <section className="editorial-story-grid" aria-label="All articles">
        {articles.map((article) => (
          <Link href={`/blog/${article.slug}`} className="editorial-story-card" key={article.slug}>
            {article.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={article.cover} alt={article.coverAlt} width="1600" height="900" />
            ) : (
              <div className="editorial-text-cover">
                <span>THE IDEAS BEHIND THE JOURNEY</span>
                <strong>
                  Available seats.
                  <br />
                  Shared possibilities.
                </strong>
                <span>Their route. Your ride.</span>
              </div>
            )}
            <div className="editorial-card-copy">
              <p className="editorial-eyebrow">
                {article.series ? `${article.series} / 0${article.number}` : article.audience}
              </p>
              <span className={`editorial-status editorial-status-${article.status}`}>
                {article.status === 'draft' ? 'Draft · In review' : 'Published'}
              </span>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <span className="editorial-card-link">
                {article.minutes} min read <span aria-hidden="true">↗</span>
              </span>
            </div>
          </Link>
        ))}
      </section>
      {draftCount > 0 && (
        <aside className="editorial-review-note">
          <p className="editorial-eyebrow">For this review</p>
          <h2>The story first. The detail when it helps.</h2>
          <p>
            Each article pairs plain-language writing with app views and explanatory graphics. Open
            the LinkedIn draft at the end of each story to compare its shorter version.
          </p>
          <p>
            <strong>Media status:</strong> the Yaba home view is a fresh iOS capture. The driver
            offer is an actual Flutter component rendered with test data. The rider-options panel is
            a clean frame from the product demo used in the pitch films. The destination-search
            image is an earlier pitch capture. Captions identify each source; a new end-to-end
            capture of the latest app build remains pending.
          </p>
        </aside>
      )}
    </main>
  );
}
