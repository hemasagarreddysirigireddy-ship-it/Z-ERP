import React, { useState } from 'react';
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

const CreditNoteForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    customer: '',
    currency: 'USD $',
    discountType: 'No discount',
    referenceNumber: '',
    adminNote: '',
    creditNoteDate: new Date().toISOString().split('T')[0],
    creditNoteNumber: 'CN-000001',
    billTo: '',
    shipTo: '',
    status: 'Draft',
    saleAgent: 'Zedunix ERP Admin',
    tags: [] as string[],
    items: [{
      id: '1',
      item: '',
      description: '',
      longDescription: '',
      qty: 1,
      rate: 0,
      tax: 'No Tax',
      amount: 0
    }] as ItemRow[],
    discount: 0,
    adjustment: 0
  });

  const handleInputChange = (field: string, value: any) => {
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

  const handleSubmit = (sendEmail: boolean = false) => {
    console.log('Saving credit note:', formData);
    navigate('/sales/credit-notes');
  };

  return (
    <div className="dashboard-layout">
      <div className="page-container">
        <div className="page-header">
          <div className="page-header-left">
            <button className="btn-icon" onClick={() => navigate('/sales/credit-notes')}>
              <ArrowLeft size={20} />
            </button>
            <h2 className="page-title">{isEditMode ? 'Edit Credit Note' : 'New Credit Note'}</h2>
          </div>
          <div className="page-header-right">
            <button className="btn-secondary" onClick={() => handleSubmit(false)}>
              <Save size={18} />
              Save
            </button>
            <button className="btn-primary" onClick={() => handleSubmit(true)}>
              <Send size={18} />
              Save & Send
            </button>
          </div>
        </div>

        <div className="form-box">
        <div className="form-grid-modern">
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
                <label>Bill To</label>
                <div className="static-text">
                  <p>--</p>
                  <p>--, --</p>
                  <p>--, --</p>
                </div>
              </div>
              <div className="form-group-half">
                <label>Ship to</label>
                <div className="static-text">
                  <p>--</p>
                  <p>--, --</p>
                  <p>--, --</p>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ width: '200px' }}>
                <label className="required">Credit Note #</label>
                <div className="input-group">
                  <span className="input-group-text">CN-</span>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.creditNoteNumber.replace('CN-', '')}
                    onChange={(e) => handleInputChange('creditNoteNumber', `CN-${e.target.value}`)}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="required">Credit Note Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.creditNoteDate}
                  onChange={(e) => handleInputChange('creditNoteDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-section-right">
            <div className="form-group">
              <label>Tags</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tag"
                onChange={(e) => {
                  const tags = e.target.value.split(',').map(t => t.trim());
                  handleInputChange('tags', tags);
                }}
              />
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
                  <option value="Closed">Closed</option>
                  <option value="Void">Void</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Reference #</label>
              <input
                type="text"
                className="form-control"
                value={formData.referenceNumber}
                onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
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
                value={formData.adminNote}
                onChange={(e) => handleInputChange('adminNote', e.target.value)}
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
              <select
                className="discount-type-select"
                value={formData.discountType === 'No discount' ? '%' : formData.discountType}
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
  );
};

export default CreditNoteForm;
