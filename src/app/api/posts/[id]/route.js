// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// export async function GET(request, { params }) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('myBlog');
//     const post = await db.collection('posts').findOne({ _id: new ObjectId(params.id) });
//     if (!post) {
//       return NextResponse.json({ error: 'Post not found' }, { status: 404 });
//     }
//     return NextResponse.json(post);
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
//   }
// }

// export async function PUT(request, { params }) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('myBlog');
//     const { title, content, thumbnail, image } = await request.json();
//     const result = await db.collection('posts').updateOne(
//       { _id: new ObjectId(params.id) },
//       { $set: { title, content, thumbnail, image, updatedAt: new Date() } }
//     );
//     if (result.matchedCount === 0) {
//       return NextResponse.json({ error: 'Post not found' }, { status: 404 });
//     }
//     return NextResponse.json({ message: 'Post updated successfully' });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('myBlog');
//     const result = await db.collection('posts').deleteOne({ _id: new ObjectId(params.id) });
//     if (result.deletedCount === 0) {
//       return NextResponse.json({ error: 'Post not found' }, { status: 404 });
//     }
//     return NextResponse.json({ message: 'Post deleted successfully' });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Choose the appropriate environment variable
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const putUrl = process.env.NEXT_PUBLIC_PUT_URL;

// Construct the allowed origin URL
const allowedOrigin = `${siteUrl || putUrl}/posts`;

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('myBlog');
    const post = await db.collection('posts').findOne({ _id: new ObjectId(params.id) });
    if (!post) {
      const response = NextResponse.json({ error: 'Post not found' }, { status: 404 });
      response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
      return response;
    }
    const response = NextResponse.json(post);
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    return response;
  } catch (e) {
    console.error(e);
    const response = NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    return response;
  }
}

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('myBlog');
    const { title, content, thumbnail, image } = await request.json();
    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { title, content, thumbnail, image, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      const response = NextResponse.json({ error: 'Post not found' }, { status: 404 });
      response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
      return response;
    }
    const response = NextResponse.json({ message: 'Post updated successfully' });
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    return response;
  } catch (e) {
    console.error(e);
    const response = NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    return response;
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('myBlog');
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 0) {
      const response = NextResponse.json({ error: 'Post not found' }, { status: 404 });
      response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
      return response;
    }
    const response = NextResponse.json({ message: 'Post deleted successfully' });
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    return response;
  } catch (e) {
    console.error(e);
    const response = NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    return response;
  }
}
