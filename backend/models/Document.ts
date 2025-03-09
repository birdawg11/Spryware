import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      'Contract',
      'Drawing',
      'Permit',
      'Inspection',
      'Safety',
      'Quality',
      'Photo',
      'Invoice',
      'Change Order',
      'Submittal',
      'Other'
    ],
    required: true
  },
  version: {
    number: {
      type: String,
      default: '1.0'
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  file: {
    originalName: String,
    fileName: String,
    fileSize: Number,
    fileType: String,
    url: String,
    path: String
  },
  metadata: {
    description: String,
    keywords: [String],
    category: String,
    location: String,
    drawingNumber: String,
    sheetNumber: String
  },
  status: {
    type: String,
    enum: ['Draft', 'Under Review', 'Approved', 'Rejected', 'Superseded'],
    default: 'Draft'
  },
  access: {
    visibility: {
      type: String,
      enum: ['Public', 'Private', 'Team'],
      default: 'Team'
    },
    permissions: [{
      user: String,
      role: String,
      access: {
        type: String,
        enum: ['View', 'Edit', 'Admin']
      }
    }]
  },
  revisions: [{
    version: String,
    date: Date,
    changedBy: {
      name: String,
      role: String
    },
    changes: String,
    fileUrl: String
  }],
  relationships: {
    relatedDocuments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document'
    }],
    parentDocument: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document'
    }
  },
  approvals: [{
    approver: {
      name: String,
      role: String,
      company: String
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected']
    },
    date: Date,
    comments: String
  }],
  distribution: [{
    recipient: {
      name: String,
      email: String,
      company: String
    },
    sentDate: Date,
    accessLevel: String,
    acknowledged: Boolean
  }],
  uploadedBy: {
    name: String,
    role: String,
    date: {
      type: Date,
      default: Date.now
    }
  },
  tags: [String],
  notes: [{
    text: String,
    author: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

// Add text index for searching
documentSchema.index({
  'title': 'text',
  'metadata.description': 'text',
  'metadata.keywords': 'text'
});

export const Document = mongoose.model('Document', documentSchema);
