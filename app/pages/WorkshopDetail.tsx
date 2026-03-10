import { useParams, useNavigate } from 'react-router';
import { ChevronLeft as ChevronLeftIcon, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const PAGE_SIZE = 8;

export default function WorkshopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workshops } = useApp();
  const [page, setPage] = useState(1);

  const workshop = workshops.find(w => w.id === Number(id));
  if (!workshop) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#383838]">
        Workshop not found.
      </div>
    );
  }

  const attendees = workshop.attendees;
  const totalPages = Math.ceil(attendees.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageAttendees = attendees.slice(start, end);
  const totalAttendees = attendees.length;

  return (
    <div className="flex-1 px-8 py-6">
      {/* Header section */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <button
            onClick={() => navigate('/workshops')}
            className="flex items-center gap-1 text-[#ff4e00] hover:underline mb-1"
          >
            <ArrowLeft size={16} />
            <span className="text-[22px] font-semibold">{workshop.title}</span>
          </button>
          <p className="text-[#5d5d5d] text-[13px] ml-5">
            Date: {workshop.date}&nbsp; | &nbsp;Capacity {workshop.capacity}&nbsp; | &nbsp;Spots left: {workshop.spotsLeft}
          </p>
        </div>
        <button
          onClick={() => navigate(`/workshops/${workshop.id}/register`)}
          className="px-5 py-2 border border-[#ff4e00] text-[#ff4e00] rounded-[8px] text-[14px] font-medium hover:bg-[#ff4e00] hover:text-white transition-colors"
        >
          Register a customer
        </button>
      </div>

      {/* Attendees section */}
      <div className="flex items-center justify-between mt-6 mb-4">
        <h2 className="text-[#ff4e00] text-[22px] font-semibold">Attendees</h2>
        <div className="flex items-center gap-3 text-[#383838] text-[14px]">
          {totalAttendees > 0 ? (
            <span>{start + 1}-{Math.min(end, totalAttendees)} of {totalAttendees}</span>
          ) : (
            <span>0 of 0</span>
          )}
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="disabled:opacity-40 hover:text-[#ff4e00] transition-colors"
          >
            <ChevronLeftIcon size={18} />
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || totalPages === 0}
            className="disabled:opacity-40 hover:text-[#ff4e00] transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e9e9e9] overflow-hidden shadow-sm">
        {/* Table header */}
        <div className="grid grid-cols-[0.5fr_2fr_2.5fr_2fr_2fr] px-6 py-4 border-b border-[#f0f0f0] gap-4">
          <span className="text-[#ff4e00] text-[15px] font-semibold">#</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Name</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Email</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Phone</span>
          <span className="text-[#ff4e00] text-[15px] font-semibold">Registered</span>
        </div>

        {/* Table rows */}
        {pageAttendees.length === 0 ? (
          <div className="px-6 py-8 text-center text-[#5d5d5d] text-[14px]">
            No attendees yet. Click "Register a customer" to add attendees.
          </div>
        ) : (
          pageAttendees.map((attendee, idx) => (
            <div
              key={attendee.id}
              className={`grid grid-cols-[0.5fr_2fr_2.5fr_2fr_2fr] px-6 py-3 items-center border-b border-[#f8f8f8] last:border-0 gap-4 ${
                idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'
              }`}
            >
              <span className="text-[#383838] text-[14px]">{start + idx + 1}</span>
              <span className="text-[#383838] text-[14px]">{attendee.name}</span>
              <span className="text-[#383838] text-[14px]">{attendee.email}</span>
              <span className="text-[#383838] text-[14px]">{attendee.phone}</span>
              <span className="text-[#383838] text-[14px]">{attendee.registeredAt}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
