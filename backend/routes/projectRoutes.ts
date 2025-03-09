import express from 'express';
import { Project } from '../models/Project';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Project routes working!' });
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: req.body.status,
      description: req.body.description
    });
    
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update project
router.patch('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      Object.assign(project, req.body);
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project deleted' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export = router;