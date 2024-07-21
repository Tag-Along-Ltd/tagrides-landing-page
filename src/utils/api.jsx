export async function fetchPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const allPosts = await response.json();

  return allPosts;
}


export async function fetchSinglePost(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const allPosts = await response.json();

  return allPosts;
}
