import { cache } from 'react';
import { blogPosts } from '@/data/blog-posts';
import { getSharedValuePosts } from './sharedValueArticles';

export const getReleasePosts = cache(async () => [...blogPosts, ...(await getSharedValuePosts())]);
