import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Send } from 'lucide-react';
import ItemsTable from '../../components/ItemsTable';
import '../../styles/SalesForm.css';

interface ItemRow {
  id: string;
  item: string;
  description: string;
  longDescription: string;
  qty: number;
  rate: number;
  tax: string;
  amount: number;
}

interface ProposalFormData {
  subject: string;
  relatedType: 'lead' | 'customer';
  relatedId: string;
  assignedTo: string;
  status: string;
  toName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  email: string;
  phone: string;
  date: string;
  openTill: string;
  currency: string;
  discountType: string;
  allowComments: boolean;
  tags: string[];
  items: ItemRow[];
  discount: number;
  adjustment: number;
}

const ProposalForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<ProposalFormData>({
    subject: '',
    relatedType: 'customer',
    relatedId: '',
    assignedTo: '',
    status: 'Draft',
    toName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    openTill: '',
    currency: 'USD $',
    discountType: 'No discount',
    allowComments: true,
    tags: [],
    items: [
      {
        id: '1',
        item: '',
        description: '',
        longDescription: '',
        qty: 1,
        rate: 0,
        tax: 'No Tax',
        amount: 0
      }
    ],
    discount: 0,
    adjustment: 0
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      // Fetch proposal data for editing
      fetchProposal(id);
    }
  }, [id]);

  const fetchProposal = async (proposalId: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock data would be loaded here
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (field: keyof ProposalFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateSubTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTotal = () => {
    const subTotal = calculateSubTotal();
    const discountAmount = formData.discountType === '%' 
      ? (subTotal * formData.discount) / 100 
      : formData.discount;
    return subTotal - discountAmount + formData.adjustment;
  };

  const handleSubmit = async (sendEmail: boolean = false) => {
    setLoading(true);
    
    const payload = {
      ...formData,
      subTotal: calculateSubTotal(),
      total: calculateTotal(),
      sendEmail
    };

    console.log('Submitting proposal:', payload);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/sales/proposals');
    }, 1000);
  };

  const handleSaveAndSend = () => {
    handleSubmit(true);
  };

  return (
    <div className="dashboard-layout">
      <div className="page-container">
        <div className="page-header">
          <div className="page-header-left">
            <button className="btn-icon" onClick={() => navigate('/sales/proposals')}>
              <ArrowLeft size={20} />
            </button>
            <h2 className="page-title">{isEditMode ? 'Edit Proposal' : 'Create New Proposal'}</h2>
          </div>
          <div className="page-header-right">
          <button className="btn-secondary" onClick={() => handleSubmit(false)} disabled={loading}>
            <Save size={18} />
            Save
          </button>
          <button className="btn-primary" onClick={handleSaveAndSend} disabled={loading}>
            <Send size={18} />
            Save & Send
          </button>
        </div>
      </div>

        <div className="form-box">
        <div className="form-container">
        <div className="form-grid">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-group">
              <label className="required">Subject</label>
              <input
                type="text"
                className="form-control"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="required">Related</label>
              <select
                className="form-control"
                value={formData.relatedType}
                onChange={(e) => handleInputChange('relatedType', e.target.value as 'lead' | 'customer')}
              >
                <option value="customer">Customer</option>
                <option value="lead">Lead</option>
              </select>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Select and begin typing"
                value={formData.relatedId}
                onChange={(e) => handleInputChange('relatedId', e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Open Till</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.openTill}
                  onChange={(e) => handleInputChange('openTill', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="required">Currency</label>
                <select
                  className="form-control"
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                >
                  <option value="USD $">USD $</option>
                  <option value="EUR €">EUR €</option>
                  <option value="GBP £">GBP £</option>
                  <option value="INR ₹">INR ₹</option>
                </select>
              </div>
              <div className="form-group">
                <label>Discount Type</label>
                <select
                  className="form-control"
                  value={formData.discountType}
                  onChange={(e) => handleInputChange('discountType', e.target.value)}
                >
                  <option value="No discount">No discount</option>
                  <option value="%">Percentage (%)</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Tags</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add tags"
                onChange={(e) => {
                  const tags = e.target.value.split(',').map(t => t.trim());
                  handleInputChange('tags', tags);
                }}
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.allowComments}
                  onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                />
                <span>Allow Comments</span>
              </label>
            </div>
          </div>

          {/* Right Column */}
          <div className="form-column">
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Open">Open</option>
                <option value="Revised">Revised</option>
                <option value="Declined">Declined</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>

            <div className="form-group">
              <label className="required">Assigned</label>
              <select
                className="form-control"
                value={formData.assignedTo}
                onChange={(e) => handleInputChange('assignedTo', e.target.value)}
              >
                <option value="">Select User</option>
                <option value="admin">Zedunix ERP Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label className="required">To</label>
              <input
                type="text"
                className="form-control"
                placeholder="Customer Name"
                value={formData.toName}
                onChange={(e) => handleInputChange('toName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                className="form-control"
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Country</label>
                <select
                  className="form-control"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IN">India</option>
                </select>
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="required">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="form-section">
          <ItemsTable
            items={formData.items}
            onItemsChange={(items) => handleInputChange('items', items)}
          />
        </div>

        {/* Totals Section */}
        <div className="totals-section">
          <div className="totals-row">
            <label>Sub Total:</label>
            <span className="total-value">${calculateSubTotal().toFixed(2)}</span>
          </div>

          <div className="totals-row">
            <label>Discount:</label>
            <div className="discount-input-wrapper">
              <input
                type="number"
                className="form-control-inline"
                value={formData.discount}
                onChange={(e) => handleInputChange('discount', parseFloat(e.target.value) || 0)}
                style={{ width: '100px' }}
              />
              <select
                className="discount-type-select"
                value={formData.discountType}
                onChange={(e) => handleInputChange('discountType', e.target.value)}
              >
                <option value="%">%</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <span className="total-value">${formData.discount.toFixed(2)}</span>
          </div>

          <div className="totals-row">
            <label>
              Adjustment:
              <input
                type="number"
                className="form-control-inline"
                value={formData.adjustment}
                onChange={(e) => handleInputChange('adjustment', parseFloat(e.target.value) || 0)}
                style={{ width: '100px', marginLeft: '10px' }}
              />
            </label>
            <span className="total-value">${formData.adjustment.toFixed(2)}</span>
          </div>

          <div className="totals-row total">
            <label>Total:</label>
            <span className="total-value">${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProposalForm;
