import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import ArticleVideo from './ArticleVideo';
import { editorialMediaUrl, headingId } from '@/lib/editorialPreview';

const diagramPoints = {
  'driver-value.svg': [
    ['Fares received', 'Income from the shared journey'],
    ['Relevant costs', 'Fees, fuel, vehicle wear and the driver’s time'],
    ['Worthwhile return', 'What the driver keeps after those costs'],
  ],
  'seat-model.svg': [
    ['4 offered places', 'The passenger capacity offered for the journey'],
    ['2 boarded + 1 outside the app', 'Three places are already in use'],
    ['1 available place', 'An accepted fare is not an advance reservation'],
  ],
  'rider-priorities.svg': [
    ['192 / 210', 'Named pricing as a priority'],
    ['153 / 210', 'Named convenience'],
    ['147 / 210', 'Named safety'],
  ],
  'whole-journey.svg': [
    ['Shared fare', 'Your part of the ride'],
    ['Connections', 'Getting to and from the shared leg'],
    ['Relevant fees', 'Include the full amount payable'],
  ],
  'impact-test.svg': [
    ['The original trip', 'Was the driver travelling anyway?'],
    ['Added driving', 'How much extra distance did pickup add?'],
    ['The alternative', 'What would the rider otherwise have used?'],
  ],
  'transit-connection.svg': [
    ['Neighbourhood', 'Start with a suitable shared leg'],
    ['Interchange', 'Connect with public transport'],
    ['Destination', 'Continue the complete journey'],
  ],
  'repeat-value.svg': [
    ['Riders return', 'At ordinary fares'],
    ['Drivers earn', 'After relevant costs'],
    ['Pickups work', 'At useful times and places'],
    ['The service lasts', 'With costs it can support'],
  ],
};

function ArticleFigure({ name, alt, media }) {
  const info = media[name];
  if (!info) return null;
  const isApp = info.kind !== 'diagram';
  return (
    <figure
      className={`editorial-figure ${isApp ? `editorial-app-figure editorial-${info.kind}` : 'editorial-diagram'}`}
    >
      <div className="editorial-figure-surface">
        {isApp && (
          <div className="editorial-figure-intro">
            <p className="editorial-eyebrow">{info.label}</p>
            <h3>{info.title}</h3>
            <span className="editorial-product-label">Product in development</span>
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={info.src || editorialMediaUrl(name)} alt={alt} loading="lazy" />
        {!isApp && (
          <dl className="editorial-mobile-diagram">
            {diagramPoints[name]?.map(([label, detail]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <figcaption>
        {info.caption}{' '}
        <a href={info.src || editorialMediaUrl(name)} target="_blank" rel="noreferrer">
          View full size ↗
        </a>
      </figcaption>
    </figure>
  );
}

export default function ArticleReader({ article, next }) {
  const [story, sourceNotes] = article.content.split('\n## Sources\n');
  const body = story.split('\n\n');
  const sources = sourceNotes?.trim().split('\n').filter(Boolean) || [];
  return (
    <main id="main-content">
      <article>
        <header className="editorial-article-intro">
          <Link href="/blog" className="editorial-back">
            ← All articles
          </Link>
          <p className="editorial-eyebrow">
            {article.series ? `${article.series} / 0${article.number} / ` : 'Field notes / '}
            {article.audience}
          </p>
          <h1>{article.title}</h1>
          <p className="editorial-deck">{article.description}</p>
          <div className="editorial-byline">
            <span className="editorial-author-initials" aria-hidden="true">
              {article.author?.startsWith('Oniya') ? 'OO' : 'TR'}
            </span>
            <div>
              <strong>{article.author}</strong>
              {article.authorRole && <span>{article.authorRole}</span>}
            </div>
            <span className="editorial-readtime">
              {article.minutes} min read
              <br />
              {article.status === 'draft'
                ? `Draft · Part ${article.number} of 3`
                : new Date(article.publishedAt).toLocaleDateString('en-NG', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
            </span>
          </div>
          {article.newsReviewedAt && (
            <p className="editorial-news-date">
              News context checked{' '}
              {new Date(`${article.newsReviewedAt}T12:00:00Z`).toLocaleDateString('en-NG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}{' '}
              · Reporting dates appear with the sources.
            </p>
          )}
        </header>
        {article.cover && (
          <div className="editorial-article-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.cover}
              alt={article.coverAlt}
              width="1600"
              height="900"
              fetchPriority="high"
            />
          </div>
        )}
        <div className="editorial-reading-layout">
          <aside className="editorial-contents">
            <p className="editorial-eyebrow">In this story</p>
            <nav aria-label="Article sections">
              {article.headings.map((heading) => (
                <a key={heading} href={`#${headingId(heading)}`}>
                  {heading}
                </a>
              ))}
            </nav>
            <p className="editorial-sidebar-note">
              {article.series
                ? 'Part of the Shared Value series on the people and possibilities behind shared journeys.'
                : 'Stories and field notes from building TagRides. A global ambition, starting in Lagos.'}
            </p>
          </aside>
          <div className="editorial-prose">
            {body.map((block, index) => {
              const videoLink = block.match(
                /^\[Watch:[^\]]+\]\((https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+)\)$/,
              );
              if (videoLink && article.videos?.[videoLink[1]]) {
                return (
                  <ArticleVideo
                    key={index}
                    url={videoLink[1]}
                    video={article.videos[videoLink[1]]}
                  />
                );
              }
              const image = block.match(/^!\[([^\]]*)\]\(\.\.\/assets\/([^/)]+)\)$/);
              if (image)
                return (
                  <ArticleFigure key={index} name={image[2]} alt={image[1]} media={article.media} />
                );
              return (
                <ReactMarkdown
                  key={index}
                  components={{
                    h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>,
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        {...(href?.startsWith('https://')
                          ? { target: '_blank', rel: 'noreferrer' }
                          : {})}
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {sources.length ? block.replace(/\[(\d+)\]/g, '[[$1]](#source-$1)') : block}
                </ReactMarkdown>
              );
            })}
            {sources.length > 0 && (
              <>
                <h2 id="sources">Sources</h2>
                <ol>
                  {sources.map((source, index) => (
                    <li id={`source-${index + 1}`} key={source}>
                      <ReactMarkdown>{source.replace(/^\d+\.\s*/, '')}</ReactMarkdown>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {article.takeaway && (
              <aside className="editorial-takeaway">
                <p className="editorial-eyebrow">The idea to take with you</p>
                <p>{article.takeaway}</p>
              </aside>
            )}
            <div className="editorial-author-end">
              <strong>{article.author}</strong>
              <p>
                {article.author?.startsWith('Oniya')
                  ? 'Founder of TagRides, building route-shared mobility with Lagos as the first proving ground.'
                  : 'The ideas and work behind TagRides. Their route. Your ride.'}
              </p>
            </div>
            {article.linkedin && (
              <details className="editorial-linkedin">
                <summary>
                  Review the shorter LinkedIn version <span aria-hidden="true">+</span>
                </summary>
                <div>
                  <ReactMarkdown>{article.linkedin}</ReactMarkdown>
                </div>
              </details>
            )}
          </div>
        </div>
      </article>
      {next && (
        <section className="editorial-next">
          <p className="editorial-eyebrow">
            {next.series === article.series && article.series
              ? 'Continue the series'
              : 'Keep reading'}
          </p>
          <Link href={`/blog/${next.slug}`}>
            <span>{next.title}</span>
            <span aria-hidden="true">↗</span>
          </Link>
          <p>{next.description}</p>
        </section>
      )}
    </main>
  );
}
