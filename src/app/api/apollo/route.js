import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const payload = await request.json();
    
    const apolloRes = await fetch('https://api.apollo.io/api/v1/mixed_people/api_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': process.env.APOLLO_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await apolloRes.json();
    return NextResponse.json(data, { status: apolloRes.status });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
