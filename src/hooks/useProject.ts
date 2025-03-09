import { useState } from 'react';
import { Project, DailyReport, RFI, TimeEntry, SafetyCheck, Message, Submittal, Task } from '../types';

export const useProject = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      name: "Downtown Office Building",
      progress: 65,
      drawings: [],
      documents: [],
      reports: [
        {
          date: "2024-03-08",
          subcontractors: [
            { vendorName: "Elite Electric", summary: "Completed 3rd floor wiring" },
            { vendorName: "Pro Plumbing", summary: "Started bathroom fixtures" }
          ],
          men: 12,
          hours: 96,
          weather: "Sunny, 72°F",
          injuries: "None",
          visitors: "Project Manager, City Inspector",
          meetings: "Safety briefing, Progress review"
        }
      ],
      rfi: [
        {
          id: "RFI-001",
          title: "Column Spacing Clarification",
          description: "Need confirmation on column spacing in lobby area",
          responsible: "Structural Engineer"
        }
      ],
      timeEntries: [
        {
          worker: "James Wilson",
          clockIn: "2024-03-08T07:00:00",
          clockOut: "2024-03-08T15:30:00",
          gps: { lat: 40.7128, lng: -74.0060 },
          task: "Electrical Installation"
        }
      ],
      safetyChecks: [
        {
          date: "2024-03-08",
          checklistItems: [
            { item: "All workers wearing proper PPE", checked: true },
            { item: "Work area properly secured", checked: true }
          ],
          talkTopics: ["Ladder Safety", "Fall Protection"]
        }
      ],
      messages: [
        {
          id: "MSG-001",
          sender: "Project Manager",
          text: "Schedule update meeting for tomorrow",
          timestamp: "2024-03-08T10:30:00"
        }
      ],
      submittals: [
        {
          id: "SUB-001",
          title: "Lighting Fixtures Specification",
          file: null,
          assignedTo: "Architect",
          status: "Pending"
        }
      ],
      tasks: [
        {
          id: "TASK-001",
          title: "Complete 3rd floor electrical",
          assignedTo: "Elite Electric",
          deadline: "2024-03-15",
          status: "In Progress"
        }
      ]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);

  const handleFileUpload = (file: File, tag: string) => {
    if (!selectedProject) return;
    
    const newDocument = {
      file,
      shareLink: `https://example.com/share/${file.name}`,
      previewUrl: URL.createObjectURL(file),
      tag
    };

    setProjects(projects.map(p => 
      p.name === selectedProject.name 
        ? { ...p, documents: [...p.documents, newDocument] }
        : p
    ));
  };

  const addDailyReport = (report: DailyReport) => {
    if (!selectedProject) return;
    
    setProjects(projects.map(p => 
      p.name === selectedProject.name 
        ? { ...p, reports: [...p.reports, report] }
        : p
    ));
  };

  const addRFI = (rfi: RFI) => {
    if (!selectedProject) return;
    
    setProjects(projects.map(p => 
      p.name === selectedProject.name 
        ? { ...p, rfi: [...p.rfi, rfi] }
        : p
    ));
  };

  const addTimeEntry = (entry: TimeEntry) => {
    if (!selectedProject) return;
    
    setProjects(projects.map(p => 
      p.name === selectedProject.name 
        ? { ...p, timeEntries: [...p.timeEntries, entry] }
        : p
    ));
  };

  const addSafetyCheck = (check: SafetyCheck) => {
    if (!selectedProject) return;
    
    setProjects(projects.map(p => 
      p.name === selectedProject.name 
        ? { ...p, safetyChecks: [...p.safetyChecks, check] }
        : p
    ));
  };

  const addMessage = (message: Message) => {
    if (!selectedProject) return;
    
    setProjects(projects.map(p => 
      p.name === selectedProject.name 
        ? { ...p, messages: [...p.messages, message] }
        : p
    ));
  };

  const addSubmittal = (submittal: Submittal) => {
    if (!selectedProject) return;
    
    setProjects(projects.map(p => 
      p.name === selectedProject.name 
        ? { ...p, submittals: [...p.submittals, submittal] }
        : p
    ));
  };

  const addTask = (task: Task) => {
    if (!selectedProject) return;
    
    setProjects(projects.map(p => 
      p.name === selectedProject.name 
        ? { ...p, tasks: [...p.tasks, task] }
        : p
    ));
  };

  return {
    projects,
    selectedProject,
    setSelectedProject,
    handleFileUpload,
    addDailyReport,
    addRFI,
    addTimeEntry,
    addSafetyCheck,
    addMessage,
    addSubmittal,
    addTask
  };
};