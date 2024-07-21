export async function fetchPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const allPosts = await response.json();

  return allPosts;
}

export async function fetchSinglePost() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const allPosts = await response.json();

  return allPosts;
}
