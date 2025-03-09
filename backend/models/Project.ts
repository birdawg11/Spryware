import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  budget: {
    total: Number,
    spent: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'On Hold', 'Completed'],
    default: 'Not Started'
  },
  description: String,
  projectManager: {
    name: String,
    email: String,
    phone: String
  },
  documents: [{
    name: String,
    fileUrl: String,
    uploadDate: Date,
    type: {
      type: String,
      enum: ['contract', 'permit', 'drawing', 'photo', 'other']
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Project = mongoose.model('Project', projectSchema);