import { permanentRedirect } from 'next/navigation';

export default function ArticleAlias() {
  permanentRedirect('/blog');
}
