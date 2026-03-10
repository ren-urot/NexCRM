import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';

type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';

interface Order {
  id: number;
  orderNo: string;
  customer: string;
  items: string;
  total: string;
  date: string;
  status: OrderStatus;
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  Pending:    'bg-yellow-100 text-yellow-700',
  Processing: 'bg-blue-100 text-blue-700',
  Completed:  'bg-green-100 text-green-700',
  Cancelled:  'bg-red-100 text-red-600',
};

const initialOrders: Order[] = [
  { id: 1,  orderNo: '#ORD-0001', customer: 'Susan Santos',      items: 'Rose Bouquet x2, Lily x1',    total: 'P850',  date: 'Oct 1, 2025',  status: 'Completed'  },
  { id: 2,  orderNo: '#ORD-0002', customer: 'Mildred Dela Cruz', items: 'Sunflower Arrangement x1',    total: 'P450',  date: 'Oct 2, 2025',  status: 'Completed'  },
  { id: 3,  orderNo: '#ORD-0003', customer: 'Cristy Villar',     items: 'Wedding Bouquet x1',          total: 'P1,200',date: 'Oct 3, 2025',  status: 'Processing' },
  { id: 4,  orderNo: '#ORD-0004', customer: 'Sarah Cruz',        items: 'Mixed Flowers x3',            total: 'P600',  date: 'Oct 4, 2025',  status: 'Pending'    },
  { id: 5,  orderNo: '#ORD-0005', customer: 'Mark Smith',        items: 'Orchid Pot x1, Tulip x2',     total: 'P750',  date: 'Oct 5, 2025',  status: 'Completed'  },
  { id: 6,  orderNo: '#ORD-0006', customer: 'Susan Anderson',    items: 'Red Rose Dozen x1',           total: 'P380',  date: 'Oct 6, 2025',  status: 'Cancelled'  },
  { id: 7,  orderNo: '#ORD-0007', customer: 'Richard Mann',      items: 'Lavender Bouquet x2',         total: 'P520',  date: 'Oct 7, 2025',  status: 'Completed'  },
  { id: 8,  orderNo: '#ORD-0008', customer: 'Jason Marcus',      items: 'Carnation x5',                total: 'P250',  date: 'Oct 8, 2025',  status: 'Processing' },
  { id: 9,  orderNo: '#ORD-0009', customer: 'David Johnson',     items: 'Peony Bouquet x1',            total: 'P950',  date: 'Oct 9, 2025',  status: 'Pending'    },
  { id: 10, orderNo: '#ORD-0010', customer: 'Michael Bain',      items: 'Dahlia x3, Iris x2',          total: 'P680',  date: 'Oct 10, 2025', status: 'Completed'  },
  { id: 11, orderNo: '#ORD-0011', customer: 'Ricky Jass',        items: 'Seasonal Bouquet x1',         total: 'P340',  date: 'Oct 11, 2025', status: 'Cancelled'  },
  { id: 12, orderNo: '#ORD-0012', customer: 'Sarah Miller',      items: 'Premium Arrangement x1',      total: 'P1,500',date: 'Oct 12, 2025', status: 'Processing' },
  { id: 13, orderNo: '#ORD-0013', customer: 'John Smith',        items: 'Garden Mix x2',               total: 'P430',  date: 'Oct 13, 2025', status: 'Pending'    },
  { id: 14, orderNo: '#ORD-0014', customer: 'Emma Brown',        items: 'Calla Lily x3, Rose x2',      total: 'P720',  date: 'Oct 14, 2025', status: 'Completed'  },
  { id: 15, orderNo: '#ORD-0015', customer: 'Lisa Taylor',       items: 'Bridal Arrangement x1',       total: 'P2,200',date: 'Oct 15, 2025', status: 'Processing' },
  { id: 16, orderNo: '#ORD-0016', customer: 'Chris Wilson',      items: 'Wildflower Bunch x2',         total: 'P410',  date: 'Oct 16, 2025', status: 'Completed'  },
];

const PAGE_SIZE = 8;
const ALL_STATUSES: OrderStatus[] = ['Pending', 'Processing', 'Completed', 'Cancelled'];

