import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, AlertTriangle, TrendingUp } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  sku: string;
  stock: number;
  minStock: number;
  unitCost: string;
  sellingPrice: string;
  supplier: string;
  lastRestocked: string;
}

const initialInventory: InventoryItem[] = [
  { id: 1,  name: 'Red Roses',            category: 'Roses',      sku: 'RSE-RD-001', stock: 120, minStock: 30,  unitCost: 'P18',  sellingPrice: 'P35',  supplier: 'Bloom Farm',    lastRestocked: 'Oct 1, 2025'  },
  { id: 2,  name: 'Pink Roses',           category: 'Roses',      sku: 'RSE-PK-002', stock: 85,  minStock: 25,  unitCost: 'P20',  sellingPrice: 'P38',  supplier: 'Bloom Farm',    lastRestocked: 'Oct 1, 2025'  },
  { id: 3,  name: 'White Roses',          category: 'Roses',      sku: 'RSE-WT-003', stock: 60,  minStock: 20,  unitCost: 'P22',  sellingPrice: 'P40',  supplier: 'Bloom Farm',    lastRestocked: 'Oct 3, 2025'  },
  { id: 4,  name: 'Sunflowers',           category: 'Sunflowers', sku: 'SUN-YL-001', stock: 15,  minStock: 20,  unitCost: 'P25',  sellingPrice: 'P48',  supplier: 'Sun Garden',    lastRestocked: 'Sep 28, 2025' },
  { id: 5,  name: 'Lilies',              category: 'Lilies',     sku: 'LLY-WH-001', stock: 45,  minStock: 15,  unitCost: 'P30',  sellingPrice: 'P55',  supplier: 'Petal Co.',     lastRestocked: 'Oct 5, 2025'  },
  { id: 6,  name: 'Calla Lilies',         category: 'Lilies',     sku: 'LLY-CA-002', stock: 8,   minStock: 10,  unitCost: 'P35',  sellingPrice: 'P65',  supplier: 'Petal Co.',     lastRestocked: 'Sep 25, 2025' },
  { id: 7,  name: 'Orchids',             category: 'Orchids',    sku: 'ORC-PK-001', stock: 22,  minStock: 10,  unitCost: 'P80',  sellingPrice: 'P150', supplier: 'Orchid Haven',  lastRestocked: 'Oct 4, 2025'  },
  { id: 8,  name: 'Lavender',            category: 'Mixed',      sku: 'MIX-LV-001', stock: 5,   minStock: 15,  unitCost: 'P15',  sellingPrice: 'P28',  supplier: 'Wild Blooms',   lastRestocked: 'Sep 22, 2025' },
  { id: 9,  name: 'Carnations',          category: 'Mixed',      sku: 'MIX-CR-002', stock: 90,  minStock: 20,  unitCost: 'P12',  sellingPrice: 'P22',  supplier: 'Wild Blooms',   lastRestocked: 'Oct 6, 2025'  },
  { id: 10, name: 'Peonies',             category: 'Premium',    sku: 'PRM-PN-001', stock: 12,  minStock: 8,   unitCost: 'P90',  sellingPrice: 'P180', supplier: 'Luxury Petals', lastRestocked: 'Oct 2, 2025'  },
  { id: 11, name: 'Dahlias',             category: 'Mixed',      sku: 'MIX-DH-003', stock: 35,  minStock: 12,  unitCost: 'P28',  sellingPrice: 'P52',  supplier: 'Wild Blooms',   lastRestocked: 'Oct 7, 2025'  },
  { id: 12, name: 'Tulips',              category: 'Mixed',      sku: 'MIX-TL-004', stock: 55,  minStock: 20,  unitCost: 'P22',  sellingPrice: 'P42',  supplier: 'Dutch Flowers', lastRestocked: 'Oct 8, 2025'  },
  { id: 13, name: 'Baby\'s Breath',      category: 'Filler',     sku: 'FLL-BB-001', stock: 200, minStock: 50,  unitCost: 'P8',   sellingPrice: 'P15',  supplier: 'Bloom Farm',    lastRestocked: 'Oct 9, 2025'  },
  { id: 14, name: 'Greenery/Foliage',    category: 'Filler',     sku: 'FLL-GR-002', stock: 150, minStock: 40,  unitCost: 'P10',  sellingPrice: 'P18',  supplier: 'Green World',   lastRestocked: 'Oct 10, 2025' },
  { id: 15, name: 'Wrapping Paper',      category: 'Supplies',   sku: 'SUP-WP-001', stock: 3,   minStock: 20,  unitCost: 'P5',   sellingPrice: '-',    supplier: 'Paper Plus',    lastRestocked: 'Sep 15, 2025' },
  { id: 16, name: 'Ribbon (rolls)',      category: 'Supplies',   sku: 'SUP-RB-002', stock: 18,  minStock: 10,  unitCost: 'P25',  sellingPrice: '-',    supplier: 'Craft Store',   lastRestocked: 'Oct 5, 2025'  },
];

