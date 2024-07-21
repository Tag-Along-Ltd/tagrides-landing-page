import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("myBlog");
    const posts = await db.collection("posts").find({}).toArray();
    return NextResponse.json(posts);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("myBlog");
    const { title, content, thumbnail } = await request.json();
    const result = await db.collection("posts").insertOne({
      title,
      content,
      thumbnail,
      likes: 0,
      createdAt: new Date(),
    });
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
