import { useLocation, useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import svgPaths from '../../imports/svg-gl1lkppk8f';

function NexxByteLogo() {
  return (
    <svg fill="none" viewBox="0 0 111.217 24.2384" className="h-[22px] w-[100px]">
      <path d={svgPaths.p35e1f00} fill="#FF4E00" />
      <path d={svgPaths.p3f84db00} fill="#383838" />
      <path d={svgPaths.p387e2d00} fill="#383838" />
      <path d={svgPaths.pd3ea180} fill="#383838" />
      <path d={svgPaths.p3e529840} fill="#383838" />
      <path d={svgPaths.p1a2e7680} fill="#FF4E00" />
      <path d={svgPaths.p326996f2} fill="#FF4E00" />
      <path d={svgPaths.p3a897f80} fill="#383838" />
      <path d={svgPaths.pc62baf0} fill="#383838" />
      <path d={svgPaths.p11c05700} fill="#383838" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg fill="none" viewBox="0 0 36.6439 34.3346" className="w-[22px] h-[22px]">
      <path d={svgPaths.peb5e00} fill="#FF4E00" />
      <path d={svgPaths.p2b264b00} fill="#FF4E00" />
      <path d={svgPaths.pc47b200} fill="#FF4E00" />
      <path d={svgPaths.p316d4100} fill="#FF4E00" />
      <path d={svgPaths.p3b947d00} fill="#FF4E00" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg fill="none" viewBox="0 0 19 19" className="w-[18px] h-[18px]">
      <path d={svgPaths.p27342900} fill="#FF4E00" />
      <path d={svgPaths.p1e70a00} fill="#FF4E00" />
    </svg>
  );
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isWorkshopActive = pathname.startsWith('/workshops');
  const isSalesActive = pathname === '/sales';
  const isPosActive = pathname === '/pos';
  const isInventoryActive = pathname === '/inventory';

  const navLinks = [
    { label: 'Sales & Orders', path: '/sales', active: isSalesActive },
    { label: 'Point of Sale', path: '/pos', active: isPosActive },
    { label: 'Workshop', path: '/workshops', active: isWorkshopActive },
    { label: 'Inventory', path: '/inventory', active: isInventoryActive },
  ];

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setShowUserMenu(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/');
  };

  return (
    <>
      <header className="h-[85px] bg-white/90 border-b border-[#d8d8d8] flex items-center px-8 sticky top-0 z-50 backdrop-blur-sm shrink-0">
        {/* Left: Logo — click to go home */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity"
        >
          <NexxByteLogo />
          <div className="w-[2px] h-[28px] bg-[#ff4e00]" />
          <span className="text-[#383838] text-[18px] font-medium whitespace-nowrap">Flowershop CRM</span>
        </button>

        {/* Center: Nav links */}
        <nav className="flex items-center gap-6 ml-10 flex-1">
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`text-[14px] whitespace-nowrap transition-colors ${
                link.active
                  ? 'text-[#ff4e00] font-semibold'
                  : 'text-[#383838] hover:text-[#ff4e00]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 shrink-0 ml-4">
          {/* Chat icon with badge */}
          <div className="relative cursor-pointer">
            <ChatIcon />
            <div className="absolute -top-2 -right-2 w-[16px] h-[16px] bg-[#424242] rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-semibold">3</span>
            </div>
          </div>

          <div className="w-[1px] h-[46px] bg-[#cacaca]" />

          {/* Customers button */}
          <button
            onClick={() => navigate('/customers')}
            className={`px-4 py-2 rounded-[6px] border text-[15px] font-semibold transition-colors ${
              pathname === '/customers'
                ? 'bg-[#ff4e00] border-[#ff4e00] text-white'
                : 'bg-white border-[#ff4e00] text-[#ff4e00] hover:bg-[#ff4e00] hover:text-white'
            }`}
          >
            Customers
          </button>

          <div className="w-[1px] h-[46px] bg-[#cacaca]" />

          {/* User dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(v => !v)}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <UserIcon />
              <span className="text-[#ff4e00] text-[15px] font-medium">John Anderson</span>
              <ChevronDown
                size={14}
                className={`text-[#ff4e00] transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-[180px] bg-white border border-[#e9e9e9] rounded-[10px] shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-[#f0f0f0]">
                  <p className="text-[#383838] text-[13px] font-medium">John Anderson</p>
                  <p className="text-[#5d5d5d] text-[11px]">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-[14px] text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-xl shadow-2xl w-[380px] p-8 text-center">
            <div className="w-[56px] h-[56px] bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut size={24} className="text-red-500" />
            </div>
            <h2 className="text-[#383838] text-[20px] font-semibold mb-2">Log Out</h2>
            <p className="text-[#5d5d5d] text-[14px] mb-8">Are you sure you want to log out of Flowershop CRM?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2 border border-[#d8d8d8] text-[#383838] rounded-[6px] text-[15px] font-medium hover:bg-[#f5f5f5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-2 bg-red-500 text-white rounded-[6px] text-[15px] font-medium hover:bg-red-600 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
