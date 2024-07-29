// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
// import { ObjectId } from "mongodb";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("myBlog");
//     const posts = await db.collection("posts")
//       .find({})
//       .sort({ createdAt: -1 })
//       .toArray();
    
//     return NextResponse.json(posts);
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json(
//       { error: "Failed to fetch posts" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("myBlog");
//     const { title, content, thumbnail, image } = await request.json();
//     const result = await db.collection("posts").insertOne({
//       title,
//       content,
//       thumbnail,
//       image,
//       likes: 0,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });
//     return NextResponse.json(result);
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json(
//       { error: "Failed to create post" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const allowedOrigin = process.env.NEXT_PUBLIC_PUT_LINK;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("myBlog");
    const posts = await db.collection("posts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    const response = NextResponse.json(posts);
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    return response;
  } catch (e) {
    console.error(e);
    const response = NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    return response;
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("myBlog");
    const { title, content, thumbnail, image } = await request.json();
    const result = await db.collection("posts").insertOne({
      title,
      content,
      thumbnail,
      image,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const response = NextResponse.json(result);
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    return response;
  } catch (e) {
    console.error(e);
    const response = NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    return response;
  }
}
