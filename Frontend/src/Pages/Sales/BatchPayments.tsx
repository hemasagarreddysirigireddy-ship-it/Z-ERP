import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Save } from 'lucide-react';

interface PaymentRow {
  id: string;
  invoiceNumber: string;
  customer: string;
  paymentDate: string;
  paymentMode: string;
  transactionId: string;
  amountReceived: number;
  invoiceBalance: number;
}

const BatchPayments: React.FC = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [filterCustomer, setFilterCustomer] = useState('');

  useEffect(() => {
    // Fetch unpaid invoices
    fetchUnpaidInvoices();
  }, []);

  const fetchUnpaidInvoices = () => {
    const mockInvoices: PaymentRow[] = [
      {
        id: '1',
        invoiceNumber: 'INV-000014',
        customer: 'Jack',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMode: '',
        transactionId: '',
        amountReceived: 0,
        invoiceBalance: 1000.00
      },
      {
        id: '2',
        invoiceNumber: 'INV-000013',
        customer: 'Sarmad',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMode: '',
        transactionId: '',
        amountReceived: 0,
        invoiceBalance: 3826.00
      },
      {
        id: '3',
        invoiceNumber: 'INV-000012',
        customer: 'Sarmad',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMode: '',
        transactionId: '',
        amountReceived: 0,
        invoiceBalance: 38.26
      },
      {
        id: '4',
        invoiceNumber: 'INV-000011',
        customer: 'Sarmad',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMode: '',
        transactionId: '',
        amountReceived: 0,
        invoiceBalance: 3826.00
      },
      {
        id: '5',
        invoiceNumber: 'INV-000010',
        customer: 'Sarmad',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMode: '',
        transactionId: '',
        amountReceived: 0,
        invoiceBalance: 3826.00
      },
      {
        id: '6',
        invoiceNumber: 'INV-000009',
        customer: 'jack',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMode: '',
        transactionId: '',
        amountReceived: 0,
        invoiceBalance: 1000.00
      },
      {
        id: '7',
        invoiceNumber: 'INV-000009',
        customer: 'Greeen Dot',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMode: '',
        transactionId: '',
        amountReceived: 0,
        invoiceBalance: 100000.00
      }
    ];
    setPayments(mockInvoices);
  };

  const updatePayment = (id: string, field: keyof PaymentRow, value: any) => {
    setPayments(prev => prev.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  const handleSubmit = () => {
    const validPayments = payments.filter(p => p.amountReceived > 0);
    
    if (validPayments.length === 0) {
      alert('Please enter payment amounts');
      return;
    }

    console.log('Submitting batch payments:', validPayments);
    navigate('/sales/invoices');
  };

  const filteredPayments = filterCustomer
    ? payments.filter(p => p.customer.toLowerCase().includes(filterCustomer.toLowerCase()))
    : payments;

  return (
    <div className="modal-overlay">
      <div className="modal-container large">
        <div className="modal-header">
          <h2>Add Payments</h2>
          <button className="icon-btn" onClick={() => navigate('/sales/invoices')}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <select
              className="form-control"
              value={filterCustomer}
              onChange={(e) => setFilterCustomer(e.target.value)}
            >
              <option value="">Filter invoices by customer</option>
              <option value="Jack">Jack</option>
              <option value="Sarmad">Sarmad</option>
              <option value="Greeen Dot">Greeen Dot</option>
            </select>
          </div>

          <div className="batch-payments-table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice Number #</th>
                  <th>Payment Date</th>
                  <th>Payment Mode</th>
                  <th>Transaction Id</th>
                  <th>Amount received</th>
                  <th>Invoice Balance Due</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <a href="#" className="link-primary">{payment.invoiceNumber}</a>
                      <div className="customer-name">{payment.customer}</div>
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control-sm"
                        value={payment.paymentDate}
                        onChange={(e) => updatePayment(payment.id, 'paymentDate', e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control-sm"
                        value={payment.paymentMode}
                        onChange={(e) => updatePayment(payment.id, 'paymentMode', e.target.value)}
                      >
                        <option value="">-</option>
                        <option value="Bank">Bank</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control-sm"
                        value={payment.transactionId}
                        onChange={(e) => updatePayment(payment.id, 'transactionId', e.target.value)}
                        placeholder="-"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control-sm"
                        value={payment.amountReceived || ''}
                        onChange={(e) => updatePayment(payment.id, 'amountReceived', parseFloat(e.target.value) || 0)}
                        min="0"
                        max={payment.invoiceBalance}
                        step="0.01"
                      />
                    </td>
                    <td className="amount-cell">${payment.invoiceBalance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={() => navigate('/sales/invoices')}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            <Save size={18} />
            Save Payments
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchPayments;
