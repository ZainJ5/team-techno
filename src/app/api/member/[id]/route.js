import { connectDB } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const { db } = await connectDB();
    const membersCollection = db.collection('team_members');
    const { id } = req.query;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid member ID' 
      });
    }
    
    const memberId = new ObjectId(id);

    switch (req.method) {
      case 'GET':
        const member = await membersCollection.findOne({ _id: memberId });
        
        if (!member) {
          return res.status(404).json({ 
            success: false, 
            message: 'Member not found' 
          });
        }
        
        return res.status(200).json(member);
        
      case 'DELETE':
        const result = await membersCollection.deleteOne({ _id: memberId });
        
        if (result.deletedCount === 0) {
          return res.status(404).json({ 
            success: false, 
            message: 'Member not found' 
          });
        }
        
        return res.status(200).json({ 
          success: true,
          message: 'Member deleted successfully'
        });
        
      case 'PUT':
        const updateData = req.body;
        
        if (updateData._id) {
          delete updateData._id;
        }
        
        updateData.updatedAt = new Date();
        
        const updateResult = await membersCollection.updateOne(
          { _id: memberId },
          { $set: updateData }
        );
        
        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ 
            success: false, 
            message: 'Member not found' 
          });
        }
        
        return res.status(200).json({ 
          success: true,
          message: 'Member updated successfully'
        });
        
      default:
        return res.status(405).json({ 
          success: false,
          message: 'Method not allowed' 
        });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
}