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

interface EstimateFormData {
  customer: string;
  billTo: string;
  shipTo: string;
  currency: string;
  estimateNumber: string;
  estimateDate: string;
  expiryDate: string;
  saleAgent: string;
  discountType: string;
  reference: string;
  adminNotes: string;
  status: string;
  tags: string[];
  items: ItemRow[];
  discount: number;
  adjustment: number;
}

const EstimateForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<EstimateFormData>({
    customer: '',
    billTo: '',
    shipTo: '',
    currency: 'USD $',
    estimateNumber: 'EST-000003',
    estimateDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    saleAgent: 'Zedunix ERP Admin',
    discountType: 'No discount',
    reference: '',
    adminNotes: '',
    status: 'Draft',
    tags: [],
    items: [{
      id: '1',
      item: '',
      description: '',
      longDescription: '',
      qty: 1,
      rate: 0,
      tax: 'No Tax',
      amount: 0
    }],
    discount: 0,
    adjustment: 0
  });

  const [tagInput, setTagInput] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressType, setAddressType] = useState<'billTo' | 'shipTo'>('billTo');
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        handleInputChange('tags', [...formData.tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleOpenAddressModal = (type: 'billTo' | 'shipTo') => {
    setAddressType(type);
    const currentAddress = type === 'billTo' ? formData.billTo : formData.shipTo;
    if (currentAddress) {
      const lines = currentAddress.split('\n');
      setAddressData({
        street: lines[0] || '',
        city: lines[1]?.split(',')[0]?.trim() || '',
        state: lines[1]?.split(',')[1]?.trim() || '',
        zipCode: lines[2]?.split(',')[0]?.trim() || '',
        country: lines[2]?.split(',')[1]?.trim() || ''
      });
    } else {
      setAddressData({ street: '', city: '', state: '', zipCode: '', country: '' });
    }
    setShowAddressModal(true);
  };

  const handleSaveAddress = () => {
    const formattedAddress = `${addressData.street}\n${addressData.city}, ${addressData.state}\n${addressData.zipCode}, ${addressData.country}`;
    handleInputChange(addressType, formattedAddress);
    setShowAddressModal(false);
  };

  const handleInputChange = (field: keyof EstimateFormData, value: any) => {
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

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      subTotal: calculateSubTotal(),
      total: calculateTotal()
    };
    console.log('Submitting estimate:', payload);
    navigate('/sales/estimates');
  };

  return (
    <div className="dashboard-layout">
      <div className="page-container">
        <div className="page-header">
          <div className="page-header-left">
            <button className="btn-icon" onClick={() => navigate('/sales/estimates')}>
              <ArrowLeft size={20} />
            </button>
            <h2 className="page-title">{isEditMode ? 'Edit Estimate' : 'Create New Estimate'}</h2>
          </div>
          <div className="page-header-right">
            <button className="btn-primary" onClick={handleSubmit}>
              <Save size={18} />
              Save
            </button>
          </div>
        </div>

        <div className="form-box">
        <div className="form-grid-modern">
          {/* Left Column */}
          <div className="form-section-left">
            <div className="form-group">
              <label className="required">Customer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Select and begin typing"
                value={formData.customer}
                onChange={(e) => handleInputChange('customer', e.target.value)}
              />
            </div>

            <div className="form-row-split">
              <div className="form-group-half">
                <label>
                  <button 
                    type="button" 
                    className="address-edit-btn"
                    onClick={() => handleOpenAddressModal('billTo')}
                    title="Edit Bill To Address"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  Bill To
                </label>
                <div className="static-text">
                  {formData.billTo ? (
                    formData.billTo.split('\n').map((line, i) => <p key={i}>{line}</p>)
                  ) : (
                    <>
                      <p>--</p>
                      <p>--, --</p>
                      <p>--, --</p>
                    </>
                  )}
                </div>
              </div>
              <div className="form-group-half">
                <label>
                  <button 
                    type="button" 
                    className="address-edit-btn"
                    onClick={() => handleOpenAddressModal('shipTo')}
                    title="Edit Ship To Address"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  Ship to
                </label>
                <div className="static-text">
                  {formData.shipTo ? (
                    formData.shipTo.split('\n').map((line, i) => <p key={i}>{line}</p>)
                  ) : (
                    <>
                      <p>--</p>
                      <p>--, --</p>
                      <p>--, --</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ width: '200px' }}>
                <label className="required">Estimate Number</label>
                <div className="input-group">
                  <span className="input-group-text">EST-</span>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.estimateNumber.replace('EST-', '')}
                    onChange={(e) => handleInputChange('estimateNumber', 'EST-' + e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="required">Estimate Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.estimateDate}
                  onChange={(e) => handleInputChange('estimateDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="form-section-right">
            <div className="form-group">
              <label>Tags</label>
              <div className="tags-input-container">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag-chip">
                    {tag}
                    <button
                      type="button"
                      className="tag-remove"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="form-control tags-input"
                  placeholder={formData.tags.length === 0 ? "Tag" : ""}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
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
                <label>Status</label>
                <select
                  className="form-control"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Declined">Declined</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Reference #</label>
              <input
                type="text"
                className="form-control"
                value={formData.reference}
                onChange={(e) => handleInputChange('reference', e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Sale Agent</label>
                <select
                  className="form-control"
                  value={formData.saleAgent}
                  onChange={(e) => handleInputChange('saleAgent', e.target.value)}
                >
                  <option value="">Zedunix ERP Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Discount type</label>
                <select
                  className="form-control"
                  value={formData.discountType}
                  onChange={(e) => handleInputChange('discountType', e.target.value)}
                >
                  <option value="No discount">No discount</option>
                  <option value="%">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Admin Note</label>
              <textarea
                className="form-control"
                rows={4}
                value={formData.adminNotes}
                onChange={(e) => handleInputChange('adminNotes', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <ItemsTable
            items={formData.items}
            onItemsChange={(items) => handleInputChange('items', items)}
          />
        </div>

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
              <select className="discount-type-select">
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

    {/* Address Modal */}
    {showAddressModal && (
        <div className="modal-overlay" onClick={() => setShowAddressModal(false)}>
        <div className="address-modal" onClick={(e) => e.stopPropagation()}>
          <h3>{addressType === 'billTo' ? 'Bill To' : 'Ship To'} Address</h3>
          
          <div className="modal-form">
            <div className="form-group">
              <label>Street</label>
              <textarea
                className="form-control"
                rows={3}
                value={addressData.street}
                onChange={(e) => setAddressData({...addressData, street: e.target.value})}
                placeholder="Enter street address"
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={addressData.city}
                onChange={(e) => setAddressData({...addressData, city: e.target.value})}
                placeholder="Enter city"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                className="form-control"
                value={addressData.state}
                onChange={(e) => setAddressData({...addressData, state: e.target.value})}
                placeholder="Enter state"
              />
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                className="form-control"
                value={addressData.zipCode}
                onChange={(e) => setAddressData({...addressData, zipCode: e.target.value})}
                placeholder="Enter zip code"
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <select
                className="form-control"
                value={addressData.country}
                onChange={(e) => setAddressData({...addressData, country: e.target.value})}
              >
                <option value="">Non selected</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setShowAddressModal(false)}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn-primary"
              onClick={handleSaveAddress}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default EstimateForm;
