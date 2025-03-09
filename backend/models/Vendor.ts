import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  company: {
    name: {
      type: String,
      required: true
    },
    legalName: String,
    taxId: String,
    website: String
  },
  type: {
    type: String,
    enum: [
      'Subcontractor',
      'Supplier',
      'Consultant',
      'Equipment Rental',
      'Service Provider',
      'Other'
    ],
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Under Review', 'Blacklisted'],
    default: 'Active'
  },
  contact: {
    primary: {
      name: String,
      title: String,
      email: String,
      phone: String,
      mobile: String
    },
    alternate: [{
      name: String,
      title: String,
      email: String,
      phone: String,
      mobile: String
    }],
    emergency: {
      name: String,
      phone: String,
      available24x7: Boolean
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  services: [{
    category: String,
    description: String,
    rates: [{
      type: String,
      rate: Number,
      unit: String
    }]
  }],
  licenses: [{
    type: String,
    number: String,
    issuingAuthority: String,
    issueDate: Date,
    expiryDate: Date,
    status: String,
    attachments: [{
      filename: String,
      url: String
    }]
  }],
  insurance: [{
    type: String,
    provider: String,
    policyNumber: String,
    coverage: Number,
    startDate: Date,
    endDate: Date,
    documents: [{
      filename: String,
      url: String
    }]
  }],
  certifications: [{
    name: String,
    issuingBody: String,
    issueDate: Date,
    expiryDate: Date,
    attachments: [{
      filename: String,
      url: String
    }]
  }],
  financials: {
    paymentTerms: String,
    currency: String,
    taxRate: Number,
    bankInfo: {
      bankName: String,
      accountName: String,
      accountNumber: String,
      routingNumber: String
    }
  },
  performance: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    completedProjects: Number,
    ongoingProjects: Number,
    evaluations: [{
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      },
      date: Date,
      rating: Number,
      comments: String,
      evaluator: {
        name: String,
        role: String
      }
    }]
  },
  documents: [{
    type: String,
    name: String,
    url: String,
    uploadDate: Date,
    expiryDate: Date,
    status: String
  }],
  notes: [{
    text: String,
    author: String,
    date: {
      type: Date,
      default: Date.now
    },
    category: String
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for searching
vendorSchema.index({
  'company.name': 'text',
  'company.legalName': 'text',
  'services.category': 'text',
  'services.description': 'text'
});

export const Vendor = mongoose.model('Vendor', vendorSchema);
