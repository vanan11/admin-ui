export const getPosts = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) =>
      posts.map((post) => ({
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      }))
    )
    .catch((error) => {
      console.error("Error fetching posts:", error);
      throw error;
    });
};