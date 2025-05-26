import connectDB from '../../lib/mongodb';
import Member from '../../models/Member';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB(); 
    const members = await Member.find().sort({ memberType: -1, name: 1 });
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error('API GET error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name || !body.batch || !body.faculty || !body.imageUrl) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }

    await connectDB();
    const member = new Member({
      ...body,
      createdAt: new Date()
    });
    const result = await member.save();

    return NextResponse.json({
      success: true,
      memberId: result._id,
      message: 'Member added successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('API POST error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error',
      error: error.message
    }, { status: 500 });
  }
}