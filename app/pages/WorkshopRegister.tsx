import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { useApp, Customer } from '../context/AppContext';

function ConfirmModal({ workshop, customer, onConfirm, onCancel }: {
  workshop: { title: string };
  customer: Customer;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[400px] p-8 text-center">
        <div className="flex justify-end mb-2">
          <button onClick={onCancel} className="text-[#383838] hover:text-[#ff4e00] transition-colors">
            <X size={18} />
          </button>
        </div>
        <h2 className="text-[#ff4e00] text-[22px] font-semibold mb-3 leading-snug">
          {workshop.title}
        </h2>
        <p className="text-[#383838] text-[14px] mb-8">
          Are you sure you want to register this person?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 border border-[#ff4e00] text-[#ff4e00] rounded-[6px] text-[15px] font-medium hover:bg-[#ff4e00] hover:text-white transition-colors"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-[#ff4e00] text-white rounded-[6px] text-[15px] font-medium hover:bg-[#e04400] transition-colors"
          >
            Yes, Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkshopRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workshops, customers, registerCustomerForWorkshop, isCustomerRegistered } = useApp();
  const [pendingCustomer, setPendingCustomer] = useState<Customer | null>(null);

  const workshop = workshops.find(w => w.id === Number(id));
  if (!workshop) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#383838]">
        Workshop not found.
      </div>
    );
  }

  const handleAddClick = (customer: Customer) => {
    setPendingCustomer(customer);
  };

  const handleConfirm = () => {
    if (pendingCustomer) {
      registerCustomerForWorkshop(workshop.id, pendingCustomer);
      setPendingCustomer(null);
    }
  };

  const handleCancel = () => {
    setPendingCustomer(null);
  };

  return (
    <div className="flex-1 px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(`/workshops/${workshop.id}`)}
          className="flex items-center gap-1 text-[#ff4e00] hover:underline"
        >
          <ArrowLeft size={16} />
          <span className="text-[22px] font-semibold">Register for {workshop.title}</span>
        </button>
      </div>

      {/* Customers list */}
      <h2 className="text-[#ff4e00] text-[20px] font-semibold mb-4">Customers List</h2>

      <div className="bg-white rounded-xl border border-[#e9e9e9] overflow-hidden shadow-sm">
        {/* Table header */}
        <div className="grid grid-cols-[0.5fr_2fr_2.5fr_2fr_2fr] px-6 py-4 border-b border-[#f0f0f0] gap-4">
          <span className="text-[#ff4e00] text-[15px] font-semibold">#</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Name</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Email</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Phone</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Register</span>
        </div>

        {/* Table rows */}
        {customers.map((customer, idx) => {
          const registered = isCustomerRegistered(workshop.id, customer.id);
          return (
            <div
              key={customer.id}
              className={`grid grid-cols-[0.5fr_2fr_2.5fr_2fr_2fr] px-6 py-3 items-center border-b border-[#f8f8f8] last:border-0 gap-4 ${
                idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'
              }`}
            >
              <span className="text-[#383838] text-[14px]">{idx + 1}</span>
              <span className="text-[#383838] text-[14px]">{customer.name}</span>
              <span className="text-[#383838] text-[14px]">{customer.email}</span>
              <span className="text-[#383838] text-[14px]">{customer.phone}</span>
              <div>
                {registered ? (
                  <button
                    disabled
                    className="px-3 py-1 bg-green-500 text-white rounded-[5px] text-[12px] font-medium cursor-default"
                  >
                    Added to the workshop
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddClick(customer)}
                    className="px-3 py-1 border border-[#ff4e00] text-[#ff4e00] rounded-[5px] text-[12px] font-medium hover:bg-[#ff4e00] hover:text-white transition-colors"
                  >
                    + Add to the workshop
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation modal */}
      {pendingCustomer && (
        <ConfirmModal
          workshop={workshop}
          customer={pendingCustomer}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