const CATEGORIES = ['All', 'Roses', 'Sunflowers', 'Lilies', 'Orchids', 'Mixed', 'Premium', 'Filler', 'Supplies'];
const PAGE_SIZE = 8;

function RestockModal({ item, onClose, onRestock }: {
  item: InventoryItem;
  onClose: () => void;
  onRestock: (id: number, qty: number) => void;
}) {
  const [qty, setQty] = useState('');
  const handleRestock = () => {
    const n = parseInt(qty);
    if (!n || n <= 0) return;
    onRestock(item.id, n);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[420px] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#ff4e00] text-[20px] font-semibold">Restock Item</h2>
          <button onClick={onClose} className="text-[#383838] hover:text-[#ff4e00] transition-colors"><X size={20} /></button>
        </div>
        <div className="space-y-3 text-[14px] mb-6">
          <div className="flex justify-between"><span className="text-[#5d5d5d]">Item</span><span className="text-[#383838] font-medium">{item.name}</span></div>
          <div className="flex justify-between"><span className="text-[#5d5d5d]">Current Stock</span><span className="text-[#383838] font-medium">{item.stock} units</span></div>
          <div className="flex justify-between"><span className="text-[#5d5d5d]">Min. Stock</span><span className="text-[#383838] font-medium">{item.minStock} units</span></div>
        </div>
        <div className="mb-6">
          <label className="block text-[#383838] text-[14px] mb-1">Quantity to Add</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={e => setQty(e.target.value)}
            className="w-full border border-[#d8d8d8] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#ff4e00]"
            placeholder="Enter quantity..."
          />
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 border border-[#ff4e00] text-[#ff4e00] rounded-[6px] text-[15px] font-medium hover:bg-[#ff4e00] hover:text-white transition-colors">Cancel</button>
          <button onClick={handleRestock} className="flex-1 py-2 bg-[#ff4e00] text-white rounded-[6px] text-[15px] font-medium hover:bg-[#e04400] transition-colors">Restock</button>
        </div>
      </div>
    </div>
  );
}

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>(initialInventory);
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [restockItem, setRestockItem] = useState<InventoryItem | null>(null);

  const filtered = category === 'All' ? items : items.filter(i => i.category === category);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  const lowStock = items.filter(i => i.stock <= i.minStock);

  const handleRestock = (id: number, qty: number) => {
    setItems(prev => prev.map(i =>
      i.id === id
        ? { ...i, stock: i.stock + qty, lastRestocked: 'Oct 10, 2025' }
        : i
    ));
  };

  const stockStatus = (item: InventoryItem) => {
    if (item.stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-600' };
    if (item.stock <= item.minStock) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
  };

  return (
    <div className="flex-1 px-8 py-6">
      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Items', value: items.length, color: 'border-[#ff4e00]', textColor: 'text-[#ff4e00]' },
          { label: 'In Stock', value: items.filter(i => i.stock > i.minStock).length, color: 'border-green-400', textColor: 'text-green-600' },
          { label: 'Low Stock', value: lowStock.length, color: 'border-yellow-400', textColor: 'text-yellow-600' },
          { label: 'Out of Stock', value: items.filter(i => i.stock === 0).length, color: 'border-red-400', textColor: 'text-red-600' },
        ].map(card => (
          <div key={card.label} className={`bg-white rounded-xl p-5 border-l-4 shadow-sm ${card.color}`}>
            <p className="text-[#5d5d5d] text-[13px] mb-1">{card.label}</p>
            <p className={`text-[30px] font-semibold ${card.textColor}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle size={18} className="text-yellow-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-yellow-800 text-[13px] font-semibold">Low Stock Alert</p>
            <p className="text-yellow-700 text-[12px]">
              {lowStock.map(i => i.name).join(', ')} {lowStock.length === 1 ? 'is' : 'are'} running low and need restocking.
            </p>
          </div>
        </div>
      )}

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[#ff4e00] text-[26px] font-semibold">Inventory</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-3 py-1 rounded-full text-[13px] font-medium transition-colors ${
                  category === cat
                    ? 'bg-[#ff4e00] text-white'
                    : 'bg-white border border-[#d8d8d8] text-[#383838] hover:border-[#ff4e00] hover:text-[#ff4e00]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[#383838] text-[14px] shrink-0">
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
        <div className="grid grid-cols-[2fr_1.2fr_1fr_0.8fr_0.8fr_0.8fr_1.2fr_1.2fr_auto] px-5 py-4 border-b border-[#f0f0f0] gap-3">
          {['Name', 'Category', 'SKU', 'Stock', 'Min.', 'Cost', 'Sell Price', 'Status', ''].map(h => (
            <span key={h} className="text-[#ff4e00] text-[13px] font-semibold">{h}</span>
          ))}
        </div>
        {pageItems.length === 0 ? (
          <div className="px-6 py-10 text-center text-[#5d5d5d] text-[14px]">No items found.</div>
        ) : (
          pageItems.map((item, idx) => {
            const status = stockStatus(item);
            return (
              <div
                key={item.id}
                className={`grid grid-cols-[2fr_1.2fr_1fr_0.8fr_0.8fr_0.8fr_1.2fr_1.2fr_auto] px-5 py-3 items-center border-b border-[#f8f8f8] last:border-0 gap-3 ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
              >
                <div>
                  <p className="text-[#383838] text-[13px] font-medium">{item.name}</p>
                  <p className="text-[#9d9d9d] text-[11px]">{item.supplier}</p>
                </div>
                <span className="text-[#5d5d5d] text-[12px]">{item.category}</span>
                <span className="text-[#5d5d5d] text-[11px] font-mono">{item.sku}</span>
                <span className={`text-[13px] font-semibold ${item.stock <= item.minStock ? 'text-red-500' : 'text-[#383838]'}`}>{item.stock}</span>
                <span className="text-[#5d5d5d] text-[12px]">{item.minStock}</span>
                <span className="text-[#383838] text-[12px]">{item.unitCost}</span>
                <span className="text-[#383838] text-[12px]">{item.sellingPrice}</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium w-fit ${status.color}`}>
                  {status.label}
                </span>
                <button
                  onClick={() => setRestockItem(item)}
                  className="px-3 py-1 border border-[#ff4e00] text-[#ff4e00] rounded-[5px] text-[11px] font-medium hover:bg-[#ff4e00] hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
                >
                  <TrendingUp size={11} />
                  Restock
                </button>
              </div>
            );
          })
        )}
      </div>

      {restockItem && (
        <RestockModal
          item={restockItem}
          onClose={() => setRestockItem(null)}
          onRestock={handleRestock}
        />
      )}
    </div>
  );
}
