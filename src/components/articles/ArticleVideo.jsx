export default function ArticleVideo({ url, video }) {
  return (
    <aside className="editorial-video" aria-label={`Related video: ${video.title}`}>
      <p className="editorial-eyebrow">Watch / {video.kind}</p>
      <a
        className="editorial-video-main"
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Watch on YouTube: ${video.title}`}
      >
        <div className="editorial-video-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.thumbnail} width="480" height="360" loading="lazy" alt="" />
          <span className="editorial-video-play" aria-hidden="true">
            ▶
          </span>
        </div>
        <div>
          <p className="editorial-video-publisher">{video.publisher}</p>
          <h3>{video.title}</h3>
          <p className="editorial-video-date">
            {video.dateLabel}
            <br />
            {video.duration}
          </p>
          <span className="editorial-video-action">Watch on YouTube ↗</span>
        </div>
      </a>
      <p className="editorial-video-description">{video.description}</p>
      <a className="editorial-video-source" href={video.sourceUrl} target="_blank" rel="noreferrer">
        Read the publisher's accompanying page ↗
      </a>
    </aside>
  );
}
