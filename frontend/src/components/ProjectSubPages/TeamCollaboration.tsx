import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  MessageSquare, 
  Send, 
  FileText,
  Upload,
  Download,
  MoreVertical,
  Bell,
  Search
} from 'lucide-react';

interface TeamCollaborationProps {
  projectId: number;
}

const TeamCollaboration: React.FC<TeamCollaborationProps> = ({ projectId }) => {
  const [activeSection, setActiveSection] = useState<'team' | 'chat' | 'discussions' | 'files'>('team');
  const [chatMessage, setChatMessage] = useState('');

  const teamMembers = [
    { 
      id: 1, 
      name: 'Vikram Singh', 
      role: 'Project Manager', 
      email: 'vikram@example.com',
      avatar: 'VS',
      status: 'online',
      tasksAssigned: 12,
      hoursLogged: 156
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      role: 'UI/UX Designer', 
      email: 'priya@example.com',
      avatar: 'PS',
      status: 'online',
      tasksAssigned: 8,
      hoursLogged: 142
    },
    { 
      id: 3, 
      name: 'Rajesh Kumar', 
      role: 'Frontend Developer', 
      email: 'rajesh@example.com',
      avatar: 'RK',
      status: 'away',
      tasksAssigned: 15,
      hoursLogged: 198
    },
    { 
      id: 4, 
      name: 'Amit Patel', 
      role: 'Backend Developer', 
      email: 'amit@example.com',
      avatar: 'AP',
      status: 'online',
      tasksAssigned: 18,
      hoursLogged: 210
    },
    { 
      id: 5, 
      name: 'Sneha Reddy', 
      role: 'QA Engineer', 
      email: 'sneha@example.com',
      avatar: 'SR',
      status: 'offline',
      tasksAssigned: 10,
      hoursLogged: 124
    }
  ];

  const chatMessages = [
    { id: 1, sender: 'Priya Sharma', message: 'Design mockups are ready for review', time: '10:30 AM', avatar: 'PS' },
    { id: 2, sender: 'Vikram Singh', message: 'Great! Will review them shortly', time: '10:32 AM', avatar: 'VS' },
    { id: 3, sender: 'Rajesh Kumar', message: 'Can someone help with the API integration?', time: '11:15 AM', avatar: 'RK' },
    { id: 4, sender: 'Amit Patel', message: 'Sure, I can assist. Let me check your code.', time: '11:20 AM', avatar: 'AP' }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Homepage Design Feedback',
      author: 'Priya Sharma',
      replies: 12,
      lastActivity: '2 hours ago',
      status: 'Active'
    },
    {
      id: 2,
      title: 'API Response Time Optimization',
      author: 'Amit Patel',
      replies: 8,
      lastActivity: '5 hours ago',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Browser Compatibility Issues',
      author: 'Rajesh Kumar',
      replies: 15,
      lastActivity: '1 day ago',
      status: 'Resolved'
    }
  ];

  const sharedFiles = [
    { id: 1, name: 'Project_Requirements_v2.pdf', version: 'v2.0', uploadedBy: 'Vikram Singh', date: '2024-12-01', size: '3.2 MB' },
    { id: 2, name: 'Design_System.fig', version: 'v1.5', uploadedBy: 'Priya Sharma', date: '2024-12-02', size: '12.8 MB' },
    { id: 3, name: 'API_Documentation.docx', version: 'v3.1', uploadedBy: 'Amit Patel', date: '2024-12-03', size: '1.5 MB' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'away': return 'status-away';
      case 'offline': return 'status-offline';
      default: return '';
    }
  };

  return (
    <div className="tab-content">
      {/* Section Tabs */}
      <div className="sub-tabs">
        <button 
          className={`sub-tab ${activeSection === 'team' ? 'active' : ''}`}
          onClick={() => setActiveSection('team')}
        >
          <Users size={16} />
          Team Members
        </button>
        <button 
          className={`sub-tab ${activeSection === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveSection('chat')}
        >
          <MessageSquare size={16} />
          Real-time Chat
        </button>
        <button 
          className={`sub-tab ${activeSection === 'discussions' ? 'active' : ''}`}
          onClick={() => setActiveSection('discussions')}
        >
          <FileText size={16} />
          Discussion Boards
        </button>
        <button 
          className={`sub-tab ${activeSection === 'files' ? 'active' : ''}`}
          onClick={() => setActiveSection('files')}
        >
          <Upload size={16} />
          File Sharing
        </button>
      </div>

      {/* Team Members Section */}
      {activeSection === 'team' && (
        <div className="section-content">
          <div className="section-header">
            <h3>Project Team Members</h3>
            <button className="btn-primary">
              <Plus size={16} />
              Add Member
            </button>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member-card">
                <div className="member-header">
                  <div className="member-avatar-wrapper">
                    <div className="user-avatar large">{member.avatar}</div>
                    <span className={`status-indicator ${getStatusColor(member.status)}`}></span>
                  </div>
                  <button className="icon-btn-small">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <h4 className="member-name">{member.name}</h4>
                <p className="member-role">{member.role}</p>
                <p className="member-email">{member.email}</p>
                
                <div className="member-stats">
                  <div className="member-stat">
                    <span className="stat-value">{member.tasksAssigned}</span>
                    <span className="stat-label">Tasks</span>
                  </div>
                  <div className="member-stat">
                    <span className="stat-value">{member.hoursLogged}h</span>
                    <span className="stat-label">Hours</span>
                  </div>
                </div>

                <div className="member-actions">
                  <button className="btn-secondary small">Message</button>
                  <button className="btn-secondary small">View Profile</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real-time Chat Section */}
      {activeSection === 'chat' && (
        <div className="section-content">
          <div className="chat-container">
            <div className="chat-header">
              <h3>Project Chat Room</h3>
              <div className="chat-actions">
                <button className="icon-btn-small">
                  <Bell size={16} />
                </button>
                <button className="icon-btn-small">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div className="chat-messages">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="chat-message">
                  <div className="user-avatar small">{msg.avatar}</div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="sender-name">{msg.sender}</span>
                      <span className="message-time">{msg.time}</span>
                    </div>
                    <p className="message-text">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button className="btn-primary">
                <Send size={16} />
              </button>
            </div>
          </div>

          <div className="chat-info-panel">
            <h4>Online Team Members</h4>
            <div className="online-members-list">
              {teamMembers.filter(m => m.status === 'online').map((member) => (
                <div key={member.id} className="online-member-item">
                  <div className="member-avatar-wrapper-small">
                    <div className="user-avatar small">{member.avatar}</div>
                    <span className={`status-indicator small ${getStatusColor(member.status)}`}></span>
                  </div>
                  <span>{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Discussion Boards Section */}
      {activeSection === 'discussions' && (
        <div className="section-content">
          <div className="section-header">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search discussions..." />
            </div>
            <button className="btn-primary">
              <Plus size={16} />
              New Discussion
            </button>
          </div>

          <div className="discussions-list">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="discussion-card">
                <div className="discussion-content">
                  <h4 className="discussion-title">{discussion.title}</h4>
                  <div className="discussion-meta">
                    <span className="discussion-author">Started by {discussion.author}</span>
                    <span className="discussion-replies">
                      <MessageSquare size={14} />
                      {discussion.replies} replies
                    </span>
                    <span className="discussion-time">{discussion.lastActivity}</span>
                  </div>
                </div>
                <div className="discussion-status">
                  <span className={`status-badge ${discussion.status === 'Active' ? 'status-inprogress' : 'status-completed'}`}>
                    {discussion.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Sharing Section */}
      {activeSection === 'files' && (
        <div className="section-content">
          <div className="section-header">
            <h3>Shared Files with Version Control</h3>
            <button className="btn-primary">
              <Upload size={16} />
              Upload File
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Version</th>
                  <th>Uploaded By</th>
                  <th>Date</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sharedFiles.map((file) => (
                  <tr key={file.id}>
                    <td className="td-bold">
                      <FileText size={16} className="mr-2" />
                      {file.name}
                    </td>
                    <td>
                      <span className="version-badge">{file.version}</span>
                    </td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar small">
                          {file.uploadedBy.split(' ').map(n => n[0]).join('')}
                        </div>
                        {file.uploadedBy}
                      </div>
                    </td>
                    <td>{file.date}</td>
                    <td>{file.size}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn-small" title="Download">
                          <Download size={16} />
                        </button>
                        <button className="icon-btn-small" title="Version History">
                          <FileText size={16} />
                        </button>
                        <button className="icon-btn-small">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="notification-settings mt-4">
            <h4>Notification Settings</h4>
            <div className="notification-options">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Auto-notify on file uploads</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Notify on new comments</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Daily digest of updates</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCollaboration;
