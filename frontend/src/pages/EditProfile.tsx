import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  Globe,
  Lock,
  Shield,
  Eye,
  EyeOff,
  Save,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Link as LinkIcon,
  Building,
  GraduationCap,
  Award,
  Languages,
  Clock,
  Bell,
  Palette,
  Moon,
  Sun
} from 'lucide-react';
import '../styles/EditProfile.css';

interface EditProfileProps {
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/300?img=12');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=300&fit=crop');

  // Form states
  const [formData, setFormData] = useState({
    firstName: 'Alexander',
    lastName: 'Mitchell',
    email: 'alexander.mitchell@techcorp.com',
    phone: '+1 (555) 123-4567',
    alternatePhone: '+1 (555) 987-6543',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    nationality: 'United States',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'California',
    zipCode: '94102',
    country: 'United States',
    
    // Professional
    jobTitle: 'Senior Software Architect',
    department: 'Engineering & Development',
    employeeId: 'EMP-2024-789',
    joiningDate: '2020-03-15',
    reportingManager: 'Sarah Johnson',
    workLocation: 'Hybrid - SF Office',
    employmentType: 'Full-time',
    
    // Education
    highestDegree: 'Master of Science',
    fieldOfStudy: 'Computer Science',
    university: 'Stanford University',
    graduationYear: '2015',
    certifications: 'AWS Solutions Architect, Google Cloud Professional',
    
    // Social
    facebook: 'alexander.mitchell',
    linkedin: 'alexandermitchell',
    twitter: '@alexmitchell',
    instagram: 'alex_mitchell_dev',
    github: 'alexmitchell',
    website: 'www.alexmitchell.dev',
    
    // Security
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    
    // Preferences
    language: 'English (US)',
    timezone: 'Pacific Time (PT)',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    theme: 'auto',
    
    // Signature
    emailSignature: 'Best regards,\nAlexander Mitchell\nSenior Software Architect\nTechCorp Solutions'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (type: 'profile' | 'cover') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfileImage(reader.result as string);
        } else {
          setCoverImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    // Add save logic here
    alert('Profile updated successfully!');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'professional', label: 'Professional', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'social', label: 'Social Links', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette }
  ];

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-container">
        {/* Header */}
        <div className="edit-profile-header">
          <div className="edit-profile-header-content">
            <div className="edit-profile-title-section">
              <div className="edit-profile-icon">
                <User size={24} />
              </div>
              <div>
                <h2 className="edit-profile-title">Edit My Profile</h2>
                <p className="edit-profile-subtitle">Manage your account information and preferences</p>
              </div>
            </div>
            <button className="edit-profile-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="edit-profile-cover-section">
          <img src={coverImage} alt="Cover" className="edit-profile-cover-image" />
          <label className="edit-profile-cover-upload">
            <input type="file" accept="image/*" onChange={handleImageUpload('cover')} hidden />
            <Camera size={20} />
            <span>Change Cover</span>
          </label>
          
          {/* Profile Picture */}
          <div className="edit-profile-avatar-wrapper">
            <img src={profileImage} alt="Profile" className="edit-profile-avatar" />
            <label className="edit-profile-avatar-upload">
              <input type="file" accept="image/*" onChange={handleImageUpload('profile')} hidden />
              <Upload size={18} />
            </label>
          </div>
        </div>

        {/* Tabs */}
        <div className="edit-profile-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`edit-profile-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="edit-profile-content">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="edit-profile-section">
              <div className="edit-section-header">
                <User size={20} />
                <h3>Personal Information</h3>
              </div>
              
              <div className="edit-form-grid">
                <div className="edit-form-group">
                  <label>First Name <span className="required">*</span></label>
                  <div className="edit-input-wrapper">
                    <User size={18} />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Last Name <span className="required">*</span></label>
                  <div className="edit-input-wrapper">
                    <User size={18} />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Email Address <span className="required">*</span></label>
                  <div className="edit-input-wrapper">
                    <Mail size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Phone Number <span className="required">*</span></label>
                  <div className="edit-input-wrapper">
                    <Phone size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Alternate Phone</label>
                  <div className="edit-input-wrapper">
                    <Phone size={18} />
                    <input
                      type="tel"
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleInputChange}
                      placeholder="Enter alternate phone"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Date of Birth</label>
                  <div className="edit-input-wrapper">
                    <Calendar size={18} />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Gender</label>
                  <div className="edit-input-wrapper">
                    <User size={18} />
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Nationality</label>
                  <div className="edit-input-wrapper">
                    <Globe size={18} />
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      placeholder="Enter nationality"
                    />
                  </div>
                </div>

                <div className="edit-form-group full-width">
                  <label>Address</label>
                  <div className="edit-input-wrapper">
                    <MapPin size={18} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter street address"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>City</label>
                  <div className="edit-input-wrapper">
                    <MapPin size={18} />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>State/Province</label>
                  <div className="edit-input-wrapper">
                    <MapPin size={18} />
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>ZIP/Postal Code</label>
                  <div className="edit-input-wrapper">
                    <MapPin size={18} />
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Country</label>
                  <div className="edit-input-wrapper">
                    <Globe size={18} />
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Enter country"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Professional Tab */}
          {activeTab === 'professional' && (
            <div className="edit-profile-section">
              <div className="edit-section-header">
                <Briefcase size={20} />
                <h3>Professional Details</h3>
              </div>
              
              <div className="edit-form-grid">
                <div className="edit-form-group">
                  <label>Job Title <span className="required">*</span></label>
                  <div className="edit-input-wrapper">
                    <Briefcase size={18} />
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="Enter job title"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Department <span className="required">*</span></label>
                  <div className="edit-input-wrapper">
                    <Building size={18} />
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="Enter department"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Employee ID</label>
                  <div className="edit-input-wrapper">
                    <Award size={18} />
                    <input
                      type="text"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      placeholder="Enter employee ID"
                      disabled
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Joining Date</label>
                  <div className="edit-input-wrapper">
                    <Calendar size={18} />
                    <input
                      type="date"
                      name="joiningDate"
                      value={formData.joiningDate}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Reporting Manager</label>
                  <div className="edit-input-wrapper">
                    <User size={18} />
                    <input
                      type="text"
                      name="reportingManager"
                      value={formData.reportingManager}
                      onChange={handleInputChange}
                      placeholder="Enter manager name"
                      disabled
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Work Location</label>
                  <div className="edit-input-wrapper">
                    <MapPin size={18} />
                    <select name="workLocation" value={formData.workLocation} onChange={handleInputChange}>
                      <option value="Hybrid - SF Office">Hybrid - SF Office</option>
                      <option value="Remote">Remote</option>
                      <option value="On-site - SF Office">On-site - SF Office</option>
                      <option value="On-site - NY Office">On-site - NY Office</option>
                      <option value="On-site - LA Office">On-site - LA Office</option>
                    </select>
                  </div>
                </div>

                <div className="edit-form-group full-width">
                  <label>Employment Type</label>
                  <div className="edit-input-wrapper">
                    <Briefcase size={18} />
                    <select name="employmentType" value={formData.employmentType} onChange={handleInputChange} disabled>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="edit-profile-section">
              <div className="edit-section-header">
                <GraduationCap size={20} />
                <h3>Education & Certifications</h3>
              </div>
              
              <div className="edit-form-grid">
                <div className="edit-form-group">
                  <label>Highest Degree</label>
                  <div className="edit-input-wrapper">
                    <GraduationCap size={18} />
                    <select name="highestDegree" value={formData.highestDegree} onChange={handleInputChange}>
                      <option value="">Select degree</option>
                      <option value="High School">High School</option>
                      <option value="Associate Degree">Associate Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Master of Science">Master of Science</option>
                      <option value="Master of Business Administration">Master of Business Administration</option>
                      <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                    </select>
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Field of Study</label>
                  <div className="edit-input-wrapper">
                    <Award size={18} />
                    <input
                      type="text"
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={handleInputChange}
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>University/Institution</label>
                  <div className="edit-input-wrapper">
                    <Building size={18} />
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      placeholder="Enter institution name"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Graduation Year</label>
                  <div className="edit-input-wrapper">
                    <Calendar size={18} />
                    <input
                      type="text"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      placeholder="e.g., 2020"
                    />
                  </div>
                </div>

                <div className="edit-form-group full-width">
                  <label>Professional Certifications</label>
                  <div className="edit-input-wrapper">
                    <Award size={18} />
                    <textarea
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleInputChange}
                      placeholder="List your professional certifications (comma separated)"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Links Tab */}
          {activeTab === 'social' && (
            <div className="edit-profile-section">
              <div className="edit-section-header">
                <Globe size={20} />
                <h3>Social Media & Links</h3>
              </div>
              
              <div className="edit-form-grid">
                <div className="edit-form-group">
                  <label>LinkedIn</label>
                  <div className="edit-input-wrapper social-input">
                    <Linkedin size={18} />
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="LinkedIn username"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>GitHub</label>
                  <div className="edit-input-wrapper social-input">
                    <Github size={18} />
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="GitHub username"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Twitter</label>
                  <div className="edit-input-wrapper social-input">
                    <Twitter size={18} />
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      placeholder="@username"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Facebook</label>
                  <div className="edit-input-wrapper social-input">
                    <Facebook size={18} />
                    <input
                      type="text"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      placeholder="Facebook username"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Instagram</label>
                  <div className="edit-input-wrapper social-input">
                    <Instagram size={18} />
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      placeholder="Instagram username"
                    />
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Personal Website</label>
                  <div className="edit-input-wrapper social-input">
                    <LinkIcon size={18} />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="www.yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="edit-form-group full-width">
                  <label>Email Signature</label>
                  <div className="edit-input-wrapper">
                    <Mail size={18} />
                    <textarea
                      name="emailSignature"
                      value={formData.emailSignature}
                      onChange={handleInputChange}
                      placeholder="Your email signature"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="edit-profile-section">
              <div className="edit-section-header">
                <Shield size={20} />
                <h3>Security & Privacy</h3>
              </div>
              
              <div className="edit-security-container">
                <div className="edit-security-card">
                  <div className="edit-security-card-header">
                    <Lock size={20} />
                    <h4>Change Password</h4>
                  </div>
                  
                  <div className="edit-form-grid">
                    <div className="edit-form-group full-width">
                      <label>Current Password <span className="required">*</span></label>
                      <div className="edit-input-wrapper password-input">
                        <Lock size={18} />
                        <input
                          type={showOldPassword ? 'text' : 'password'}
                          name="oldPassword"
                          value={formData.oldPassword}
                          onChange={handleInputChange}
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                        >
                          {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="edit-form-group full-width">
                      <label>New Password <span className="required">*</span></label>
                      <div className="edit-input-wrapper password-input">
                        <Lock size={18} />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <span className="password-hint">Min 8 characters with uppercase, lowercase, number & special char</span>
                    </div>

                    <div className="edit-form-group full-width">
                      <label>Confirm New Password <span className="required">*</span></label>
                      <div className="edit-input-wrapper password-input">
                        <Lock size={18} />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="edit-security-card">
                  <div className="edit-security-card-header">
                    <Shield size={20} />
                    <h4>Two-Factor Authentication</h4>
                  </div>
                  
                  <div className="edit-2fa-section">
                    <div className="edit-2fa-option">
                      <div className="edit-2fa-info">
                        <div className="edit-2fa-icon enabled">
                          <Shield size={20} />
                        </div>
                        <div>
                          <h5>Two-Factor Authentication</h5>
                          <p>Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <label className="edit-toggle-switch">
                        <input
                          type="checkbox"
                          name="twoFactorEnabled"
                          checked={formData.twoFactorEnabled}
                          onChange={handleInputChange}
                        />
                        <span className="edit-toggle-slider"></span>
                      </label>
                    </div>

                    {formData.twoFactorEnabled && (
                      <div className="edit-2fa-methods">
                        <div className="edit-2fa-method">
                          <Mail size={18} />
                          <span>Email Authentication</span>
                          <button className="edit-btn-configure">Configure</button>
                        </div>
                        <div className="edit-2fa-method">
                          <Phone size={18} />
                          <span>SMS Authentication</span>
                          <button className="edit-btn-configure">Configure</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="edit-security-card">
                  <div className="edit-security-card-header">
                    <Bell size={20} />
                    <h4>Notification Preferences</h4>
                  </div>
                  
                  <div className="edit-notification-options">
                    <div className="edit-notification-item">
                      <div className="edit-notification-info">
                        <Mail size={18} />
                        <div>
                          <h5>Email Notifications</h5>
                          <p>Receive updates via email</p>
                        </div>
                      </div>
                      <label className="edit-toggle-switch">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleInputChange}
                        />
                        <span className="edit-toggle-slider"></span>
                      </label>
                    </div>

                    <div className="edit-notification-item">
                      <div className="edit-notification-info">
                        <Phone size={18} />
                        <div>
                          <h5>SMS Notifications</h5>
                          <p>Receive updates via text message</p>
                        </div>
                      </div>
                      <label className="edit-toggle-switch">
                        <input
                          type="checkbox"
                          name="smsNotifications"
                          checked={formData.smsNotifications}
                          onChange={handleInputChange}
                        />
                        <span className="edit-toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="edit-profile-section">
              <div className="edit-section-header">
                <Palette size={20} />
                <h3>Application Preferences</h3>
              </div>
              
              <div className="edit-form-grid">
                <div className="edit-form-group">
                  <label>Language</label>
                  <div className="edit-input-wrapper">
                    <Languages size={18} />
                    <select name="language" value={formData.language} onChange={handleInputChange}>
                      <option value="English (US)">English (US)</option>
                      <option value="English (UK)">English (UK)</option>
                      <option value="Spanish">Español</option>
                      <option value="French">Français</option>
                      <option value="German">Deutsch</option>
                      <option value="Italian">Italiano</option>
                      <option value="Portuguese">Português</option>
                      <option value="Russian">Русский</option>
                      <option value="Chinese">中文</option>
                      <option value="Japanese">日本語</option>
                    </select>
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Timezone</label>
                  <div className="edit-input-wrapper">
                    <Clock size={18} />
                    <select name="timezone" value={formData.timezone} onChange={handleInputChange}>
                      <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                      <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                      <option value="Central Time (CT)">Central Time (CT)</option>
                      <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                      <option value="UTC">UTC</option>
                      <option value="GMT">GMT</option>
                      <option value="IST">Indian Standard Time (IST)</option>
                      <option value="JST">Japan Standard Time (JST)</option>
                    </select>
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Date Format</label>
                  <div className="edit-input-wrapper">
                    <Calendar size={18} />
                    <select name="dateFormat" value={formData.dateFormat} onChange={handleInputChange}>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      <option value="DD-MMM-YYYY">DD-MMM-YYYY</option>
                    </select>
                  </div>
                </div>

                <div className="edit-form-group">
                  <label>Time Format</label>
                  <div className="edit-input-wrapper">
                    <Clock size={18} />
                    <select name="timeFormat" value={formData.timeFormat} onChange={handleInputChange}>
                      <option value="12-hour">12-hour (AM/PM)</option>
                      <option value="24-hour">24-hour</option>
                    </select>
                  </div>
                </div>

                <div className="edit-form-group full-width">
                  <label>Theme Preference</label>
                  <div className="edit-theme-options">
                    <button
                      className={`edit-theme-btn ${formData.theme === 'light' ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, theme: 'light' }))}
                    >
                      <Sun size={20} />
                      <span>Light</span>
                    </button>
                    <button
                      className={`edit-theme-btn ${formData.theme === 'dark' ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, theme: 'dark' }))}
                    >
                      <Moon size={20} />
                      <span>Dark</span>
                    </button>
                    <button
                      className={`edit-theme-btn ${formData.theme === 'auto' ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, theme: 'auto' }))}
                    >
                      <Palette size={20} />
                      <span>Auto</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="edit-profile-footer">
          <button className="edit-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="edit-btn-save" onClick={handleSave}>
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
