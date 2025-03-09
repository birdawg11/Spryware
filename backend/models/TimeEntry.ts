import mongoose from 'mongoose';

const timeEntrySchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  worker: {
    name: String,
    employeeId: String,
    company: String,
    role: String,
    contact: String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  clockIn: {
    time: {
      type: Date,
      required: true
    },
    location: {
      latitude: Number,
      longitude: Number,
      address: String
    },
    photo: {
      url: String,
      timestamp: Date
    }
  },
  clockOut: {
    time: Date,
    location: {
      latitude: Number,
      longitude: Number,
      address: String
    },
    photo: {
      url: String,
      timestamp: Date
    }
  },
  totalHours: {
    type: Number,
    default: 0
  },
  breaks: [{
    startTime: Date,
    endTime: Date,
    duration: Number
  }],
  tasks: [{
    description: String,
    startTime: Date,
    endTime: Date,
    duration: Number,
    area: String,
    equipment: [String]
  }],
  overtime: {
    hours: Number,
    approved: Boolean,
    approvedBy: {
      name: String,
      role: String,
      timestamp: Date
    }
  },
  weather: {
    temperature: Number,
    conditions: String,
    impact: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Modified'],
    default: 'Pending'
  },
  approvalDetails: {
    approvedBy: String,
    approvalDate: Date,
    comments: String
  },
  billingCode: String,
  costCode: String,
  notes: String,
  attachments: [{
    filename: String,
    url: String,
    uploadDate: Date
  }]
});

// Calculate total hours when saving
timeEntrySchema.pre('save', function(next) {
  if (this.clockIn && this.clockOut) {
    const hours = (this.clockOut.time.getTime() - this.clockIn.time.getTime()) / (1000 * 60 * 60);
    this.totalHours = Number(hours.toFixed(2));
  }
  next();
});

export const TimeEntry = mongoose.model('TimeEntry', timeEntrySchema);
