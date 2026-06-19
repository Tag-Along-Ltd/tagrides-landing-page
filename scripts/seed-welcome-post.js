#!/usr/bin/env node
// One-shot: seed the welcome post into Mongo so /blog isn't empty at launch.
//
// Usage:
//   node scripts/seed-welcome-post.js
//
// Reads MONGODB_URI from .env.

import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config({ path: '.env' });
config({ path: '.env.local', override: true });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI in .env. Aborting.');
  process.exit(1);
}

const post = {
  slug: 'marginal-zero-economics',
  title: 'Marginal-zero economics, in one breath.',
  excerpt:
    "Why a driver heading your way can rationally take you for less than a danfo. The single idea Tag Rides is built around.",
  content: `Here is the whole idea in one breath: a driver who was already going from Yaba to Victoria Island is paying for that trip whether you are in the car or not. The marginal cost of adding you — fuel for a few extra kilos, a tiny detour at pickup, the time it takes to hand you a receipt — is **near zero**.

Any fare above zero is profit on a seat that would otherwise be empty.

## What this means for the rider

It means the price floor on a Tag Rides Tag-Along trip is not "what does this car cost to run?" — that cost is already sunk. The floor is **whatever the driver thinks is fair compensation for the inconvenience**. For most Lagos commutes, that lands at or below public-transport prices.

You pay danfo money. You get a private car. Nobody is subsidising anyone.

## What this means for the driver

It means the take-home from one commute is no longer just "I got to work." It's *income from a trip you were already making*. Pick up three riders on a 14 km route from Yaba to Lekki, agree fair fares, and you've turned your morning into 6,000 - 8,000 naira on top of getting to your job.

The driver is not a contractor working for an algorithm. They're someone who decided to share their route, and got paid for it.

## Why this is different from Uber and Bolt

Uber drivers don't have a route they were already making. The car was either already empty (drag on profit) or out for the day to drive for hire. **The driver's *opportunity cost is high*.** That is why ride-hail prices look the way they do — pure-play hire economics.

Tag-Along inverts that. The driver's opportunity cost is *zero*, because the trip was always going to happen. So the price clears at a completely different level.

## Why this is different from danfo

Because every fare is logged before pickup. Because the driver passed an ID and vehicle check. Because both rider and driver build a reputation over time. Because you can share your live trip with a friend.

Same affordability. Real accountability.

That's the whole pitch.

— *Posted on launch of the field notes. More coming on the elastic-matching design, the Lagos pilot plan, and what 210 riders told us before we shipped any code.*`,
  author: 'Olaiya Odili-Chuks',
  tags: ['thesis', 'economics', 'lagos'],
  coverImage: null,
  status: 'published',
  readTimeMinutes: 3,
  publishedAt: new Date(),
  updatedAt: new Date(),
};

const client = new MongoClient(uri);
try {
  await client.connect();
  const collection = client.db('myBlog').collection('posts');
  await collection.createIndex({ slug: 1 }, { unique: true });
  await collection.createIndex({ status: 1, publishedAt: -1 });
  await collection.createIndex({ tags: 1 });

  const existing = await collection.findOne({ slug: post.slug });
  if (existing) {
    console.log(`Post "${post.slug}" already exists. Skipping.`);
  } else {
    await collection.insertOne(post);
    console.log(`Seeded welcome post: /blog/${post.slug}`);
  }
} catch (err) {
  console.error('Seed failed:', err);
  process.exit(1);
} finally {
  await client.close();
}
