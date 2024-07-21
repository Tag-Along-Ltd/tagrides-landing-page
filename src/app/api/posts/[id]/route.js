import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('tagridesDb');
    const post = await db.collection('posts').findOne({ _id: new ObjectId(params.id) });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('tagridesDb');
    const { title, content, thumbnail } = await request.json();
    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { title, content, thumbnail, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Post updated successfully' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('tagridesDb');
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
