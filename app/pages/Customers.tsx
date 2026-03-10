import { useState } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useApp, Customer } from '../context/AppContext';

const PAGE_SIZE = 8;

function AddCustomerModal({ onClose, onSave, editingCustomer }: {
  onClose: () => void;
  onSave: (customer: Omit<Customer, 'id'>) => void;
  editingCustomer: Customer | null;
}) {
  const [name, setName] = useState(editingCustomer?.name || '');
  const [email, setEmail] = useState(editingCustomer?.email || '');
  const [phone, setPhone] = useState(editingCustomer?.phone || '');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[450px] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#ff4e00] text-[22px] font-semibold">
            {editingCustomer ? 'Edit Customer' : '+ Add Customer'}
          </h2>
          <button onClick={onClose} className="text-[#383838] hover:text-[#ff4e00] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[#383838] text-[14px] mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-[#d8d8d8] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#ff4e00]"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-[#383838] text-[14px] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-[#d8d8d8] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#ff4e00]"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-[#383838] text-[14px] mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border border-[#d8d8d8] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#ff4e00]"
              placeholder=""
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-[#ff4e00] text-[#ff4e00] rounded-[6px] text-[15px] font-medium hover:bg-[#ff4e00] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 bg-[#ff4e00] text-white rounded-[6px] text-[15px] font-medium hover:bg-[#e04400] transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Customers() {
  const { customers, addCustomer, deleteCustomer, updateCustomer } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(customers.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageCustomers = customers.slice(start, end);

  const handleSave = (data: Omit<Customer, 'id'>) => {
    if (editingCustomer) {
      updateCustomer({ ...editingCustomer, ...data });
    } else {
      addCustomer(data);
    }
    setEditingCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    deleteCustomer(id);
    if (page > 1 && pageCustomers.length === 1) {
      setPage(p => p - 1);
    }
  };

  return (
    <div className="flex-1 px-8 py-6">
      {/* Top action */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => { setEditingCustomer(null); setShowModal(true); }}
          className="px-5 py-2 border border-[#ff4e00] text-[#ff4e00] rounded-[8px] text-[14px] font-medium hover:bg-[#ff4e00] hover:text-white transition-colors"
        >
          + Add Customer
        </button>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[#ff4e00] text-[26px] font-semibold">Customers</h1>
        <div className="flex items-center gap-3 text-[#383838] text-[14px]">
          <span>{start + 1}-{Math.min(end, customers.length)} of {customers.length}</span>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="disabled:opacity-40 hover:text-[#ff4e00] transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="disabled:opacity-40 hover:text-[#ff4e00] transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e9e9e9] overflow-hidden shadow-sm">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_2fr_2fr_1fr] px-6 py-4 border-b border-[#f0f0f0]">
          <span className="text-[#ff4e00] text-[15px] font-semibold">Name</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Email</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Phone</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold text-right">Action</span>
        </div>

        {/* Table rows */}
        {pageCustomers.map((customer, idx) => (
          <div
            key={customer.id}
            className={`grid grid-cols-[2fr_2fr_2fr_1fr] px-6 py-3 items-center border-b border-[#f8f8f8] last:border-0 ${
              idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'
            }`}
          >
            <span className="text-[#383838] text-[14px]">{customer.name}</span>
            <span className="text-[#383838] text-[14px]">{customer.email}</span>
            <span className="text-[#383838] text-[14px]">{customer.phone}</span>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(customer)}
                className="w-[28px] h-[28px] bg-[#f0f0f0] rounded flex items-center justify-center hover:bg-[#e0e0e0] transition-colors"
              >
                <Pencil size={13} className="text-[#383838]" />
              </button>
              <button
                onClick={() => handleDelete(customer.id)}
                className="w-[28px] h-[28px] bg-[#ff4e00] rounded flex items-center justify-center hover:bg-[#e04400] transition-colors"
              >
                <Trash2 size={13} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <AddCustomerModal
          onClose={() => { setShowModal(false); setEditingCustomer(null); }}
          onSave={handleSave}
          editingCustomer={editingCustomer}
        />
      )}
    </div>
  );
}
