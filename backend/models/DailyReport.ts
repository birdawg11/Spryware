import mongoose from 'mongoose';

const dailyReportSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  weather: {
    condition: String,
    temperature: Number,
    precipitation: String
  },
  workforce: {
    totalWorkers: Number,
    contractors: [{
      name: String,
      numberOfWorkers: Number,
      hoursWorked: Number,
      workPerformed: String
    }]
  },
  equipment: [{
    type: String,
    quantity: Number,
    hoursUsed: Number
  }],
  materials: [{
    description: String,
    quantity: Number,
    unit: String,
    received: Boolean
  }],
  workCompleted: {
    description: String,
    areasWorkedOn: [String],
    progressNotes: String
  },
  delays: [{
    cause: String,
    duration: Number,
    impact: String
  }],
  safetyIncidents: [{
    description: String,
    severity: {
      type: String,
      enum: ['Minor', 'Moderate', 'Severe']
    },
    actionTaken: String
  }],
  qualityIssues: [{
    description: String,
    location: String,
    correctiveAction: String
  }],
  photos: [{
    url: String,
    description: String,
    location: String
  }],
  submittedBy: {
    name: String,
    role: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
});

export const DailyReport = mongoose.model('DailyReport', dailyReportSchema);
