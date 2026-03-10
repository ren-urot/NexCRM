import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react';
import { useApp, Workshop } from '../context/AppContext';

const PAGE_SIZE = 8;

function CreateWorkshopModal({ onClose, onSave }: {
  onClose: () => void;
  onSave: (workshop: Omit<Workshop, 'id' | 'attendees'>) => void;
}) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [spots, setSpots] = useState('');
  const [price, setPrice] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      date: date || 'TBD',
      capacity: parseInt(capacity) || 0,
      spotsLeft: parseInt(spots) || 0,
      price: price.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[480px] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#383838] text-[20px] font-semibold">Create Workshop</h2>
          <button onClick={onClose} className="text-[#383838] hover:text-[#ff4e00] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[#383838] text-[14px] mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border border-[#d8d8d8] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#ff4e00]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#383838] text-[14px] mb-1">Date</label>
              <div className="relative">
                <input
                  type="text"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  placeholder="e.g. Oct. 20, 2025 - 10PM"
                  className="w-full border border-[#d8d8d8] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#ff4e00] pr-8"
                />
                <Calendar size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ff4e00]" />
              </div>
            </div>
            <div>
              <label className="block text-[#383838] text-[14px] mb-1">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                className="w-full border border-[#d8d8d8] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#ff4e00]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#383838] text-[14px] mb-1">Spots</label>
              <input
                type="number"
                value={spots}
                onChange={e => setSpots(e.target.value)}
                className="w-full border border-[#d8d8d8] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#ff4e00]"
              />
            </div>
            <div>
              <label className="block text-[#383838] text-[14px] mb-1">Price</label>
              <input
                type="text"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="e.g. P50"
                className="w-full border border-[#d8d8d8] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#ff4e00]"
              />
            </div>
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
            onClick={handleCreate}
            className="flex-1 py-2 bg-[#ff4e00] text-white rounded-[6px] text-[15px] font-medium hover:bg-[#e04400] transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Workshops() {
  const { workshops, addWorkshop } = useApp();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(workshops.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageWorkshops = workshops.slice(start, end);

  return (
    <div className="flex-1 px-8 py-6">
      {/* Top action */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 border border-[#ff4e00] text-[#ff4e00] rounded-[8px] text-[14px] font-medium hover:bg-[#ff4e00] hover:text-white transition-colors"
        >
          Create Workshop
        </button>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[#ff4e00] text-[26px] font-semibold">Workshops</h1>
        <div className="flex items-center gap-3 text-[#383838] text-[14px]">
          <span>{start + 1}-{Math.min(end, workshops.length)} of {workshops.length}</span>
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
        <div className="grid grid-cols-[2.5fr_2fr_1.2fr_1.2fr_1fr_auto] px-6 py-4 border-b border-[#f0f0f0] gap-4">
          <span className="text-[#ff4e00] text-[15px] font-semibold">Title</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Date</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Capacity</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Spots Left</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Price</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold w-[160px]"></span>
        </div>

        {/* Table rows */}
        {pageWorkshops.map((workshop, idx) => (
          <div
            key={workshop.id}
            className={`grid grid-cols-[2.5fr_2fr_1.2fr_1.2fr_1fr_auto] px-6 py-3 items-center border-b border-[#f8f8f8] last:border-0 gap-4 ${
              idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'
            }`}
          >
            <span className="text-[#383838] text-[14px]">{workshop.title}</span>
            <span className="text-[#383838] text-[14px]">{workshop.date}</span>
            <span className="text-[#383838] text-[14px]">{workshop.capacity} People</span>
            <span className="text-[#383838] text-[14px]">{workshop.spotsLeft} Spots</span>
            <span className="text-[#383838] text-[14px]">{workshop.price}</span>
            <div className="flex items-center gap-2 w-[160px]">
              <button
                onClick={() => navigate(`/workshops/${workshop.id}`)}
                className="px-3 py-1 border border-[#ff4e00] text-[#ff4e00] rounded-[5px] text-[12px] font-medium hover:bg-[#ff4e00] hover:text-white transition-colors"
              >
                Details
              </button>
              <button
                onClick={() => navigate(`/workshops/${workshop.id}/register`)}
                className="px-3 py-1 bg-[#ff4e00] text-white rounded-[5px] text-[12px] font-medium hover:bg-[#e04400] transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <CreateWorkshopModal
          onClose={() => setShowModal(false)}
          onSave={addWorkshop}
        />
      )}
    </div>
  );
}
