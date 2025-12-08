import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Building2, CheckCircle } from 'lucide-react';
import '../styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate authentication (replace with actual API call)
    setTimeout(() => {
      if (email && password) {
        // For demo purposes, accept any email/password
        // In production, validate against backend
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/');
      } else {
        setError('Please enter both email and password');
        setLoading(false);
      }
    }, 1000);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess(false);
    setResetLoading(true);

    // Simulate password reset email (replace with actual API call)
    setTimeout(() => {
      if (resetEmail && resetEmail.includes('@')) {
        setResetSuccess(true);
        setResetLoading(false);
        // Auto close after 3 seconds
        setTimeout(() => {
          setShowForgotPassword(false);
          setResetEmail('');
          setResetSuccess(false);
        }, 3000);
      } else {
        setResetError('Please enter a valid email address');
        setResetLoading(false);
      }
    }, 1500);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
    setResetEmail('');
    setResetError('');
    setResetSuccess(false);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-branding">
          <div className="brand-logo">
            <Building2 size={48} />
          </div>
          <h1 className="brand-title">Z-ERP</h1>
          <p className="brand-subtitle">Enterprise Resource Planning System</p>
        </div>
        
        <div className="login-features">
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">
              <h3>Complete Business Management</h3>
              <p>Manage projects, HR, sales, accounts & more</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">
              <h3>Real-time Analytics</h3>
              <p>Track performance with powerful dashboards</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <div className="feature-text">
              <h3>Secure & Reliable</h3>
              <p>Enterprise-grade security & data protection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={20} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                {!showPassword && <Lock size={20} className="input-icon" />}
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: showPassword ? '16px' : '48px' }}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button 
                type="button"
                className="forgot-password"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot password?
              </button>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>


        </div>

        <div className="login-info">
          <p>© 2025 Z-ERP. All rights reserved.</p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal-overlay" onClick={closeForgotPasswordModal}>
          <div className="forgot-password-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reset Password</h3>
              <button className="modal-close" onClick={closeForgotPasswordModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              {!resetSuccess ? (
                <>
                  <p className="modal-description">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>

                  {resetError && (
                    <div className="error-message">
                      <AlertCircle size={18} />
                      <span>{resetError}</span>
                    </div>
                  )}

                  <form onSubmit={handleForgotPassword}>
                    <div className="form-group">
                      <label htmlFor="reset-email">Email Address</label>
                      <div className="input-wrapper">
                        <Mail size={20} className="input-icon" />
                        <input
                          id="reset-email"
                          type="email"
                          placeholder="Enter your email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="modal-actions">
                      <button 
                        type="button" 
                        className="btn-cancel"
                        onClick={closeForgotPasswordModal}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn-submit"
                        disabled={resetLoading}
                      >
                        {resetLoading ? 'Sending...' : 'Send Reset Link'}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="success-message">
                  <div className="success-icon">
                    <CheckCircle size={48} />
                  </div>
                  <h4>Email Sent!</h4>
                  <p>
                    We've sent a password reset link to <strong>{resetEmail}</strong>.
                    Please check your inbox and follow the instructions.
                  </p>
                  <button 
                    className="btn-submit"
                    onClick={closeForgotPasswordModal}
                  >
                    Got it
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
