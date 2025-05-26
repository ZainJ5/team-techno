import connectDB from '../../../lib/mongodb';
import TeamMember from '../../../models/Member'; 
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(request, context) {
  try {
    await connectDB();
    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid member ID' }, { status: 400 });
    }

    const member = await TeamMember.findById(id);

    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    console.error('API GET error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Server error', error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    await connectDB();
    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid member ID' }, { status: 400 });
    }

    const deletedMember = await TeamMember.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json({ success: false, message: 'Member not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Member deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('API DELETE error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Server error', error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request, context) {
  try {
    await connectDB();
    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid member ID' }, { status: 400 });
    }

    const updateData = await request.json();

    // Remove _id from updateData if present, as it shouldn't be updated
    if (updateData._id) {
      delete updateData._id;
    }
    
    // Mongoose handles timestamps automatically if { timestamps: true } is in schema
    // updateData.updatedAt = new Date(); // No longer needed if schema has timestamps: true

    if (updateData.memberType === 'ec' && (!updateData.ecTitle || updateData.ecTitle.trim() === '')) {
        return NextResponse.json({ success: false, message: 'EC Title is required for EC members' }, { status: 400 });
    }
    if (updateData.memberType === 'team') {
        updateData.ecTitle = ''; // Or undefined, depending on how you want to handle it
    }


    const updatedMember = await TeamMember.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validations are run
    });

    if (!updatedMember) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Member updated successfully', data: updatedMember }, { status: 200 });
  } catch (error) {
    console.error('API PUT error:', error);
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;

    if (error instanceof mongoose.Error.ValidationError) {
      errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
      statusCode = 400;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({ success: false, message: 'Server error', error: errorMessage }, { status: statusCode });
  }
}