import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Briefcase, Calendar, Users, UserCheck, Clock, MapPin, Plus, Filter, Search } from 'lucide-react';
import '../styles/Dashboard.css';

const Recruitment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };
  const [activeTab, setActiveTab] = useState('jobs');

  // Job Descriptions Data
  const jobData = [
    { 
      id: 'JOB-001', 
      title: 'Senior React Developer', 
      department: 'Engineering', 
      location: 'Mumbai, India', 
      type: 'Full-time', 
      salary: '₹12-18 LPA', 
      openings: 2, 
      applications: 45, 
      status: 'open',
      postedDate: '2024-01-10'
    },
    { 
      id: 'JOB-002', 
      title: 'Product Manager', 
      department: 'Product', 
      location: 'Bangalore, India', 
      type: 'Full-time', 
      salary: '₹18-25 LPA', 
      openings: 1, 
      applications: 32, 
      status: 'open',
      postedDate: '2024-01-12'
    },
    { 
      id: 'JOB-003', 
      title: 'UI/UX Designer', 
      department: 'Design', 
      location: 'Remote', 
      type: 'Contract', 
      salary: '₹8-12 LPA', 
      openings: 1, 
      applications: 28, 
      status: 'open',
      postedDate: '2024-01-15'
    },
    { 
      id: 'JOB-004', 
      title: 'DevOps Engineer', 
      department: 'Engineering', 
      location: 'Pune, India', 
      type: 'Full-time', 
      salary: '₹10-16 LPA', 
      openings: 1, 
      applications: 18, 
      status: 'closed',
      postedDate: '2024-01-05'
    },
  ];

  // Interview Schedule Data
  const interviewData = [
    {
      candidateName: 'Rahul Sharma',
      position: 'Senior React Developer',
      date: '2024-01-25',
      time: '10:00 AM',
      interviewer: 'Amit Patel',
      round: 'Technical Round 2',
      status: 'scheduled',
      mode: 'Video Call'
    },
    {
      candidateName: 'Priya Singh',
      position: 'Product Manager',
      date: '2024-01-25',
      time: '2:00 PM',
      interviewer: 'Sarah Johnson',
      round: 'HR Round',
      status: 'scheduled',
      mode: 'In-person'
    },
    {
      candidateName: 'Vikram Mehta',
      position: 'UI/UX Designer',
      date: '2024-01-26',
      time: '11:00 AM',
      interviewer: 'Lisa Chen',
      round: 'Portfolio Review',
      status: 'scheduled',
      mode: 'Video Call'
    },
    {
      candidateName: 'Anjali Desai',
      position: 'Senior React Developer',
      date: '2024-01-24',
      time: '3:00 PM',
      interviewer: 'Amit Patel',
      round: 'Technical Round 1',
      status: 'completed',
      mode: 'Video Call'
    },
  ];

  // AI Matching Data
  const aiMatchingData = [
    {
      candidateName: 'Rohan Kumar',
      position: 'Senior React Developer',
      matchScore: 95,
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      experience: '5 years',
      education: 'B.Tech Computer Science',
      location: 'Mumbai',
      noticePeriod: '1 month'
    },
    {
      candidateName: 'Sneha Kapoor',
      position: 'Product Manager',
      matchScore: 88,
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Roadmapping'],
      experience: '6 years',
      education: 'MBA - IIM Bangalore',
      location: 'Bangalore',
      noticePeriod: '2 months'
    },
    {
      candidateName: 'Arjun Reddy',
      position: 'UI/UX Designer',
      matchScore: 82,
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      experience: '4 years',
      education: 'Design Graduate - NID',
      location: 'Remote',
      noticePeriod: 'Immediate'
    },
  ];

  // Stats
  const stats = [
    { 
      title: 'Open Positions', 
      value: '5', 
      change: '+2 this month', 
      icon: <Briefcase size={24} />,
      color: 'primary'
    },
    { 
      title: 'Total Applications', 
      value: '123', 
      change: '+15 this week', 
      icon: <Users size={24} />,
      color: 'info'
    },
    { 
      title: 'Scheduled Interviews', 
      value: '8', 
      change: '3 today', 
      icon: <Calendar size={24} />,
      color: 'warning'
    },
    { 
      title: 'Offers Extended', 
      value: '4', 
      change: '2 accepted', 
      icon: <UserCheck size={24} />,
      color: 'success'
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        <div className="page-content">
          <div className="page-header">
            <div>
              <h1>Recruitment</h1>
              <p>Talent Acquisition & Interview Management</p>
            </div>
            <div className="page-header-right">
              <button className="btn btn-secondary">
                <Filter size={18} />
                Filter
              </button>
              <button className="btn btn-primary">
                <Plus size={18} />
                Post New Job
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card stat-card-${stat.color}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-details">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-change">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <button 
                className={activeTab === 'jobs' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('jobs')}
              >
                <Briefcase size={18} />
                Job Descriptions
              </button>
              <button 
                className={activeTab === 'interviews' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('interviews')}
              >
                <Calendar size={18} />
                Interview Schedule
              </button>
              <button 
                className={activeTab === 'matching' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('matching')}
              >
                <UserCheck size={18} />
                AI Profile Matching
              </button>
            </div>

            <div className="tab-content">
              {/* Job Descriptions Tab */}
              {activeTab === 'jobs' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Job Openings</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Create Job
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Job ID</th>
                          <th>Title</th>
                          <th>Department</th>
                          <th>Location</th>
                          <th>Type</th>
                          <th>Salary Range</th>
                          <th>Openings</th>
                          <th>Applications</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobData.map((job) => (
                          <tr key={job.id}>
                            <td><span className="invoice-id">{job.id}</span></td>
                            <td className="client-cell">{job.title}</td>
                            <td>{job.department}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} />
                                {job.location}
                              </div>
                            </td>
                            <td>{job.type}</td>
                            <td className="amount-cell">{job.salary}</td>
                            <td className="days-cell">{job.openings}</td>
                            <td className="days-cell">{job.applications}</td>
                            <td>
                              <span className={`badge ${job.status === 'open' ? 'badge-success' : 'badge-secondary'}`}>
                                {job.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Interview Schedule Tab */}
              {activeTab === 'interviews' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Upcoming Interviews</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Schedule Interview
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Candidate</th>
                          <th>Position</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Interviewer</th>
                          <th>Round</th>
                          <th>Mode</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {interviewData.map((interview, index) => (
                          <tr key={index}>
                            <td className="employee-cell">
                              <div className="employee-avatar">
                                {interview.candidateName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="employee-name">{interview.candidateName}</span>
                            </td>
                            <td className="client-cell">{interview.position}</td>
                            <td>{interview.date}</td>
                            <td className="time-cell">{interview.time}</td>
                            <td>{interview.interviewer}</td>
                            <td>
                              <span className="badge badge-info">{interview.round}</span>
                            </td>
                            <td>{interview.mode}</td>
                            <td>
                              <span className={`badge ${interview.status === 'scheduled' ? 'badge-warning' : 'badge-success'}`}>
                                {interview.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="Reschedule">
                                  <Clock size={16} />
                                </button>
                                <button className="btn-reject" title="Cancel">
                                  <Calendar size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* AI Profile Matching Tab */}
              {activeTab === 'matching' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>AI-Matched Candidates</h3>
                    <div className="header-actions">
                      <div className="search-bar" style={{ marginRight: '1rem' }}>
                        <Search size={18} />
                        <input type="text" placeholder="Search candidates..." />
                      </div>
                      <button className="btn btn-primary btn-sm">
                        <UserCheck size={16} />
                        Run AI Match
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Candidate</th>
                          <th>Position</th>
                          <th>Match Score</th>
                          <th>Skills</th>
                          <th>Experience</th>
                          <th>Education</th>
                          <th>Location</th>
                          <th>Notice Period</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aiMatchingData.map((candidate, index) => (
                          <tr key={index}>
                            <td className="employee-cell">
                              <div className="employee-avatar">
                                {candidate.candidateName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="employee-name">{candidate.candidateName}</span>
                            </td>
                            <td className="client-cell">{candidate.position}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ 
                                  width: '60px', 
                                  height: '8px', 
                                  background: '#e5e7eb', 
                                  borderRadius: '4px',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{ 
                                    width: `${candidate.matchScore}%`, 
                                    height: '100%', 
                                    background: candidate.matchScore >= 90 ? '#00d97e' : candidate.matchScore >= 80 ? '#f59e0b' : '#3b82f6',
                                    borderRadius: '4px'
                                  }}></div>
                                </div>
                                <span className="hours-cell">{candidate.matchScore}%</span>
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                                {candidate.skills.slice(0, 3).map((skill, idx) => (
                                  <span key={idx} className="badge badge-info" style={{ fontSize: '0.75rem' }}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>{candidate.experience}</td>
                            <td>{candidate.education}</td>
                            <td>{candidate.location}</td>
                            <td>{candidate.noticePeriod}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="Schedule Interview">
                                  <Calendar size={16} />
                                </button>
                                <button className="btn-reject" title="Reject">
                                  <UserCheck size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
