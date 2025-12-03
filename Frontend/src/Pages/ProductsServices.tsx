import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Package, Briefcase, DollarSign, Tag, Grid, Plus, Filter, Search, Edit } from 'lucide-react';
import '../styles/Dashboard.css';

const ProductsServices = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  // Products Data
  const productsData = [
    {
      productId: 'PRD-001',
      name: 'ERP Software Suite',
      category: 'Software',
      description: 'Complete ERP solution for businesses',
      price: '₹2,50,000',
      unit: 'License',
      stock: 'Unlimited',
      status: 'active'
    },
    {
      productId: 'PRD-002',
      name: 'Cloud Storage Package',
      category: 'Cloud Services',
      description: '1TB cloud storage with backup',
      price: '₹15,000',
      unit: 'Per Year',
      stock: 'Unlimited',
      status: 'active'
    },
    {
      productId: 'PRD-003',
      name: 'Hardware Infrastructure',
      category: 'Hardware',
      description: 'Server setup and configuration',
      price: '₹3,50,000',
      unit: 'Per Setup',
      stock: '5',
      status: 'active'
    },
    {
      productId: 'PRD-004',
      name: 'Security Suite',
      category: 'Software',
      description: 'Comprehensive security solution',
      price: '₹75,000',
      unit: 'Per Year',
      stock: 'Unlimited',
      status: 'active'
    },
  ];

  // Services Data
  const servicesData = [
    {
      serviceId: 'SRV-001',
      name: 'Software Development',
      category: 'Development',
      description: 'Custom software development services',
      pricing: '₹1,50,000',
      billingType: 'Per Project',
      duration: '3-6 months',
      status: 'active'
    },
    {
      serviceId: 'SRV-002',
      name: 'Consulting Services',
      category: 'Consulting',
      description: 'Business and technical consulting',
      pricing: '₹50,000',
      billingType: 'Monthly',
      duration: 'Ongoing',
      status: 'active'
    },
    {
      serviceId: 'SRV-003',
      name: 'Maintenance & Support',
      category: 'Support',
      description: '24/7 technical support and maintenance',
      pricing: '₹25,000',
      billingType: 'Monthly',
      duration: 'Annual Contract',
      status: 'active'
    },
    {
      serviceId: 'SRV-004',
      name: 'Training Programs',
      category: 'Training',
      description: 'Employee training and workshops',
      pricing: '₹30,000',
      billingType: 'Per Session',
      duration: '2-3 days',
      status: 'active'
    },
  ];

  // Pricing Plans Data
  const pricingData = [
    {
      planName: 'Basic Plan',
      category: 'ERP Software',
      features: ['Up to 10 Users', 'Basic Modules', 'Email Support'],
      price: '₹25,000',
      billingCycle: 'Monthly',
      discount: '10% Annual',
      status: 'active'
    },
    {
      planName: 'Professional Plan',
      category: 'ERP Software',
      features: ['Up to 50 Users', 'All Modules', 'Priority Support', 'Custom Reports'],
      price: '₹75,000',
      billingCycle: 'Monthly',
      discount: '15% Annual',
      status: 'active'
    },
    {
      planName: 'Enterprise Plan',
      category: 'ERP Software',
      features: ['Unlimited Users', 'All Modules', '24/7 Support', 'Custom Development', 'Dedicated Manager'],
      price: '₹1,50,000',
      billingCycle: 'Monthly',
      discount: '20% Annual',
      status: 'active'
    },
  ];

  // Stats
  const stats = [
    { 
      title: 'Total Products', 
      value: '42', 
      change: '+6 this month', 
      icon: <Package size={24} />,
      color: 'primary'
    },
    { 
      title: 'Active Services', 
      value: '18', 
      change: '+3 new', 
      icon: <Briefcase size={24} />,
      color: 'info'
    },
    { 
      title: 'Total Revenue', 
      value: '₹85.5L', 
      change: '+22.3%', 
      icon: <DollarSign size={24} />,
      color: 'success'
    },
    { 
      title: 'Pricing Plans', 
      value: '12', 
      change: '3 packages', 
      icon: <Tag size={24} />,
      color: 'warning'
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="page-content">
          <div className="page-header">
            <div>
              <h1>Products & Services</h1>
              <p>Product Catalog & Service Management</p>
            </div>
            <div className="page-header-right">
              <button className="btn btn-secondary">
                <Filter size={18} />
                Filter
              </button>
              <button className="btn btn-primary">
                <Plus size={18} />
                Add Product/Service
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
                className={activeTab === 'products' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('products')}
              >
                <Package size={18} />
                Product List
              </button>
              <button 
                className={activeTab === 'services' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('services')}
              >
                <Briefcase size={18} />
                Service Catalog
              </button>
              <button 
                className={activeTab === 'pricing' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('pricing')}
              >
                <Tag size={18} />
                Pricing Plans
              </button>
            </div>

            <div className="tab-content">
              {/* Products Tab */}
              {activeTab === 'products' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Product Catalog</h3>
                    <div className="header-actions">
                      <div className="search-bar" style={{ marginRight: '1rem' }}>
                        <Search size={18} />
                        <input type="text" placeholder="Search products..." />
                      </div>
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add Product
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Product ID</th>
                          <th>Product Name</th>
                          <th>Category</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Unit</th>
                          <th>Stock</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsData.map((product) => (
                          <tr key={product.productId}>
                            <td><span className="invoice-id">{product.productId}</span></td>
                            <td className="client-cell">{product.name}</td>
                            <td>
                              <span className="badge badge-info">{product.category}</span>
                            </td>
                            <td className="reason-cell">{product.description}</td>
                            <td className="amount-cell positive">{product.price}</td>
                            <td>{product.unit}</td>
                            <td className="days-cell">{product.stock}</td>
                            <td>
                              <span className="badge badge-success">{product.status}</span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="Edit">
                                  <Edit size={16} />
                                </button>
                                <button className="btn-reject" title="View Details">
                                  <Grid size={16} />
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

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Service Catalog</h3>
                    <div className="header-actions">
                      <div className="search-bar" style={{ marginRight: '1rem' }}>
                        <Search size={18} />
                        <input type="text" placeholder="Search services..." />
                      </div>
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add Service
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Service ID</th>
                          <th>Service Name</th>
                          <th>Category</th>
                          <th>Description</th>
                          <th>Pricing</th>
                          <th>Billing Type</th>
                          <th>Duration</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {servicesData.map((service) => (
                          <tr key={service.serviceId}>
                            <td><span className="invoice-id">{service.serviceId}</span></td>
                            <td className="client-cell">{service.name}</td>
                            <td>
                              <span className="badge badge-info">{service.category}</span>
                            </td>
                            <td className="reason-cell">{service.description}</td>
                            <td className="amount-cell positive">{service.pricing}</td>
                            <td>{service.billingType}</td>
                            <td>{service.duration}</td>
                            <td>
                              <span className="badge badge-success">{service.status}</span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="Edit">
                                  <Edit size={16} />
                                </button>
                                <button className="btn-reject" title="View Details">
                                  <Briefcase size={16} />
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

              {/* Pricing Plans Tab */}
              {activeTab === 'pricing' && (
                <div>
                  <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Pricing Plans</h3>
                    <button className="btn btn-primary">
                      <Plus size={18} />
                      Create Plan
                    </button>
                  </div>
                  <div className="documents-grid">
                    {pricingData.map((plan, index) => (
                      <div key={index} className="document-category-card">
                        <div className={`category-icon gradient-bg-${(index % 4) + 1}`}>
                          <Tag size={40} />
                        </div>
                        <h3>{plan.planName}</h3>
                        <p style={{ color: '#64748b', marginBottom: '1rem' }}>{plan.category}</p>
                        <div className="amount-cell positive" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                          {plan.price}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
                          {plan.billingCycle}
                        </div>
                        <div style={{ 
                          background: 'rgba(0, 217, 126, 0.1)', 
                          color: '#00d97e', 
                          padding: '0.5rem', 
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          marginBottom: '1rem'
                        }}>
                          Save {plan.discount}
                        </div>
                        <div style={{ 
                          textAlign: 'left', 
                          marginBottom: '1rem',
                          padding: '1rem',
                          background: 'rgba(100, 116, 139, 0.05)',
                          borderRadius: '8px'
                        }}>
                          {plan.features.map((feature, idx) => (
                            <div key={idx} style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.5rem',
                              marginBottom: '0.5rem',
                              fontSize: '0.875rem'
                            }}>
                              <span style={{ color: '#00d97e' }}>✓</span>
                              {feature}
                            </div>
                          ))}
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%' }}>
                          Select Plan
                        </button>
                      </div>
                    ))}
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

export default ProductsServices;
