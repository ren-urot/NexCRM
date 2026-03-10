import { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingCart, X, CheckCircle, CreditCard, Lock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  qty: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1, name: 'Red Rose Dozen', category: 'Roses', price: 380,
    image: 'https://images.unsplash.com/photo-1646340972587-51dd992ce17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 2, name: 'Pink Rose Bouquet', category: 'Roses', price: 420,
    image: 'https://images.unsplash.com/photo-1626161290912-d415a83683fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 3, name: 'White Rose Bouquet', category: 'Roses', price: 350,
    image: 'https://images.unsplash.com/photo-1625382270782-95e6c66d1479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 4, name: 'Sunflower Bunch', category: 'Sunflowers', price: 280,
    image: 'https://images.unsplash.com/photo-1594948265212-356bd98c324e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 5, name: 'Sunflower Arrangement', category: 'Sunflowers', price: 450,
    image: 'https://images.unsplash.com/photo-1770319898874-0167ca28f01b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 6, name: 'Lily Bouquet', category: 'Lilies', price: 320,
    image: 'https://images.unsplash.com/photo-1694620132482-08c9c4fd2fd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 7, name: 'Calla Lily x3', category: 'Lilies', price: 260,
    image: 'https://images.unsplash.com/photo-1687946271298-caa66056eef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 8, name: 'Orchid Pot', category: 'Orchids', price: 550,
    image: 'https://images.unsplash.com/photo-1767380753017-b7681c1bc172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 9, name: 'Orchid Bouquet', category: 'Orchids', price: 480,
    image: 'https://images.unsplash.com/photo-1761654713504-7cf1bd412869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 10, name: 'Lavender Bunch', category: 'Mixed', price: 220,
    image: 'https://images.unsplash.com/photo-1573256815039-69d5f81f894f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 11, name: 'Wildflower Mix', category: 'Mixed', price: 190,
    image: 'https://images.unsplash.com/photo-1766018096999-0f4b563b8b18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 12, name: 'Garden Mix Bouquet', category: 'Mixed', price: 310,
    image: 'https://images.unsplash.com/photo-1648492726423-7b0c1b597919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 13, name: 'Wedding Bouquet', category: 'Premium', price: 1200,
    image: 'https://images.unsplash.com/photo-1700062351272-3609358b554a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 14, name: 'Bridal Arrangement', category: 'Premium', price: 2200,
    image: 'https://images.unsplash.com/photo-1761571259874-bb4871c44340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 15, name: 'Premium Arrangement', category: 'Premium', price: 1500,
    image: 'https://images.unsplash.com/photo-1765614767234-8a56ad4c87f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
  {
    id: 16, name: 'Carnation Bunch', category: 'Others', price: 150,
    image: 'https://images.unsplash.com/photo-1661249617256-39a486ae031b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  },
];

const CATEGORIES = ['All', 'Roses', 'Sunflowers', 'Lilies', 'Orchids', 'Mixed', 'Premium', 'Others'];

/* ─── Card Details Modal ─── */
function CardDetailsModal({
  total,
  onClose,
  onPay,
}: {
  total: number;
  onClose: () => void;
  onPay: () => void;
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number';
    if (!cardName.trim()) e.cardName = 'Cardholder name is required';
    if (expiry.length < 5) e.expiry = 'Enter a valid expiry date (MM/YY)';
    if (cvv.length < 3) e.cvv = 'Enter a valid CVV';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (validate()) onPay();
  };

  // Determine card brand from number
  const rawNumber = cardNumber.replace(/\s/g, '');
  const cardBrand =
    rawNumber.startsWith('4') ? 'VISA' :
    rawNumber.startsWith('5') ? 'MASTERCARD' :
    rawNumber.startsWith('3') ? 'AMEX' : '';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[440px] overflow-hidden">
        {/* Header */}
        <div className="bg-[#ff4e00] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard size={20} className="text-white" />
            <h2 className="text-white text-[18px] font-semibold">Card Payment</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Card preview */}
        <div className="px-6 pt-5 pb-2">
          <div className="bg-gradient-to-br from-[#383838] to-[#1a1a1a] rounded-xl p-5 text-white relative overflow-hidden h-[148px]">
            {/* Background circles decoration */}
            <div className="absolute -right-8 -top-8 w-[120px] h-[120px] rounded-full bg-white/5" />
            <div className="absolute -right-4 -bottom-10 w-[160px] h-[160px] rounded-full bg-white/5" />

            <div className="flex justify-between items-start mb-4">
              <div className="w-[40px] h-[28px] bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-[4px] opacity-90" />
              {cardBrand && (
                <span className="text-white/90 text-[13px] font-bold tracking-widest">{cardBrand}</span>
              )}
            </div>
            <p className="text-white/80 text-[18px] tracking-[3px] font-mono mb-3">
              {cardNumber || '•••• •••• •••• ••••'}
            </p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/50 text-[10px] uppercase mb-0.5">Card Holder</p>
                <p className="text-white text-[13px] font-medium truncate max-w-[180px]">
                  {cardName || 'YOUR NAME'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/50 text-[10px] uppercase mb-0.5">Expires</p>
                <p className="text-white text-[13px] font-medium">{expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-6 pt-4 space-y-4">
          {/* Card number */}
          <div>
            <label className="block text-[#383838] text-[13px] font-medium mb-1">Card Number</label>
            <input
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={e => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="0000 0000 0000 0000"
              className={`w-full border rounded-[8px] px-3 py-2.5 text-[14px] font-mono outline-none tracking-wider transition-colors ${errors.cardNumber ? 'border-red-400 focus:border-red-400' : 'border-[#d8d8d8] focus:border-[#ff4e00]'}`}
            />
            {errors.cardNumber && <p className="text-red-500 text-[11px] mt-1">{errors.cardNumber}</p>}
          </div>

          {/* Cardholder name */}
          <div>
            <label className="block text-[#383838] text-[13px] font-medium mb-1">Cardholder Name</label>
            <input
              type="text"
              value={cardName}
              onChange={e => setCardName(e.target.value.toUpperCase())}
              placeholder="AS SHOWN ON CARD"
              className={`w-full border rounded-[8px] px-3 py-2.5 text-[14px] outline-none transition-colors ${errors.cardName ? 'border-red-400 focus:border-red-400' : 'border-[#d8d8d8] focus:border-[#ff4e00]'}`}
            />
            {errors.cardName && <p className="text-red-500 text-[11px] mt-1">{errors.cardName}</p>}
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#383838] text-[13px] font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                inputMode="numeric"
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                className={`w-full border rounded-[8px] px-3 py-2.5 text-[14px] outline-none transition-colors ${errors.expiry ? 'border-red-400 focus:border-red-400' : 'border-[#d8d8d8] focus:border-[#ff4e00]'}`}
              />
              {errors.expiry && <p className="text-red-500 text-[11px] mt-1">{errors.expiry}</p>}
            </div>
            <div>
              <label className="block text-[#383838] text-[13px] font-medium mb-1">CVV</label>
              <input
                type="password"
                inputMode="numeric"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="•••"
                className={`w-full border rounded-[8px] px-3 py-2.5 text-[14px] outline-none transition-colors ${errors.cvv ? 'border-red-400 focus:border-redv-400' : 'border-[#d8d8d8] focus:border-[#ff4e00]'}`}
              />
              {errors.cvv && <p className="text-red-500 text-[11px] mt-1">{errors.cvv}</p>}
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            className="w-full py-3 bg-[#ff4e00] text-white rounded-[8px] text-[15px] font-semibold hover:bg-[#e04400] transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <Lock size={15} />
            Pay P{total.toLocaleString()}
          </button>

          <p className="text-center text-[11px] text-[#9d9d9d] flex items-center justify-center gap-1">
            <Lock size={10} />
            Your payment is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Success Modal ─── */
function SuccessModal({ total, method, onClose }: { total: number; method: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[360px] p-8 text-center">
        <div className="w-[72px] h-[72px] bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-[#383838] text-[22px] font-semibold mb-1">Payment Successful!</h2>
        <p className="text-[#5d5d5d] text-[13px] mb-4">Paid via {method}</p>
        <div className="bg-[#fff5f2] rounded-xl py-4 mb-6">
          <p className="text-[#5d5d5d] text-[13px]">Amount Charged</p>
          <p className="text-[#ff4e00] text-[38px] font-bold">P{total.toLocaleString()}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#ff4e00] text-white rounded-[8px] text-[15px] font-semibold hover:bg-[#e04400] transition-colors"
        >
          New Transaction
        </button>
      </div>
    </div>
  );
}

/* ─���─ Main Page ─── */
export default function PointOfSale() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [category, setCategory] = useState('All');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'GCash'>('Cash');
  const [showCardModal, setShowCardModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filtered = category === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
    );
  };

  const removeItem = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (paymentMethod === 'Card') {
      setShowCardModal(true);
    } else {
      setShowSuccess(true);
    }
  };

  const handleCardPay = () => {
    setShowCardModal(false);
    setShowSuccess(true);
  };

  const handleNewTransaction = () => {
    setCart([]);
    setShowSuccess(false);
    setShowCardModal(false);
  };

  return (
    <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 150px)' }}>
      {/* ── Left: Product grid ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Category filter bar */}
        <div className="px-6 py-4 bg-white border-b border-[#e9e9e9] flex items-center gap-2 flex-wrap shrink-0">
          <h1 className="text-[#ff4e00] text-[20px] font-semibold mr-3">Point of Sale</h1>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-[13px] font-medium transition-colors ${
                category === cat
                  ? 'bg-[#ff4e00] text-white'
                  : 'bg-[#f0f0f0] text-[#383838] hover:bg-[#e0e0e0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map(product => {
              const inCart = cart.find(i => i.id === product.id);
              return (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className={`bg-white rounded-[14px] border overflow-hidden text-left hover:shadow-md hover:border-[#ff4e00] transition-all duration-150 relative group ${
                    inCart ? 'border-[#ff4e00] shadow-sm' : 'border-[#e9e9e9]'
                  }`}
                >
                  {/* Product photo */}
                  <div className="relative h-[130px] bg-[#f5f5f5] overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Cart badge */}
                    {inCart && (
                      <div className="absolute top-2 right-2 w-[22px] h-[22px] bg-[#ff4e00] rounded-full flex items-center justify-center shadow">
                        <span className="text-white text-[11px] font-bold">{inCart.qty}</span>
                      </div>
                    )}
                    {/* Add overlay on hover */}
                    <div className="absolute inset-0 bg-[#ff4e00]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-[36px] h-[36px] bg-[#ff4e00] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus size={18} className="text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Product info */}
                  <div className="p-3">
                    <p className="text-[#383838] text-[12px] font-medium leading-tight mb-0.5 truncate">{product.name}</p>
                    <p className="text-[#9d9d9d] text-[10px] mb-1">{product.category}</p>
                    <p className="text-[#ff4e00] text-[14px] font-semibold">P{product.price.toLocaleString()}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Right: Cart panel ── */}
      <div className="w-[330px] xl:w-[370px] bg-white border-l border-[#e9e9e9] flex flex-col shrink-0">
        {/* Cart header */}
        <div className="px-5 py-4 border-b border-[#e9e9e9] flex items-center gap-2">
          <ShoppingCart size={20} className="text-[#ff4e00]" />
          <h2 className="text-[#383838] text-[17px] font-semibold">Cart</h2>
          <span className="ml-auto bg-[#ff4e00] text-white text-[11px] font-bold w-[22px] h-[22px] rounded-full flex items-center justify-center">
            {cart.reduce((s, i) => s + i.qty, 0)}
          </span>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <ShoppingCart size={40} className="text-[#d8d8d8] mb-3" />
              <p className="text-[#5d5d5d] text-[14px]">Cart is empty</p>
              <p className="text-[#9d9d9d] text-[12px] mt-1">Click a product to add it</p>
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3 bg-[#fafafa] rounded-[10px] p-2.5 border border-[#f0f0f0]">
                  {/* Thumbnail */}
                  <div className="w-[44px] h-[44px] rounded-[8px] overflow-hidden shrink-0 bg-[#f0f0f0]">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#383838] text-[12px] font-medium truncate">{item.name}</p>
                    <p className="text-[#ff4e00] text-[11px]">P{(item.price * item.qty).toLocaleString()}</p>
                  </div>
                  {/* Qty controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-[20px] h-[20px] bg-[#e9e9e9] rounded-full flex items-center justify-center hover:bg-[#d8d8d8] transition-colors"
                    >
                      <Minus size={9} />
                    </button>
                    <span className="w-[18px] text-center text-[12px] font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-[20px] h-[20px] bg-[#ff4e00] rounded-full flex items-center justify-center hover:bg-[#e04400] transition-colors"
                    >
                      <Plus size={9} className="text-white" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#d8d8d8] hover:text-red-400 transition-colors ml-1 shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment summary */}
        <div className="px-5 py-4 border-t border-[#e9e9e9] space-y-2 shrink-0">
          <div className="flex justify-between text-[13px] text-[#5d5d5d]">
            <span>Subtotal</span>
            <span>P{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[13px] text-[#5d5d5d]">
            <span>VAT (12%)</span>
            <span>P{tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[15px] font-semibold text-[#383838] border-t border-[#e9e9e9] pt-2 mt-1">
            <span>Total</span>
            <span className="text-[#ff4e00]">P{total.toLocaleString()}</span>
          </div>

          {/* Payment method */}
          <div className="pt-1">
            <p className="text-[#5d5d5d] text-[11px] mb-2 uppercase tracking-wide">Payment Method</p>
            <div className="grid grid-cols-3 gap-2">
              {(['Cash', 'Card', 'GCash'] as const).map(method => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 rounded-[8px] text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 ${
                    paymentMethod === method
                      ? 'bg-[#ff4e00] text-white shadow-sm'
                      : 'bg-[#f5f5f5] text-[#383838] hover:bg-[#ebebeb]'
                  }`}
                >
                  {method === 'Card' && <CreditCard size={12} />}
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Checkout button */}
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full py-3 bg-[#ff4e00] text-white rounded-[8px] text-[15px] font-semibold hover:bg-[#e04400] transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-1"
          >
            Charge P{total.toLocaleString()}
          </button>
        </div>
      </div>

      {/* ── Modals ── */}
      {showCardModal && (
        <CardDetailsModal
          total={total}
          onClose={() => setShowCardModal(false)}
          onPay={handleCardPay}
        />
      )}
      {showSuccess && (
        <SuccessModal
          total={total}
          method={paymentMethod}
          onClose={handleNewTransaction}
        />
      )}
    </div>
  );
}