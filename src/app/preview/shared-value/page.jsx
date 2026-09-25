import { notFound, redirect } from 'next/navigation';

export default function LegacyEditorialIndex() {
  if (process.env.NODE_ENV !== 'development') notFound();
  redirect('/blog');
}
