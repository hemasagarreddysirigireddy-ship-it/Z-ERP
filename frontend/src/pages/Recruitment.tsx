import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/Recruitment.css';
import { 
  Briefcase, Calendar, Users, UserCheck, Clock, MapPin, Plus, Filter, Search,
  Edit, Trash2, Eye, Send, Download, Upload, CheckCircle, XCircle, 
  ChevronRight, Star, TrendingUp, Award, Brain, FileText, BarChart3,
  Video, Phone, Mail, User, Building2, DollarSign, Target, Grid, List,
  Save, X, AlertCircle, Sparkles
} from 'lucide-react';
import '../styles/Dashboard.css';
import '../styles/Recruitment.css';

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
  const [showJobModal, setShowJobModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Enhanced Job Data
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
      shortlisted: 12,
      interviewed: 5,
      status: 'open',
      postedDate: '2024-01-10',
      priority: 'high',
      description: 'Looking for experienced React developers with 5+ years of experience in building scalable web applications.',
      requirements: ['React', 'TypeScript', 'Node.js', 'AWS', 'Redux', 'Jest'],
      benefits: ['Health Insurance', 'Remote Work', 'Stock Options', 'Learning Budget'],
      experienceRange: '5-8 years',
      urgency: 'urgent'
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
      shortlisted: 8,
      interviewed: 3,
      status: 'open',
      postedDate: '2024-01-12',
      priority: 'high',
      description: 'Senior PM to lead product strategy and roadmap for our enterprise solutions.',
      requirements: ['Product Strategy', 'Agile', 'Analytics', 'Leadership', 'Stakeholder Management'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget', 'Team Retreats'],
      experienceRange: '6-10 years',
      urgency: 'normal'
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
      shortlisted: 10,
      interviewed: 4,
      status: 'open',
      postedDate: '2024-01-15',
      priority: 'medium',
      description: 'Creative designer for web and mobile applications with strong portfolio.',
      requirements: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      benefits: ['Remote Work', 'Flexible Hours', 'Creative Freedom', 'Latest Tools'],
      experienceRange: '3-5 years',
      urgency: 'normal'
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
      shortlisted: 6,
      interviewed: 2,
      status: 'closed',
      postedDate: '2024-01-05',
      priority: 'low',
      description: 'DevOps engineer for CI/CD pipeline and cloud infrastructure management.',
      requirements: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Jenkins'],
      benefits: ['Health Insurance', 'Work From Home', 'Learning Budget', 'Certifications'],
      experienceRange: '4-7 years',
      urgency: 'closed'
    },
  ];

  // Enhanced Interview Data
  const interviewData = [
    {
      id: 'INT-001',
      candidateName: 'Rahul Sharma',
      candidateEmail: 'rahul.sharma@email.com',
      candidatePhone: '+91 98765 43210',
      position: 'Senior React Developer',
      jobId: 'JOB-001',
      date: '2024-01-25',
      time: '10:00 AM',
      duration: '60 min',
      interviewer: 'Amit Patel',
      interviewerRole: 'Tech Lead',
      round: 'Technical Round 2',
      roundNumber: 2,
      totalRounds: 3,
      status: 'scheduled',
      mode: 'Video Call',
      meetingLink: 'https://meet.google.com/xyz-abc-123',
      notes: 'Focus on React patterns and system design',
      reminderSent: true
    },
    {
      id: 'INT-002',
      candidateName: 'Priya Singh',
      candidateEmail: 'priya.singh@email.com',
      candidatePhone: '+91 98765 43211',
      position: 'Product Manager',
      jobId: 'JOB-002',
      date: '2024-01-25',
      time: '2:00 PM',
      duration: '45 min',
      interviewer: 'Sarah Johnson',
      interviewerRole: 'HR Manager',
      round: 'HR Round',
      roundNumber: 1,
      totalRounds: 3,
      status: 'scheduled',
      mode: 'In-person',
      meetingLink: '',
      notes: 'Cultural fit and career aspirations',
      reminderSent: true
    },
    {
      id: 'INT-003',
      candidateName: 'Vikram Mehta',
      candidateEmail: 'vikram.mehta@email.com',
      candidatePhone: '+91 98765 43212',
      position: 'UI/UX Designer',
      jobId: 'JOB-003',
      date: '2024-01-26',
      time: '11:00 AM',
      duration: '90 min',
      interviewer: 'Lisa Chen',
      interviewerRole: 'Design Lead',
      round: 'Portfolio Review',
      roundNumber: 2,
      totalRounds: 2,
      status: 'scheduled',
      mode: 'Video Call',
      meetingLink: 'https://meet.google.com/abc-xyz-456',
      notes: 'Review design thinking and portfolio projects',
      reminderSent: false
    },
    {
      id: 'INT-004',
      candidateName: 'Anjali Desai',
      candidateEmail: 'anjali.desai@email.com',
      candidatePhone: '+91 98765 43213',
      position: 'Senior React Developer',
      jobId: 'JOB-001',
      date: '2024-01-24',
      time: '3:00 PM',
      duration: '60 min',
      interviewer: 'Amit Patel',
      interviewerRole: 'Tech Lead',
      round: 'Technical Round 1',
      roundNumber: 1,
      totalRounds: 3,
      status: 'completed',
      mode: 'Video Call',
      meetingLink: 'https://meet.google.com/def-ghi-789',
      notes: 'Strong technical skills, good communication',
      reminderSent: true,
      feedback: 'Excellent candidate, proceed to next round',
      rating: 4.5
    },
  ];

  // Enhanced AI Matching Data
  const aiMatchingData = [
    {
      id: 'CAND-001',
      candidateName: 'Rohan Kumar',
      email: 'rohan.kumar@email.com',
      phone: '+91 98765 11111',
      position: 'Senior React Developer',
      jobId: 'JOB-001',
      matchScore: 95,
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Redux', 'GraphQL'],
      experience: '5 years',
      currentCompany: 'Tech Innovations Ltd',
      currentRole: 'Senior Frontend Developer',
      education: 'B.Tech Computer Science - IIT Mumbai',
      location: 'Mumbai',
      noticePeriod: '1 month',
      expectedSalary: '₹15-18 LPA',
      currentSalary: '₹12 LPA',
      resumeUrl: '/resumes/rohan-kumar.pdf',
      linkedinUrl: 'linkedin.com/in/rohankumar',
      portfolioUrl: 'rohankumar.dev',
      status: 'shortlisted',
      aiInsights: [
        'Strong React and TypeScript expertise',
        'Experience with microservices architecture',
        'Active open source contributor'
      ],
      appliedDate: '2024-01-15'
    },
    {
      id: 'CAND-002',
      candidateName: 'Sneha Kapoor',
      email: 'sneha.kapoor@email.com',
      phone: '+91 98765 22222',
      position: 'Product Manager',
      jobId: 'JOB-002',
      matchScore: 88,
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Roadmapping', 'Stakeholder Management', 'Data-Driven'],
      experience: '6 years',
      currentCompany: 'Product Innovators Inc',
      currentRole: 'Senior Product Manager',
      education: 'MBA - IIM Bangalore',
      location: 'Bangalore',
      noticePeriod: '2 months',
      expectedSalary: '₹20-25 LPA',
      currentSalary: '₹18 LPA',
      resumeUrl: '/resumes/sneha-kapoor.pdf',
      linkedinUrl: 'linkedin.com/in/snehakapoor',
      portfolioUrl: '',
      status: 'new',
      aiInsights: [
        'Proven track record in product launches',
        'Strong data analytics background',
        'Experience in B2B and B2C products'
      ],
      appliedDate: '2024-01-18'
    },
    {
      id: 'CAND-003',
      candidateName: 'Arjun Reddy',
      email: 'arjun.reddy@email.com',
      phone: '+91 98765 33333',
      position: 'UI/UX Designer',
      jobId: 'JOB-003',
      matchScore: 82,
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems', 'Interaction Design'],
      experience: '4 years',
      currentCompany: 'Creative Solutions',
      currentRole: 'Senior UX Designer',
      education: 'Design Graduate - NID Ahmedabad',
      location: 'Remote',
      noticePeriod: 'Immediate',
      expectedSalary: '₹10-12 LPA',
      currentSalary: '₹9 LPA',
      resumeUrl: '/resumes/arjun-reddy.pdf',
      linkedinUrl: 'linkedin.com/in/arjunreddy',
      portfolioUrl: 'arjunreddy.design',
      status: 'interviewed',
      aiInsights: [
        'Award-winning designer',
        'Strong portfolio with mobile and web projects',
        'Experience in design system creation'
      ],
      appliedDate: '2024-01-20'
    },
  ];

  // Stats Cards
  const stats = [
    { 
      title: 'Open Positions', 
      value: '5', 
      change: '+2 this month', 
      icon: <Briefcase size={24} />,
      color: 'primary',
      trend: 'up'
    },
    { 
      title: 'Total Applications', 
      value: '123', 
      change: '+15 this week', 
      icon: <Users size={24} />,
      color: 'info',
      trend: 'up'
    },
    { 
      title: 'Scheduled Interviews', 
      value: '8', 
      change: '3 today', 
      icon: <Calendar size={24} />,
      color: 'warning',
      trend: 'neutral'
    },
    { 
      title: 'Offers Extended', 
      value: '4', 
      change: '2 accepted', 
      icon: <UserCheck size={24} />,
      color: 'success',
      trend: 'up'
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        <div className="page-content recruitment-page">
          {/* Page Header */}
          <div className="recruitment-header">
            <div className="header-left">
              <h1 className="page-title">
                <Briefcase className="title-icon" />
                Staff Recruitment
              </h1>
              <p className="page-subtitle">Intelligent Talent Acquisition & Interview Management</p>
            </div>
            <div className="header-right">
              <button className="btn-icon-secondary">
                <Filter size={18} />
              </button>
              <button className="btn-icon-secondary">
                <Download size={18} />
              </button>
              <button className="btn-gradient-primary" onClick={() => setShowJobModal(true)}>
                <Plus size={18} />
                Post New Job
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid-modern">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card-modern stat-${stat.color}`}>
                <div className="stat-icon-wrapper">
                  <div className="stat-icon-bg">{stat.icon}</div>
                </div>
                <div className="stat-content">
                  <h4 className="stat-title">{stat.title}</h4>
                  <div className="stat-value-wrapper">
                    <span className="stat-value">{stat.value}</span>
                    <span className={`stat-trend trend-${stat.trend}`}>
                      <TrendingUp size={14} />
                    </span>
                  </div>
                  <p className="stat-change">{stat.change}</p>
                </div>
                <div className="stat-sparkline"></div>
              </div>
            ))}
          </div>

          {/* Tabs Navigation */}
          <div className="tabs-modern">
            <div className="tabs-wrapper">
              <button 
                className={`tab-modern ${activeTab === 'jobs' ? 'active' : ''}`}
                onClick={() => setActiveTab('jobs')}
              >
                <Briefcase size={20} />
                <span>Job Descriptions</span>
                <span className="tab-badge">{jobData.filter(j => j.status === 'open').length}</span>
              </button>
              <button 
                className={`tab-modern ${activeTab === 'interviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('interviews')}
              >
                <Calendar size={20} />
                <span>Interview Schedule</span>
                <span className="tab-badge">{interviewData.filter(i => i.status === 'scheduled').length}</span>
              </button>
              <button 
                className={`tab-modern ${activeTab === 'matching' ? 'active' : ''}`}
                onClick={() => setActiveTab('matching')}
              >
                <Brain size={20} />
                <span>AI Profile Matching</span>
                <span className="tab-badge ai-badge">
                  <Sparkles size={12} />
                  AI
                </span>
              </button>
            </div>
            <div className="tabs-actions">
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <Grid size={16} />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content-modern">
            {/* JOB DESCRIPTIONS TAB */}
            {activeTab === 'jobs' && (
              <div className="jobs-section">
                {/* Search and Filter Bar */}
                <div className="section-toolbar">
                  <div className="search-bar-modern">
                    <Search size={18} className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search jobs by title, department, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="filter-group">
                    <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                      <option value="all">All Status</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                    <select className="filter-select">
                      <option value="all">All Departments</option>
                      <option value="engineering">Engineering</option>
                      <option value="product">Product</option>
                      <option value="design">Design</option>
                    </select>
                  </div>
                </div>

                {/* Jobs Grid/List */}
                {viewMode === 'grid' ? (
                  <div className="jobs-grid">
                    {jobData.map((job) => (
                      <div key={job.id} className={`job-card ${job.status === 'closed' ? 'closed' : ''}`}>
                        <div className="job-card-header">
                          <div className="job-meta-row">
                            <span className="job-id">{job.id}</span>
                            <span className={`job-status-badge status-${job.status}`}>
                              {job.status === 'open' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                              {job.status}
                            </span>
                          </div>
                          {job.urgency === 'urgent' && (
                            <span className="urgency-badge">
                              <AlertCircle size={14} />
                              Urgent
                            </span>
                          )}
                        </div>

                        <div className="job-card-body">
                          <h3 className="job-title">{job.title}</h3>
                          <p className="job-description">{job.description}</p>

                          <div className="job-details-grid">
                            <div className="job-detail-item">
                              <Building2 size={16} className="detail-icon" />
                              <span>{job.department}</span>
                            </div>
                            <div className="job-detail-item">
                              <MapPin size={16} className="detail-icon" />
                              <span>{job.location}</span>
                            </div>
                            <div className="job-detail-item">
                              <Clock size={16} className="detail-icon" />
                              <span>{job.type}</span>
                            </div>
                            <div className="job-detail-item">
                              <DollarSign size={16} className="detail-icon" />
                              <span>{job.salary}</span>
                            </div>
                          </div>

                          <div className="job-skills">
                            {job.requirements.slice(0, 4).map((req, idx) => (
                              <span key={idx} className="skill-tag">{req}</span>
                            ))}
                            {job.requirements.length > 4 && (
                              <span className="skill-tag more">+{job.requirements.length - 4}</span>
                            )}
                          </div>

                          <div className="job-stats">
                            <div className="stat-item">
                              <span className="stat-label">Openings</span>
                              <span className="stat-value">{job.openings}</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                              <span className="stat-label">Applications</span>
                              <span className="stat-value highlight">{job.applications}</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                              <span className="stat-label">Shortlisted</span>
                              <span className="stat-value">{job.shortlisted}</span>
                            </div>
                          </div>
                        </div>

                        <div className="job-card-footer">
                          <button className="btn-card-action" onClick={() => setSelectedJob(job)}>
                            <Eye size={16} />
                            View Details
                          </button>
                          <div className="job-actions">
                            <button className="btn-icon-action" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button className="btn-icon-action" title="Share">
                              <Send size={16} />
                            </button>
                            <button className="btn-icon-action danger" title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="jobs-list">
                    {/* List view implementation */}
                  </div>
                )}
              </div>
            )}

            {/* INTERVIEW SCHEDULE TAB */}
            {activeTab === 'interviews' && (
              <div className="interviews-section">
                <div className="section-header-bar">
                  <h2 className="section-title">Upcoming Interviews</h2>
                  <button className="btn-primary-modern" onClick={() => setShowInterviewModal(true)}>
                    <Plus size={18} />
                    Schedule Interview
                  </button>
                </div>

                <div className="interviews-timeline">
                  {interviewData.map((interview) => (
                    <div key={interview.id} className={`interview-card status-${interview.status}`}>
                      <div className="interview-timeline-marker"></div>
                      
                      <div className="interview-card-content">
                        <div className="interview-header">
                          <div className="candidate-info">
                            <div className="candidate-avatar">
                              {interview.candidateName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="candidate-name">{interview.candidateName}</h4>
                              <p className="candidate-position">{interview.position}</p>
                            </div>
                          </div>
                          <span className={`interview-status-badge status-${interview.status}`}>
                            {interview.status}
                          </span>
                        </div>

                        <div className="interview-details-grid">
                          <div className="detail-box">
                            <Calendar size={16} className="box-icon" />
                            <div>
                              <span className="box-label">Date & Time</span>
                              <span className="box-value">{interview.date} at {interview.time}</span>
                            </div>
                          </div>
                          <div className="detail-box">
                            <User size={16} className="box-icon" />
                            <div>
                              <span className="box-label">Interviewer</span>
                              <span className="box-value">{interview.interviewer}</span>
                              <span className="box-sub">{interview.interviewerRole}</span>
                            </div>
                          </div>
                          <div className="detail-box">
                            <Target size={16} className="box-icon" />
                            <div>
                              <span className="box-label">Round</span>
                              <span className="box-value">{interview.round}</span>
                              <span className="box-sub">Round {interview.roundNumber} of {interview.totalRounds}</span>
                            </div>
                          </div>
                          <div className="detail-box">
                            {interview.mode === 'Video Call' ? <Video size={16} className="box-icon" /> : <Building2 size={16} className="box-icon" />}
                            <div>
                              <span className="box-label">Mode</span>
                              <span className="box-value">{interview.mode}</span>
                              <span className="box-sub">{interview.duration}</span>
                            </div>
                          </div>
                        </div>

                        {interview.notes && (
                          <div className="interview-notes">
                            <FileText size={14} />
                            <span>{interview.notes}</span>
                          </div>
                        )}

                        <div className="interview-actions">
                          {interview.status === 'scheduled' && (
                            <>
                              {!interview.reminderSent && (
                                <button className="btn-action-secondary">
                                  <Send size={16} />
                                  Send Reminder
                                </button>
                              )}
                              {interview.meetingLink && (
                                <button className="btn-action-primary">
                                  <Video size={16} />
                                  Join Meeting
                                </button>
                              )}
                              <button className="btn-action-secondary">
                                <Edit size={16} />
                                Reschedule
                              </button>
                            </>
                          )}
                          {interview.status === 'completed' && interview.rating && (
                            <div className="interview-rating">
                              <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
                              <span>{interview.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI PROFILE MATCHING TAB */}
            {activeTab === 'matching' && (
              <div className="matching-section">
                <div className="section-header-bar">
                  <div>
                    <h2 className="section-title">
                      <Brain size={24} />
                      AI-Matched Candidates
                    </h2>
                    <p className="section-subtitle">Intelligent candidate matching using advanced algorithms</p>
                  </div>
                  <div className="header-actions-group">
                    <button className="btn-secondary-modern">
                      <Upload size={18} />
                      Upload CV
                    </button>
                    <button className="btn-gradient-ai">
                      <Sparkles size={18} />
                      Run AI Match
                    </button>
                  </div>
                </div>

                <div className="candidates-grid">
                  {aiMatchingData.map((candidate) => (
                    <div key={candidate.id} className="candidate-card">
                      <div className="candidate-card-header">
                        <div className="candidate-profile">
                          <div className="candidate-avatar-large">
                            {candidate.candidateName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="candidate-info-header">
                            <h3 className="candidate-name-large">{candidate.candidateName}</h3>
                            <p className="candidate-role">{candidate.currentRole}</p>
                            <p className="candidate-company">{candidate.currentCompany}</p>
                          </div>
                        </div>
                        <div className="match-score-circle">
                          <svg viewBox="0 0 100 100" className="score-svg">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="45" 
                              fill="none" 
                              stroke={candidate.matchScore >= 90 ? '#10b981' : candidate.matchScore >= 80 ? '#f59e0b' : '#6366f1'}
                              strokeWidth="8"
                              strokeDasharray={`${candidate.matchScore * 2.83} 283`}
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="score-text">
                            <span className="score-value">{candidate.matchScore}%</span>
                            <span className="score-label">Match</span>
                          </div>
                        </div>
                      </div>

                      <div className="candidate-details-section">
                        <div className="detail-row">
                          <Briefcase size={16} />
                          <span className="detail-label">Position:</span>
                          <span className="detail-value">{candidate.position}</span>
                        </div>
                        <div className="detail-row">
                          <Award size={16} />
                          <span className="detail-label">Experience:</span>
                          <span className="detail-value">{candidate.experience}</span>
                        </div>
                        <div className="detail-row">
                          <MapPin size={16} />
                          <span className="detail-label">Location:</span>
                          <span className="detail-value">{candidate.location}</span>
                        </div>
                        <div className="detail-row">
                          <Clock size={16} />
                          <span className="detail-label">Notice Period:</span>
                          <span className="detail-value">{candidate.noticePeriod}</span>
                        </div>
                      </div>

                      <div className="candidate-skills-section">
                        <h5 className="skills-title">Top Skills</h5>
                        <div className="skills-cloud">
                          {candidate.skills.map((skill, idx) => (
                            <span key={idx} className="skill-badge">{skill}</span>
                          ))}
                        </div>
                      </div>

                      <div className="ai-insights-section">
                        <h5 className="insights-title">
                          <Brain size={16} />
                          AI Insights
                        </h5>
                        <ul className="insights-list">
                          {candidate.aiInsights.map((insight, idx) => (
                            <li key={idx} className="insight-item">
                              <CheckCircle size={14} />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="candidate-card-footer">
                        <button className="btn-card-primary" onClick={() => setSelectedCandidate(candidate)}>
                          <Eye size={16} />
                          View Full Profile
                        </button>
                        <div className="footer-actions">
                          <button className="btn-icon-success" title="Schedule Interview">
                            <Calendar size={16} />
                          </button>
                          <button className="btn-icon-info" title="Download Resume">
                            <Download size={16} />
                          </button>
                          <button className="btn-icon-secondary" title="Contact">
                            <Mail size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
