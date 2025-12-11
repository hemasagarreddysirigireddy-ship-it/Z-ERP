import { useState } from 'react';
import { 
  Building2, CreditCard, TrendingUp, TrendingDown, FileText, 
  Users, Receipt, Clock, Settings, ChevronDown, ChevronRight,
  Search, Star, BarChart3, AlertCircle, RefreshCw, CheckCircle,
  Repeat, DollarSign, Bell, Download, Split, Globe, Shield
} from 'lucide-react';
import './AccountsSidebar.css';

interface SidebarSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  badge?: number;
  subItems: SubItem[];
}

interface SubItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  badge?: number;
}

interface AccountsSidebarProps {
  activeSection: string;
  activeSubItem: string;
  onNavigate: (section: string, subItem: string) => void;
}

const AccountsSidebar: React.FC<AccountsSidebarProps> = ({ activeSection, activeSubItem, onNavigate }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['banking']);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const sections: SidebarSection[] = [
    {
      id: 'banking',
      label: 'Banking',
      icon: <Building2 size={20} />,
      description: 'Bank accounts, reconciliation, cheques, cash entries',
      subItems: [
        { id: 'bank-accounts', label: 'Bank Accounts', icon: <CreditCard size={18} />, description: 'View balances & linked statements' },
        { id: 'transactions', label: 'Transactions', icon: <Receipt size={18} />, description: 'View all transactions' },
        { id: 'reconciliation', label: 'Bank Reconciliation', icon: <RefreshCw size={18} />, description: 'Match transactions & resolve differences' },
        { id: 'cheque-management', label: 'Cheque Management', icon: <FileText size={18} />, description: 'Track cheques pending, cleared, bounced', badge: 3 },
        { id: 'cash-management', label: 'Cash & Petty Cash', icon: <DollarSign size={18} />, description: 'Manage cash & petty cash entries' },
        { id: 'bank-feeds', label: 'Bank Feeds & Import', icon: <Download size={18} />, description: 'Auto-import from bank APIs' },
        { id: 'bank-statements', label: 'Generate Statements', icon: <FileText size={18} />, description: 'Create & export statements' }
      ]
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: <Repeat size={20} />,
      description: 'Transaction management & automation',
      subItems: [
        { id: 'recurring-transactions', label: 'Recurring Transactions', icon: <Repeat size={18} />, description: 'Setup automatic recurring payments', badge: 8 },
        { id: 'split-transactions', label: 'Split Transactions', icon: <Split size={18} />, description: 'Split across categories/projects' },
        { id: 'transaction-approval', label: 'Approval Workflow', icon: <CheckCircle size={18} />, description: 'Multi-level transaction approvals', badge: 5 },
        { id: 'multi-currency', label: 'Multi-Currency', icon: <Globe size={18} />, description: 'Manage forex accounts & rates' }
      ]
    },
    {
      id: 'income-expense',
      label: 'Income & Expense',
      icon: <TrendingUp size={20} />,
      description: 'Track income sources & manage expenses',
      subItems: [
        { id: 'income', label: 'Income', icon: <TrendingUp size={18} />, description: 'Record all revenue & income' },
        { id: 'expenses', label: 'Expenses', icon: <TrendingDown size={18} />, description: 'Manage bills & payments' }
      ]
    },
    {
      id: 'receivables',
      label: 'Receivables',
      icon: <Users size={20} />,
      description: 'Manage customer payments & outstanding amounts',
      badge: 12,
      path: '/accounts/receivables',
      subItems: []
    },
    {
      id: 'payables',
      label: 'Payables',
      icon: <FileText size={20} />,
      description: 'Vendor bills & payment management',
      path: '/accounts/payables',
      subItems: []
    },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      icon: <BarChart3 size={20} />,
      description: 'Financial analytics & insights',
      path: '/accounts/reports',
      subItems: [
        { id: 'banking-analytics', label: 'Banking Analytics', icon: <BarChart3 size={18} />, description: 'Cash flow & trends analysis', path: '/accounts/banking-analytics' },
        { id: 'balance-sheet', label: 'Balance Sheet', icon: <FileText size={18} />, description: 'Assets, liabilities & equity', path: '/accounts/balancesheet' },
      ]
    },
    {
      id: 'system',
      label: 'System & Security',
      icon: <Shield size={20} />,
      description: 'Alerts, notifications & audit',
      subItems: [
        { id: 'alerts-notifications', label: 'Alerts & Notifications', icon: <Bell size={18} />, description: 'Manage alerts & reminders', badge: 15 },
        { id: 'audit-trail', label: 'Audit Trail', icon: <Shield size={18} />, description: 'Transaction history & logs' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      description: 'Configure accounts module',
      path: '/accounts/settings',
      subItems: []
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="accounts-sidebar">
      <div className="accounts-sidebar-header">
        <h3>Accounts</h3>
        <p>Financial Management</p>
      </div>

      <div className="accounts-sidebar-sections">
        {sections.map(section => {
          const isExpanded = expandedSections.includes(section.id);
          const isActive = activeSection === section.id;

          return (
            <div key={section.id} className="sidebar-section">
              <div
                className={`section-header ${isActive ? 'active' : ''}`}
                onClick={() => toggleSection(section.id)}
                onMouseEnter={() => setHoveredItem(section.id)}
                onMouseLeave={() => setHoveredItem(null)}
                data-tooltip={section.description}
              >
                <div className="section-header-left">
                  <span className="section-icon">{section.icon}</span>
                  <span className="section-label">{section.label}</span>
                  {section.badge && (
                    <span className="section-badge">{section.badge}</span>
                  )}
                </div>
                <div className="section-header-right">
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
              </div>

              {isExpanded && (
                <div className="section-subitems">
                  {section.subItems.map(subItem => {
                    const isSubActive = activeSubItem === subItem.id;
                    const isSubHovered = hoveredItem === `${section.id}-${subItem.id}`;

                    return (
                      <div
                        key={subItem.id}
                        className={`subitem ${isSubActive ? 'active' : ''}`}
                        onClick={() => onNavigate(section.id, subItem.id)}
                        onMouseEnter={() => setHoveredItem(`${section.id}-${subItem.id}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                        data-tooltip={subItem.description}
                      >
                        <div className="subitem-left">
                          <span className={`subitem-icon ${isSubHovered ? 'filled' : ''}`}>
                            {subItem.icon}
                          </span>
                          <span className="subitem-label">{subItem.label}</span>
                          {subItem.badge && (
                            <span className="subitem-badge">{subItem.badge}</span>
                          )}
                        </div>
                        {isSubHovered && (
                          <div className="subitem-actions">
                            <button className="subitem-action" title="Quick search">
                              <Search size={14} />
                            </button>
                            <button className="subitem-action" title="Add to favorites">
                              <Star size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountsSidebar;
