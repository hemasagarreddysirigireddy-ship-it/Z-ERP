import { useState } from 'react';
import { 
  Building2, CreditCard, TrendingUp, TrendingDown, FileText, 
  Users, Receipt, Clock, Settings, ChevronDown, ChevronRight,
  Search, Star, BarChart3, AlertCircle
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
        { id: 'reconciliation', label: 'Bank Reconciliation', icon: <BarChart3 size={18} />, description: 'Match transactions & resolve differences' },
        { id: 'cheque-management', label: 'Cheque Management', icon: <FileText size={18} />, description: 'Track cheques pending, cleared, bounced', badge: 3 },
        { id: 'cash-entries', label: 'Cash & Bank Entries', icon: <Receipt size={18} />, description: 'Record cash deposits & withdrawals' }
      ]
    },
    {
      id: 'income-expense',
      label: 'Income & Expense',
      icon: <TrendingUp size={20} />,
      description: 'Track income sources & manage expenses',
      subItems: [
        { id: 'income', label: 'Income', icon: <TrendingUp size={18} />, description: 'Record all revenue & income' },
        { id: 'expenses', label: 'Expenses', icon: <TrendingDown size={18} />, description: 'Manage bills & payments' },
        { id: 'recurring-expenses', label: 'Recurring Expenses', icon: <Clock size={18} />, description: 'Setup automatic recurring bills', badge: 5 },
        { id: 'expense-allocation', label: 'Expense Allocation', icon: <BarChart3 size={18} />, description: 'Allocate costs to projects/departments' }
      ]
    },
    {
      id: 'receivables',
      label: 'Receivables',
      icon: <Users size={20} />,
      description: 'Manage customer payments & outstanding amounts',
      badge: 12,
      subItems: [
        { id: 'customer-ledger', label: 'Customer Ledger', icon: <FileText size={18} />, description: 'View customer account statements' },
        { id: 'outstanding', label: 'Outstanding Receivables', icon: <AlertCircle size={18} />, description: 'Track overdue payments', badge: 12 },
        { id: 'payment-receipts', label: 'Payment Receipts', icon: <Receipt size={18} />, description: 'Generate & manage receipts' },
        { id: 'ageing-receivables', label: 'Ageing Report', icon: <BarChart3 size={18} />, description: 'Age-wise outstanding analysis' },
        { id: 'due-alerts', label: 'Due Date Alerts', icon: <Clock size={18} />, description: 'Configure payment reminders' }
      ]
    },
    {
      id: 'payables',
      label: 'Payables',
      icon: <FileText size={20} />,
      description: 'Vendor bills & payment management',
      subItems: [
        { id: 'vendor-bills', label: 'Vendor Bills', icon: <FileText size={18} />, description: 'Manage vendor invoices' },
        { id: 'vendor-payments', label: 'Vendor Payments', icon: <CreditCard size={18} />, description: 'Process vendor payments' },
        { id: 'vendor-ledger', label: 'Vendor Ledger', icon: <Users size={18} />, description: 'View vendor account history' },
        { id: 'pending-payments', label: 'Pending Payments', icon: <Clock size={18} />, description: 'Review awaiting payments', badge: 7 },
        { id: 'ageing-payables', label: 'Ageing Report', icon: <BarChart3 size={18} />, description: 'Age-wise payables analysis' },
        { id: 'approval-workflow', label: 'Approval Workflow', icon: <AlertCircle size={18} />, description: 'Manage payment approvals', badge: 4 }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <BarChart3 size={20} />,
      description: 'Financial reports & analytics',
      subItems: [
        { id: 'pl-report', label: 'Profit & Loss', icon: <TrendingUp size={18} />, description: 'Income & expense summary' },
        { id: 'balance-sheet', label: 'Balance Sheet', icon: <FileText size={18} />, description: 'Assets, liabilities & equity' },
        { id: 'cash-flow', label: 'Cash Flow', icon: <TrendingDown size={18} />, description: 'Cash in & out analysis' },
        { id: 'trial-balance', label: 'Trial Balance', icon: <BarChart3 size={18} />, description: 'Debit & credit summary' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      description: 'Configure accounts module',
      subItems: [
        { id: 'income-categories', label: 'Income Categories', icon: <TrendingUp size={18} />, description: 'Manage income types' },
        { id: 'expense-categories', label: 'Expense Categories', icon: <TrendingDown size={18} />, description: 'Manage expense types' },
        { id: 'bank-config', label: 'Bank Configuration', icon: <Building2 size={18} />, description: 'Setup bank integrations' },
        { id: 'reminder-templates', label: 'Reminder Templates', icon: <Clock size={18} />, description: 'Customize notification messages' },
        { id: 'automation-rules', label: 'Automation Rules', icon: <Settings size={18} />, description: 'Setup automated workflows' }
      ]
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
