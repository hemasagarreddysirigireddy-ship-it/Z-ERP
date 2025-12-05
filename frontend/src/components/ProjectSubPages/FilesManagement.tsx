import React, { useState } from 'react';
import { 
  Folder, 
  FolderPlus, 
  Upload, 
  Download, 
  FileText, 
  Image, 
  File, 
  Trash2,
  Eye,
  Clock,
  Users,
  Search,
  Filter,
  MoreVertical,
  History
} from 'lucide-react';

interface FilesManagementProps {
  projectId: number;
}

const FilesManagement: React.FC<FilesManagementProps> = ({ projectId }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFolder, setSelectedFolder] = useState('all');

  const folders = [
    { id: 'all', name: 'All Files', count: 24 },
    { id: 'designs', name: 'Designs', count: 8 },
    { id: 'documents', name: 'Documents', count: 12 },
    { id: 'code', name: 'Source Code', count: 3 },
    { id: 'assets', name: 'Assets', count: 1 }
  ];

  const files = [
    {
      id: 1,
      name: 'Homepage_Design_v3.fig',
      type: 'design',
      folder: 'designs',
      size: '12.4 MB',
      uploadedBy: 'Priya Sharma',
      uploadDate: '2024-12-03',
      version: '3.0',
      versionHistory: [
        { version: '3.0', date: '2024-12-03', uploadedBy: 'Priya Sharma', changes: 'Final design updates' },
        { version: '2.0', date: '2024-12-01', uploadedBy: 'Priya Sharma', changes: 'Client feedback incorporated' },
        { version: '1.0', date: '2024-11-28', uploadedBy: 'Priya Sharma', changes: 'Initial design' }
      ],
      approvalStatus: 'Approved',
      downloads: 15
    },
    {
      id: 2,
      name: 'Project_Requirements.docx',
      type: 'document',
      folder: 'documents',
      size: '2.1 MB',
      uploadedBy: 'Vikram Singh',
      uploadDate: '2024-11-25',
      version: '2.1',
      versionHistory: [
        { version: '2.1', date: '2024-11-25', uploadedBy: 'Vikram Singh', changes: 'Added new requirements' },
        { version: '2.0', date: '2024-11-20', uploadedBy: 'Vikram Singh', changes: 'Major update' }
      ],
      approvalStatus: 'Approved',
      downloads: 22
    },
    {
      id: 3,
      name: 'API_Documentation.pdf',
      type: 'document',
      folder: 'documents',
      size: '3.5 MB',
      uploadedBy: 'Amit Patel',
      uploadDate: '2024-12-02',
      version: '1.5',
      versionHistory: [
        { version: '1.5', date: '2024-12-02', uploadedBy: 'Amit Patel', changes: 'Added authentication section' },
        { version: '1.0', date: '2024-11-30', uploadedBy: 'Amit Patel', changes: 'Initial documentation' }
      ],
      approvalStatus: 'Pending Review',
      downloads: 8
    },
    {
      id: 4,
      name: 'Logo_Assets.zip',
      type: 'asset',
      folder: 'assets',
      size: '5.8 MB',
      uploadedBy: 'Priya Sharma',
      uploadDate: '2024-11-28',
      version: '1.0',
      versionHistory: [
        { version: '1.0', date: '2024-11-28', uploadedBy: 'Priya Sharma', changes: 'Initial upload' }
      ],
      approvalStatus: 'Approved',
      downloads: 12
    },
    {
      id: 5,
      name: 'Frontend_Code_v2.zip',
      type: 'code',
      folder: 'code',
      size: '45.2 MB',
      uploadedBy: 'Rajesh Kumar',
      uploadDate: '2024-12-03',
      version: '2.0',
      versionHistory: [
        { version: '2.0', date: '2024-12-03', uploadedBy: 'Rajesh Kumar', changes: 'Responsive layout implemented' },
        { version: '1.0', date: '2024-11-29', uploadedBy: 'Rajesh Kumar', changes: 'Initial code' }
      ],
      approvalStatus: 'Approved',
      downloads: 5
    },
    {
      id: 6,
      name: 'Test_Plan.xlsx',
      type: 'document',
      folder: 'documents',
      size: '1.2 MB',
      uploadedBy: 'Sneha Reddy',
      uploadDate: '2024-12-01',
      version: '1.0',
      versionHistory: [
        { version: '1.0', date: '2024-12-01', uploadedBy: 'Sneha Reddy', changes: 'Initial test plan' }
      ],
      approvalStatus: 'Under Review',
      downloads: 6
    }
  ];

  const filteredFiles = selectedFolder === 'all' 
    ? files 
    : files.filter(f => f.folder === selectedFolder);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'design': return <Image size={20} />;
      case 'document': return <FileText size={20} />;
      case 'code': return <File size={20} />;
      case 'asset': return <Folder size={20} />;
      default: return <File size={20} />;
    }
  };

  const getApprovalColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'status-completed';
      case 'Pending Review': return 'status-pending';
      case 'Under Review': return 'status-inprogress';
      default: return '';
    }
  };

  return (
    <div className="tab-content">
      {/* Header */}
      <div className="tab-content-header">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search files..." />
        </div>
        
        <div className="toolbar-actions">
          <button className="btn-secondary">
            <Filter size={18} />
            Filter
          </button>
          <button className="btn-secondary">
            <FolderPlus size={18} />
            New Folder
          </button>
          <button className="btn-primary">
            <Upload size={18} />
            Upload Files
          </button>
        </div>
      </div>

      {/* Folders */}
      <div className="folders-section">
        {folders.map((folder) => (
          <button
            key={folder.id}
            className={`folder-btn ${selectedFolder === folder.id ? 'active' : ''}`}
            onClick={() => setSelectedFolder(folder.id)}
          >
            <Folder size={18} />
            <span>{folder.name}</span>
            <span className="folder-count">{folder.count}</span>
          </button>
        ))}
      </div>

      {/* Files Table */}
      <div className="files-section">
        <div className="section-header">
          <h3>{folders.find(f => f.id === selectedFolder)?.name} ({filteredFiles.length})</h3>
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
          </div>
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
                <th>Status</th>
                <th>Downloads</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.id}>
                  <td>
                    <div className="file-cell">
                      {getFileIcon(file.type)}
                      <span className="td-bold">{file.name}</span>
                    </div>
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
                  <td>
                    <div className="date-cell">
                      <Clock size={14} />
                      {file.uploadDate}
                    </div>
                  </td>
                  <td>{file.size}</td>
                  <td>
                    <span className={`status-badge ${getApprovalColor(file.approvalStatus)}`}>
                      {file.approvalStatus}
                    </span>
                  </td>
                  <td className="td-center">{file.downloads}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-btn-small" title="Download">
                        <Download size={14} />
                      </button>
                      <button className="icon-btn-small" title="Preview">
                        <Eye size={14} />
                      </button>
                      <button className="icon-btn-small" title="Version History">
                        <History size={14} />
                      </button>
                      <button className="icon-btn-small" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Version History Section */}
      <div className="project-details-card mt-4">
        <h3 className="card-section-title">
          <History size={20} />
          Recent Version History
        </h3>
        <div className="version-history-list">
          {files[0].versionHistory.map((version, idx) => (
            <div key={idx} className="version-item">
              <div className="version-indicator">
                <div className="version-dot"></div>
                {idx < files[0].versionHistory.length - 1 && <div className="version-line"></div>}
              </div>
              <div className="version-content">
                <div className="version-header">
                  <span className="version-number">Version {version.version}</span>
                  <span className="version-date">
                    <Clock size={12} />
                    {version.date}
                  </span>
                </div>
                <p className="version-changes">{version.changes}</p>
                <div className="version-author">
                  <Users size={12} />
                  <span>by {version.uploadedBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* File Statistics */}
      <div className="files-stats-grid">
        <div className="stat-card">
          <FileText size={24} className="stat-icon-blue" />
          <div>
            <span className="stat-value">{files.length}</span>
            <span className="stat-label">Total Files</span>
          </div>
        </div>
        <div className="stat-card">
          <Upload size={24} className="stat-icon-green" />
          <div>
            <span className="stat-value">
              {files.reduce((sum, f) => sum + parseFloat(f.size), 0).toFixed(1)} MB
            </span>
            <span className="stat-label">Total Size</span>
          </div>
        </div>
        <div className="stat-card">
          <Download size={24} className="stat-icon-orange" />
          <div>
            <span className="stat-value">
              {files.reduce((sum, f) => sum + f.downloads, 0)}
            </span>
            <span className="stat-label">Total Downloads</span>
          </div>
        </div>
        <div className="stat-card">
          <History size={24} className="stat-icon-purple" />
          <div>
            <span className="stat-value">
              {files.reduce((sum, f) => sum + f.versionHistory.length, 0)}
            </span>
            <span className="stat-label">Total Versions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesManagement;