function OrderDetailModal({ order, onClose, onStatusChange }: {
  order: Order;
  onClose: () => void;
  onStatusChange: (id: number, status: OrderStatus) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[480px] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#ff4e00] text-[20px] font-semibold">Order Details</h2>
          <button onClick={onClose} className="text-[#383838] hover:text-[#ff4e00] transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3 text-[14px]">
          <div className="flex justify-between border-b border-[#f0f0f0] pb-2">
            <span className="text-[#5d5d5d]">Order No.</span>
            <span className="text-[#383838] font-medium">{order.orderNo}</span>
          </div>
          <div className="flex justify-between border-b border-[#f0f0f0] pb-2">
            <span className="text-[#5d5d5d]">Customer</span>
            <span className="text-[#383838] font-medium">{order.customer}</span>
          </div>
          <div className="flex justify-between border-b border-[#f0f0f0] pb-2">
            <span className="text-[#5d5d5d]">Items</span>
            <span className="text-[#383838] font-medium text-right max-w-[260px]">{order.items}</span>
          </div>
          <div className="flex justify-between border-b border-[#f0f0f0] pb-2">
            <span className="text-[#5d5d5d]">Total</span>
            <span className="text-[#ff4e00] font-semibold">{order.total}</span>
          </div>
          <div className="flex justify-between border-b border-[#f0f0f0] pb-2">
            <span className="text-[#5d5d5d]">Date</span>
            <span className="text-[#383838] font-medium">{order.date}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-[#5d5d5d]">Status</span>
            <select
              value={order.status}
              onChange={e => onStatusChange(order.id, e.target.value as OrderStatus)}
              className="border border-[#d8d8d8] rounded-[6px] px-2 py-1 text-[13px] outline-none focus:border-[#ff4e00] cursor-pointer"
            >
              {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full py-2 bg-[#ff4e00] text-white rounded-[6px] text-[15px] font-medium hover:bg-[#e04400] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Sales() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'All'>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = filterStatus === 'All' ? orders : orders.filter(o => o.status === filterStatus);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageOrders = filtered.slice(start, start + PAGE_SIZE);

  const handleStatusChange = (id: number, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    setSelectedOrder(prev => prev && prev.id === id ? { ...prev, status } : prev);
  };

  const summary = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'Completed').length,
    pending: orders.filter(o => o.status === 'Pending').length,
    processing: orders.filter(o => o.status === 'Processing').length,
  };

  return (
    <div className="flex-1 px-8 py-6">
      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Orders', value: summary.total, color: 'border-[#ff4e00]', textColor: 'text-[#ff4e00]' },
          { label: 'Completed', value: summary.completed, color: 'border-green-400', textColor: 'text-green-600' },
          { label: 'Pending', value: summary.pending, color: 'border-yellow-400', textColor: 'text-yellow-600' },
          { label: 'Processing', value: summary.processing, color: 'border-blue-400', textColor: 'text-blue-600' },
        ].map(card => (
          <div key={card.label} className={`bg-white rounded-xl p-5 border-l-4 shadow-sm ${card.color}`}>
            <p className="text-[#5d5d5d] text-[13px] mb-1">{card.label}</p>
            <p className={`text-[30px] font-semibold ${card.textColor}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[#ff4e00] text-[26px] font-semibold">Sales & Orders</h1>
        <div className="flex items-center gap-4">
          {/* Status filter */}
          <div className="flex items-center gap-2">
            {(['All', ...ALL_STATUSES] as const).map(s => (
              <button
                key={s}
                onClick={() => { setFilterStatus(s); setPage(1); }}
                className={`px-3 py-1 rounded-full text-[13px] font-medium transition-colors ${
                  filterStatus === s
                    ? 'bg-[#ff4e00] text-white'
                    : 'bg-white border border-[#d8d8d8] text-[#383838] hover:border-[#ff4e00] hover:text-[#ff4e00]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex items-center gap-2 text-[#383838] text-[14px]">
            <span>{filtered.length === 0 ? '0' : `${start + 1}-${Math.min(start + PAGE_SIZE, filtered.length)}`} of {filtered.length}</span>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="disabled:opacity-40 hover:text-[#ff4e00]">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="disabled:opacity-40 hover:text-[#ff4e00]">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e9e9e9] overflow-hidden shadow-sm">
        <div className="grid grid-cols-[1fr_2fr_3fr_1fr_1.5fr_1.2fr_auto] px-6 py-4 border-b border-[#f0f0f0] gap-3">
          {['Order No.', 'Customer', 'Items', 'Total', 'Date', 'Status', ''].map(h => (
            <span key={h} className="text-[#ff4e00] text-[14px] font-semibold">{h}</span>
          ))}
        </div>
        {pageOrders.length === 0 ? (
          <div className="px-6 py-10 text-center text-[#5d5d5d] text-[14px]">No orders found.</div>
        ) : (
          pageOrders.map((order, idx) => (
            <div
              key={order.id}
              className={`grid grid-cols-[1fr_2fr_3fr_1fr_1.5fr_1.2fr_auto] px-6 py-3 items-center border-b border-[#f8f8f8] last:border-0 gap-3 ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
            >
              <span className="text-[#383838] text-[13px] font-medium">{order.orderNo}</span>
              <span className="text-[#383838] text-[13px]">{order.customer}</span>
              <span className="text-[#5d5d5d] text-[12px] truncate">{order.items}</span>
              <span className="text-[#383838] text-[13px] font-medium">{order.total}</span>
              <span className="text-[#5d5d5d] text-[13px]">{order.date}</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium w-fit ${STATUS_COLORS[order.status]}`}>
                {order.status}
              </span>
              <button
                onClick={() => setSelectedOrder(order)}
                className="w-[28px] h-[28px] bg-[#f0f0f0] rounded flex items-center justify-center hover:bg-[#e0e0e0] transition-colors"
              >
                <Eye size={13} className="text-[#383838]" />
              </button>
            </div>
          ))
        )}
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
