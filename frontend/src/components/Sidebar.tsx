import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  CheckSquare, 
  Users, 
  X,
  ChevronDown,
  ChevronRight,
  Settings,
  HelpCircle,
  Image,
  BarChart3,
  DollarSign,
  UserCheck,
  Briefcase,
  FileSignature,
  Package,
  Building2,
  Clock,
  Receipt,
  CreditCard,
  UserPlus,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Wallet,
  BookOpen,
  Calendar
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  path: string;
  badge?: number | null;
  submenu?: SubMenuItem[] | null;
}

interface SubMenuItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>(() => {
    const saved = localStorage.getItem('expandedMenus');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => {
      // Get all parent menu keys (main folders)
      const parentKeys = menuItems
        .filter(item => item.submenu)
        .map(item => item.label);
      
      // If clicking a parent menu, close all other parents
      if (parentKeys.includes(menuKey)) {
        const newState: {[key: string]: boolean} = {};
        
        // Keep only sub-menu states (non-parent keys)
        Object.keys(prev).forEach(key => {
          if (!parentKeys.includes(key)) {
            newState[key] = prev[key];
          }
        });
        
        // Toggle the clicked parent
        newState[menuKey] = !prev[menuKey];
        
        localStorage.setItem('expandedMenus', JSON.stringify(newState));
        return newState;
      } else {
        // For sub-menus, just toggle normally
        const newState = {
          ...prev,
          [menuKey]: !prev[menuKey]
        };
        localStorage.setItem('expandedMenus', JSON.stringify(newState));
        return newState;
      }
    });
  };

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', badge: null, submenu: null },
    { 
      icon: FolderKanban, 
      label: 'Projects', 
      path: '/projects', 
      badge: null, 
      submenu: null
    },
    { 
      icon: UserCheck, 
      label: 'HRM', 
      path: '/hrm', 
      badge: null, 
      submenu: null
    },
    { 
      icon: TrendingUp, 
      label: 'Sales', 
      path: '/sales', 
      badge: null, 
      submenu: [
        { icon: FileSignature, label: 'Proposals', path: '/sales/proposals' },
        { icon: FileText, label: 'Invoices', path: '/sales/invoices' },
        { icon: Receipt, label: 'Payment Slips', path: '/sales/payments' },
        { icon: CreditCard, label: 'Credit Notes', path: '/sales/credit-notes' }
      ]
    },
    { 
      icon: Wallet, 
      label: 'Accounts', 
      path: '/accounts', 
      badge: null, 
      submenu: [
        { icon: Building2, label: 'Banking', path: '/accounts/banking' },
        { icon: TrendingUp, label: 'Income', path: '/accounts/income' },
        { icon: TrendingDown, label: 'Expenses', path: '/accounts/expenses' },
        { icon: Users, label: 'Receivables', path: '/accounts/receivables' },
        { icon: FileText, label: 'Payables', path: '/accounts/payables' },
        { icon: BarChart3, label: 'Reports', path: '/accounts/reports' },
        { icon: Settings, label: 'Settings', path: '/accounts/settings' }
      ]
    },
    { 
      icon: UserPlus, 
      label: 'Staff Recruitment', 
      path: '/recruitment', 
      badge: null, 
      submenu: [
        { icon: FileText, label: 'Job Descriptions', path: '/recruitment/jobs' },
        { icon: Calendar, label: 'Interview Schedule', path: '/recruitment/interviews' },
        { icon: Users, label: 'AI Profile Matching', path: '/recruitment/ai-matching' }
      ]
    },
    { 
      icon: Users, 
      label: 'Customers', 
      path: '/customers', 
      badge: null, 
      submenu: [
        { icon: UserPlus, label: 'Leads', path: '/customers/leads' },
        { icon: Users, label: 'Customer List', path: '/customers/list' },
        { icon: MessageSquare, label: 'Communication Log', path: '/customers/communication' }
      ]
    },
    { 
      icon: FileSignature, 
      label: 'Contracts', 
      path: '/contracts', 
      badge: null, 
      submenu: [
        { icon: FileText, label: 'Active Contracts', path: '/contracts/active' },
        { icon: Calendar, label: 'Renewals', path: '/contracts/renewals' },
        { icon: Clock, label: 'Expiry Alerts', path: '/contracts/alerts' }
      ]
    },
    { 
      icon: Briefcase, 
      label: 'Vendors', 
      path: '/vendors', 
      badge: null, 
      submenu: [
        { icon: Users, label: 'Vendor List', path: '/vendors/list' },
        { icon: DollarSign, label: 'Vendor Payments', path: '/vendors/payments' },
        { icon: FileText, label: 'Documentation', path: '/vendors/documents' }
      ]
    },
    { 
      icon: Package, 
      label: 'Products & Services', 
      path: '/products', 
      badge: null, 
      submenu: [
        { icon: Package, label: 'Product List', path: '/products/list' },
        { icon: FileText, label: 'Service Catalog', path: '/products/services' },
        { icon: DollarSign, label: 'Pricing', path: '/products/pricing' }
      ]
    },
    { 
      icon: Settings, 
      label: 'Admin Setup', 
      path: '/admin', 
      badge: null, 
      submenu: [
        { icon: Building2, label: 'Company Details', path: '/admin/company' },
        { icon: Settings, label: 'Domain Setup', path: '/admin/domain' },
        { icon: Users, label: 'User Permissions', path: '/admin/permissions' },
        { icon: HelpCircle, label: 'Support', path: '/admin/support' },
        { icon: Image, label: 'Media', path: '/admin/media' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-text-zollid">ZOLLID</span>
            <sup className="logo-registered">®</sup>
            <span className="logo-text-erp">ERP</span>
          </div>
          <button className="sidebar-close" onClick={onToggle}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedMenus[item.label];
            
            // Check if any submenu item is active
            const isSubmenuActive = hasSubmenu && item.submenu!.some(
              (subItem) => location.pathname === subItem.path
            );
            
            return (
              <div key={item.path}>
                {hasSubmenu ? (
                  <>
                    <button
                      className={`nav-item ${isActive || isSubmenuActive ? 'nav-item-active' : ''}`}
                      onClick={() => toggleMenu(item.label)}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                      {item.badge && <span className="nav-badge">{item.badge}</span>}
                      <span className="nav-arrow">
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </span>
                    </button>
                    <div className={`submenu ${isExpanded ? 'submenu-open' : ''}`}>
                      {item.submenu!.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`nav-item nav-subitem ${isSubActive ? 'nav-item-active' : ''}`}
                          >
                            <SubIcon size={16} />
                            <span>{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">AU</div>
            <div className="user-details">
              <div className="user-name">Admin User</div>
              <div className="user-email">admin@zollid.com</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
