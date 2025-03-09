import express from 'express';
import { DailyReport } from '../models/DailyReport';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Daily Reports route working!' });
});

// Get all daily reports for a project
router.get('/project/:projectId', async (req, res) => {
  try {
    const reports = await DailyReport.find({ project: req.params.projectId });
    res.json(reports);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create new daily report
router.post('/', async (req, res) => {
  try {
    const report = new DailyReport({
      project: req.body.project,
      date: req.body.date,
      weather: req.body.weather,
      workforce: req.body.workforce,
      equipment: req.body.equipment,
      materials: req.body.materials,
      workCompleted: req.body.workCompleted,
      delays: req.body.delays,
      safetyIncidents: req.body.safetyIncidents,
      qualityIssues: req.body.qualityIssues,
      photos: req.body.photos,
      submittedBy: req.body.submittedBy
    });
    
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export = router;