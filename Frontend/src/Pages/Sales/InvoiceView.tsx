import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Send, Download, DollarSign, MoreVertical, Mail, Clock } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

const InvoiceView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('invoice');

  // Mock invoice data
  const invoice = {
    invoiceNumber: 'INV-000014',
    status: 'Unpaid',
    billTo: 'Jack',
    invoiceDate: '2025-10-22',
    dueDate: '2025-11-21',
    saleAgent: 'Zedunix ERP Admin',
    items: [
      {
        id: '1',
        item: 'Skin Care',
        description: 'Skin Care',
        qty: 1,
        rate: 1000.00,
        tax: '0%',
        amount: 1000.00
      }
    ],
    subTotal: 1000.00,
    total: 1000.00,
    amountDue: 1000.00
  };

  // Mock related invoices for merging
  const relatedInvoices = [
    { number: 'INV-000004', amount: 1000.00, status: 'Unpaid' },
    { number: 'INV-000007', amount: 1000.00, status: 'Unpaid' },
    { number: 'INV-000008', amount: 1000.00, status: 'Unpaid' },
    { number: 'INV-000007', amount: 250.00, status: 'Unpaid' }
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <button className="btn-icon" onClick={() => navigate('/sales/invoices')}>
            <ArrowLeft size={20} />
          </button>
          <h2 className="page-title">Invoice Details</h2>
        </div>
        <div className="page-header-right">
          <button className="btn-secondary" onClick={() => navigate(`/sales/invoices/edit/${id}`)}>
            <Edit size={18} />
            Edit
          </button>
          <button className="btn-secondary">
            <Download size={18} />
            Download
          </button>
          <button className="btn-secondary">
            <Send size={18} />
            Send
          </button>
          <button className="btn-secondary">
            <MoreVertical size={18} />
            More
          </button>
          <button className="btn-success">
            <DollarSign size={18} />
            Payment
          </button>
        </div>
      </div>

      <div className="invoice-layout">
        {/* Related Invoices Sidebar */}
        <div className="invoice-sidebar">
          <h3>Invoices Available for Merging</h3>
          <div className="related-invoices-list">
            {relatedInvoices.map((inv, idx) => (
              <div key={idx} className="related-invoice-item">
                <a href="#" className="link-primary">{inv.number}</a>
                <span className="amount">${inv.amount.toLocaleString()}</span>
                <StatusBadge status={inv.status} type="invoice" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Invoice Content */}
        <div className="invoice-content">
          {/* Tabs */}
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'invoice' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('invoice')}
            >
              Invoice
            </button>
            <button 
              className={`tab ${activeTab === 'tasks' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
            <button 
              className={`tab ${activeTab === 'activity' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Activity Log
            </button>
            <button 
              className={`tab ${activeTab === 'reminders' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('reminders')}
            >
              Reminders
            </button>
            <button 
              className={`tab ${activeTab === 'notes' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
          </div>

          {/* Invoice Tab Content */}
          {activeTab === 'invoice' && (
            <div className="invoice-details">
              <div className="invoice-status-badge">
                <StatusBadge status={invoice.status} type="invoice" />
              </div>

              <div className="invoice-header-info">
                <h1>{invoice.invoiceNumber}</h1>
                <div className="invoice-meta">
                  <div className="meta-item">
                    <label>Bill To</label>
                    <span>{invoice.billTo}</span>
                  </div>
                  <div className="meta-item">
                    <label>Invoice Date:</label>
                    <span>{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <label>Due Date:</label>
                    <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <label>Sale Agent:</label>
                    <span>{invoice.saleAgent}</span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="invoice-items">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Tax</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, idx) => (
                      <tr key={item.id}>
                        <td>{idx + 1}</td>
                        <td>
                          <div className="item-details">
                            <strong>{item.item}</strong>
                            <small>{item.description}</small>
                          </div>
                        </td>
                        <td>{item.qty}</td>
                        <td>${item.rate.toFixed(2)}</td>
                        <td>{item.tax}</td>
                        <td className="amount-cell">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="invoice-totals">
                <div className="totals-row">
                  <label>Sub Total</label>
                  <span>${invoice.subTotal.toFixed(2)}</span>
                </div>
                <div className="totals-row total">
                  <label>Total</label>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
                <div className="totals-row amount-due">
                  <label>Amount Due</label>
                  <span className="text-danger">${invoice.amountDue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="tab-content">
              <p>No tasks found</p>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="tab-content">
              <p>No activity yet</p>
            </div>
          )}

          {activeTab === 'reminders' && (
            <div className="tab-content">
              <p>No reminders set</p>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="tab-content">
              <p>No notes added</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
