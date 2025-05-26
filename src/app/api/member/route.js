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

    if (!body.name || !body.batch || !body.faculty || !body.imageUrl || !body.memberType) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, batch, faculty, imageUrl, and memberType are required'
      }, { status: 400 });
    }

    if (body.memberType === 'ec' && !body.ecTitle) {
      return NextResponse.json({
        success: false,
        message: 'EC Title is required for EC members'
      }, { status: 400 });
    }

    if (!['team', 'ec'].includes(body.memberType)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid member type. Must be either "team" or "ec"'
      }, { status: 400 });
    }

    await connectDB();
    
    const memberData = {
      name: body.name,
      batch: body.batch,
      faculty: body.faculty,
      imageUrl: body.imageUrl,
      memberType: body.memberType
    };

    if (body.memberType === 'ec' && body.ecTitle) {
      memberData.ecTitle = body.ecTitle;
    }

    const member = new Member(memberData);
    const result = await member.save();

    return NextResponse.json({
      success: true,
      member: result,
      message: 'Member added successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('API POST error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Server error',
      error: error.message
    }, { status: 500 });
  }
}