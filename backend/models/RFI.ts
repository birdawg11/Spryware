import mongoose from 'mongoose';

const rfiSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateSubmitted: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Under Review', 'Answered', 'Closed'],
    default: 'Draft'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  submittedBy: {
    name: String,
    role: String,
    company: String
  },
  assignedTo: {
    name: String,
    role: String,
    company: String,
    email: String
  },
  response: {
    text: String,
    date: Date,
    respondedBy: {
      name: String,
      role: String,
      company: String
    },
    attachments: [{
      filename: String,
      url: String,
      uploadDate: Date
    }]
  },
  costImpact: {
    hasImpact: Boolean,
    amount: Number,
    description: String
  },
  scheduleImpact: {
    hasImpact: Boolean,
    days: Number,
    description: String
  },
  attachments: [{
    filename: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  relatedRFIs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RFI'
  }],
  tags: [String],
  comments: [{
    text: String,
    author: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

export const RFI = mongoose.model('RFI', rfiSchema);
