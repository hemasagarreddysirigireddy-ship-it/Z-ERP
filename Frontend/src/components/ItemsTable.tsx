import React from 'react';
import { X, Plus } from 'lucide-react';

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

interface ItemsTableProps {
  items: ItemRow[];
  onItemsChange: (items: ItemRow[]) => void;
  showQuantityAs?: 'qty' | 'hours' | 'qty+hours';
}

const ItemsTable: React.FC<ItemsTableProps> = ({ items, onItemsChange, showQuantityAs = 'qty' }) => {
  const addItem = () => {
    const newItem: ItemRow = {
      id: Date.now().toString(),
      item: '',
      description: '',
      longDescription: '',
      qty: 1,
      rate: 0,
      tax: 'No Tax',
      amount: 0
    };
    onItemsChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof ItemRow, value: any) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Recalculate amount
        if (field === 'qty' || field === 'rate') {
          updated.amount = updated.qty * updated.rate;
        }
        return updated;
      }
      return item;
    });
    onItemsChange(updatedItems);
  };

  return (
    <div className="items-table-container">
      <div className="items-header-new">
        <div className="add-item-dropdown">
          <button type="button" className="btn-secondary-sm" onClick={addItem}>
            <Plus size={16} />
            Add item
          </button>
        </div>
        <div className="quantity-toggle-inline">
          <span className="quantity-label">Show quantity as:</span>
          <label className="radio-label">
            <input
              type="radio"
              name="quantityType"
              value="qty"
              checked={showQuantityAs === 'qty'}
              onChange={() => {}}
            />
            Qty
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="quantityType"
              value="hours"
              checked={showQuantityAs === 'hours'}
              onChange={() => {}}
            />
            Hours
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="quantityType"
              value="qty+hours"
              checked={showQuantityAs === 'qty+hours'}
              onChange={() => {}}
            />
            Qty/Hours
          </label>
        </div>
      </div>

      <div className="items-table-wrapper">
        <table className="items-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}></th>
              <th style={{ width: '150px' }}>Item</th>
              <th style={{ width: '200px' }}>Description</th>
              <th style={{ width: '250px' }}>Long Description</th>
              <th style={{ width: '100px' }}>Qty</th>
              <th style={{ width: '120px' }}>Rate</th>
              <th style={{ width: '150px' }}>Tax</th>
              <th style={{ width: '120px' }}>Amount</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="item-number">{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control-sm"
                    placeholder="Item"
                    value={item.item}
                    onChange={(e) => updateItem(item.id, 'item', e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    className="form-control-sm"
                    placeholder="Description"
                    rows={2}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    className="form-control-sm"
                    placeholder="Long description"
                    rows={2}
                    value={item.longDescription}
                    onChange={(e) => updateItem(item.id, 'longDescription', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control-sm"
                    value={item.qty}
                    min="1"
                    onChange={(e) => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control-sm"
                    value={item.rate}
                    min="0"
                    step="0.01"
                    onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  />
                </td>
                <td>
                  <select
                    className="form-control-sm"
                    value={item.tax}
                    onChange={(e) => updateItem(item.id, 'tax', e.target.value)}
                  >
                    <option value="No Tax">No Tax</option>
                    <option value="GST 5%">GST 5%</option>
                    <option value="GST 12%">GST 12%</option>
                    <option value="GST 18%">GST 18%</option>
                    <option value="GST 28%">GST 28%</option>
                  </select>
                </td>
                <td className="amount-cell">
                  ${item.amount.toFixed(2)}
                </td>
                <td>
                  <button
                    type="button"
                    className="icon-btn-danger-sm"
                    onClick={() => removeItem(item.id)}
                    title="Remove item"
                  >
                    <X size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsTable;
