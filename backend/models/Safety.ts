import mongoose from 'mongoose';

const safetySchema = new mongoose.Schema({
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
  inspectionType: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly', 'Incident', 'Special'],
    required: true
  },
  inspector: {
    name: String,
    role: String,
    company: String,
    contact: String
  },
  weatherConditions: {
    temperature: Number,
    conditions: String,
    windSpeed: Number,
    precipitation: String
  },
  checklistItems: [{
    category: String,
    item: String,
    status: {
      type: String,
      enum: ['Compliant', 'Non-Compliant', 'Not Applicable'],
      required: true
    },
    notes: String,
    action: String,
    dueDate: Date,
    completedDate: Date
  }],
  toolboxTalk: {
    topic: String,
    presenter: String,
    duration: Number,
    attendees: [{
      name: String,
      company: String,
      signature: String
    }]
  },
  incidents: [{
    type: {
      type: String,
      enum: ['Near Miss', 'First Aid', 'Medical Treatment', 'Lost Time']
    },
    description: String,
    location: String,
    involvedPersons: [{
      name: String,
      role: String,
      company: String
    }],
    immediateActions: String,
    rootCause: String,
    correctiveActions: [{
      action: String,
      assignedTo: String,
      dueDate: Date,
      completedDate: Date,
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed']
      }
    }]
  }],
  ppe: {
    required: [String],
    compliance: {
      type: Number,
      min: 0,
      max: 100
    },
    violations: [{
      description: String,
      worker: String,
      action: String
    }]
  },
  equipmentInspections: [{
    equipmentType: String,
    identification: String,
    status: {
      type: String,
      enum: ['Pass', 'Fail', 'Needs Repair']
    },
    issues: String,
    nextInspectionDate: Date
  }],
  photos: [{
    url: String,
    description: String,
    location: String,
    timestamp: Date
  }],
  signatures: {
    inspector: {
      signature: String,
      date: Date
    },
    supervisor: {
      signature: String,
      date: Date
    }
  },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Reviewed', 'Closed'],
    default: 'Draft'
  }
});

export const Safety = mongoose.model('Safety', safetySchema);
