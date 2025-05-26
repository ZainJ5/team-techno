import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  batch: {
    type: String,
    required: [true, 'Please provide a batch'],
    trim: true,
  },
  faculty: {
    type: String,
    required: [true, 'Please provide a faculty'],
    trim: true,
  },
  memberType: {
    type: String,
    enum: ['team', 'ec'],
    default: 'team',
    required: true,
  },
  ecTitle: {
    type: String,
    trim: true,
    default: '',
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
}, {
  timestamps: true, 
});

TeamMemberSchema.pre('save', function(next) {
  if (this.memberType === 'ec' && !this.ecTitle) {
    next(new Error('EC Title is required for EC members'));
  } else if (this.memberType === 'team') {
    this.ecTitle = undefined; 
  }
  next();
});

TeamMemberSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.$set && update.$set.memberType === 'ec' && (update.$set.ecTitle === undefined || update.$set.ecTitle === '')) {
        return next(new Error('EC Title is required for EC members when updating.'));
    }
    if (update.$set && update.$set.memberType === 'team') {
        if (update.$set.ecTitle !== undefined) {
            update.$set.ecTitle = ''; 
        }
    }
    next();
});


export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);