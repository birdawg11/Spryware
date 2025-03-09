import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useProject } from './hooks/useProject';
import { useVendor } from './hooks/useVendor';
import { Project } from './types';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const { projects, selectedProject, setSelectedProject, handleFileUpload } = useProject();
  const { vendors } = useVendor();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Spryware Dashboard
        </Typography>

        {/* Project Selection */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.name}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  bgcolor: selectedProject?.name === project.name ? 'primary.light' : 'background.paper'
                }}
                onClick={() => handleProjectSelect(project)}
              >
                <CardContent>
                  <Typography variant="h6">{project.name}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={project.progress} 
                    sx={{ mt: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Progress: {project.progress}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedProject && (
          <>
            {/* Tabs */}
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Overview" />
              <Tab label="Daily Reports" />
              <Tab label="RFIs" />
              <Tab label="Time Tracking" />
              <Tab label="Safety" />
              <Tab label="Documents" />
              <Tab label="Photos" />
              <Tab label="Tasks" />
              <Tab label="Vendors" />
            </Tabs>

            {/* Tab Content */}
            <Box sx={{ mt: 3 }}>
              {activeTab === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Project Progress
                      </Typography>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={projects}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="progress" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Recent Activity
                      </Typography>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Date</TableCell>
                              <TableCell>Activity</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedProject.reports.slice(-5).map((report, index) => (
                              <TableRow key={index}>
                                <TableCell>{report.date}</TableCell>
                                <TableCell>Daily Report Submitted</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                </Grid>
              )}

              {activeTab === 1 && (
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Daily Reports</Typography>
                    <Button variant="contained" startIcon={<AddIcon />}>
                      New Report
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Subcontractors</TableCell>
                          <TableCell>Men</TableCell>
                          <TableCell>Hours</TableCell>
                          <TableCell>Weather</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedProject.reports.map((report, index) => (
                          <TableRow key={index}>
                            <TableCell>{report.date}</TableCell>
                            <TableCell>{report.subcontractors.length}</TableCell>
                            <TableCell>{report.men}</TableCell>
                            <TableCell>{report.hours}</TableCell>
                            <TableCell>{report.weather}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}

              {activeTab === 2 && (
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">RFIs</Typography>
                    <Button variant="contained" startIcon={<AddIcon />}>
                      New RFI
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Responsible</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedProject.rfi.map((rfi) => (
                          <TableRow key={rfi.id}>
                            <TableCell>{rfi.id}</TableCell>
                            <TableCell>{rfi.title}</TableCell>
                            <TableCell>{rfi.description}</TableCell>
                            <TableCell>{rfi.responsible}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}

              {activeTab === 3 && (
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Time Tracking</Typography>
                    <Button variant="contained" startIcon={<AddIcon />}>
                      New Entry
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Worker</TableCell>
                          <TableCell>Clock In</TableCell>
                          <TableCell>Clock Out</TableCell>
                          <TableCell>Hours</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedProject.timeEntries.map((entry, index) => (
                          <TableRow key={index}>
                            <TableCell>{entry.worker}</TableCell>
                            <TableCell>{entry.clockIn}</TableCell>
                            <TableCell>{entry.clockOut}</TableCell>
                            <TableCell>
                              {entry.clockOut ? 
                                ((new Date(entry.clockOut).getTime() - new Date(entry.clockIn).getTime()) / (1000 * 60 * 60)).toFixed(2)
                                : 'Active'
                              }
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}

              {activeTab === 4 && (
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Safety Checks</Typography>
                    <Button variant="contained" startIcon={<AddIcon />}>
                      New Check
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Checklist Items</TableCell>
                          <TableCell>Talk Topics</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedProject.safetyChecks.map((check, index) => (
                          <TableRow key={index}>
                            <TableCell>{check.date}</TableCell>
                            <TableCell>{check.checklistItems.length}</TableCell>
                            <TableCell>{check.talkTopics.length}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}

              {activeTab === 5 && (
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Documents</Typography>
                    <Button variant="contained" startIcon={<AddIcon />}>
                      Upload
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Share</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedProject.documents.map((doc, index) => (
                          <TableRow key={index}>
                            <TableCell>{doc.file.name}</TableCell>
                            <TableCell>{doc.tag}</TableCell>
                            <TableCell>
                              <IconButton>
                                <ShareIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}

              {activeTab === 6 && (
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Photos</Typography>
                    <Button variant="contained" startIcon={<AddIcon />}>
                      Upload
                    </Button>
                  </Box>
                  <Grid container spacing={2}>
                    {selectedProject.documents
                      .filter((doc) => doc.tag === "photo")
                      .map((doc, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card>
                            <CardContent>
                              {doc.previewUrl && (
                                <img
                                  src={doc.previewUrl}
                                  alt={doc.file.name}
                                  style={{ width: '100%', height: 'auto' }}
                                />
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>
                </Paper>
              )}

              {activeTab === 7 && (
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Tasks</Typography>
                    <Button variant="contained" startIcon={<AddIcon />}>
                      New Task
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell>Assigned To</TableCell>
                          <TableCell>Deadline</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedProject.tasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.assignedTo}</TableCell>
                            <TableCell>{task.deadline}</TableCell>
                            <TableCell>{task.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}

              {activeTab === 8 && (
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Vendors</Typography>
                    <Button variant="contained" startIcon={<AddIcon />}>
                      Add Vendor
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {vendors.map((vendor, index) => (
                          <TableRow key={index}>
                            <TableCell>{vendor.name}</TableCell>
                            <TableCell>{vendor.title}</TableCell>
                            <TableCell>{vendor.phone}</TableCell>
                            <TableCell>{vendor.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;