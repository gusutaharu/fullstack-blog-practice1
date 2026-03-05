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
