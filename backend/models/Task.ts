import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
    default: 'Not Started'
  },
  category: {
    type: String,
    enum: [
      'Construction',
      'Design',
      'Procurement',
      'Safety',
      'Quality',
      'Administrative',
      'Other'
    ]
  },
  schedule: {
    startDate: Date,
    dueDate: Date,
    completedDate: Date,
    estimatedHours: Number,
    actualHours: Number
  },
  assignedTo: [{
    user: {
      name: String,
      role: String,
      company: String,
      email: String
    },
    assignedDate: {
      type: Date,
      default: Date.now
    }
  }],
  dependencies: [{
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    },
    type: {
      type: String,
      enum: ['Finish to Start', 'Start to Start', 'Finish to Finish', 'Start to Finish']
    }
  }],
  progress: {
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    lastUpdated: Date
  },
  location: {
    area: String,
    floor: String,
    room: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  resources: [{
    type: String,
    quantity: Number,
    allocated: Number,
    unit: String
  }],
  costs: {
    estimated: Number,
    actual: Number,
    variance: Number
  },
  attachments: [{
    filename: String,
    url: String,
    uploadDate: Date,
    uploadedBy: String
  }],
  comments: [{
    text: String,
    author: {
      name: String,
      role: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    attachments: [{
      filename: String,
      url: String
    }]
  }],
  checklist: [{
    item: String,
    completed: {
      type: Boolean,
      default: false
    },
    completedBy: String,
    completedDate: Date
  }],
  notifications: [{
    type: {
      type: String,
      enum: ['Reminder', 'Update', 'Overdue', 'Completed']
    },
    message: String,
    date: Date,
    recipients: [String]
  }],
  history: [{
    action: String,
    date: {
      type: Date,
      default: Date.now
    },
    user: String,
    details: String
  }],
  tags: [String],
  createdBy: {
    name: String,
    role: String,
    date: {
      type: Date,
      default: Date.now
    }
  },
  updatedBy: {
    name: String,
    role: String,
    date: {
      type: Date,
      default: Date.now
    }
  }
});

// Add text index for searching
taskSchema.index({
  'title': 'text',
  'description': 'text',
  'tags': 'text'
});

export const Task = mongoose.model('Task', taskSchema);
