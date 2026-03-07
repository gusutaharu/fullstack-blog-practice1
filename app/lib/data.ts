import prisma from "./prisma";

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getEditPost(id: number) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    console.log(post);
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return [];
  }
}
