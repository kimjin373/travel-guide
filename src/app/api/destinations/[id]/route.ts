import { NextResponse } from 'next/server';
import destinations from '@/data/destinations.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const destination = destinations.destinations.find(
    dest => dest.id === parseInt(params.id)
  );

  if (!destination) {
    return NextResponse.json(
      { error: 'Destination not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(destination);
} 