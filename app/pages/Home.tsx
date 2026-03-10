import { useNavigate } from 'react-router';
import svgPaths from '../../imports/svg-gl1lkppk8f';
import imgRectangle3 from 'figma:asset/1b26c5c01b363cc549e2cf3aac180aae04d7a39f.png';
import imgRectangle4 from 'figma:asset/c99cf9259dd1f1609482e04bcdb2f6ea91bac762.png';

function SalesOrdersIcon() {
  return (
    <svg fill="none" viewBox="0 0 107.307 107.329" className="w-full h-full">
      <path d={svgPaths.p30d7bc00} fill="#FF4E00" />
      <path d={svgPaths.p22e0aa80} fill="#FF4E00" />
      <path d={svgPaths.p3443fa00} fill="#FF4E00" />
      <path d={svgPaths.pbb0e000} fill="#FF4E00" />
      <path d={svgPaths.p14228400} fill="#FF4E00" />
      <path d={svgPaths.p1ac02d00} fill="#FF4E00" />
    </svg>
  );
}

function PointOfSaleIcon() {
  return (
    <svg fill="none" viewBox="0 0 112.108 112.122" className="w-full h-full">
      <path d={svgPaths.p21d90100} fill="#FF4E00" />
      <path d={svgPaths.p343b5f80} fill="#FF4E00" />
      <path d={svgPaths.p1c82a00} fill="#FF4E00" />
      <path d={svgPaths.p1a495680} fill="#FF4E00" />
      <path d={svgPaths.p170bdb00} fill="#FF4E00" />
      <path d={svgPaths.p1dbd9d80} fill="#FF4E00" />
      <path d={svgPaths.p17eb0900} fill="#FF4E00" />
      <path d={svgPaths.p2cc74980} fill="#FF4E00" />
      <path d={svgPaths.p2d5dd300} fill="#FF4E00" />
      <path d={svgPaths.pb3f2e00} fill="#FF4E00" />
      <path d={svgPaths.p1d76d7c0} fill="#FF4E00" />
    </svg>
  );
}

function WorkshopsIcon() {
  return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 330 300" preserveAspectRatio="xMidYMid meet">
        {/* building top */}
        <g transform="translate(110,55) scale(0.95)">
          <path d={svgPaths.p4edb580} fill="#FF4E00" />
        </g>
        {/* people group bottom */}
        <g transform="translate(60,145) scale(0.92)">
          <path d={svgPaths.p3a890e80} fill="#FF4E00" />
        </g>
        {/* small person top-left */}
        <g transform="translate(108,52) scale(0.75)">
          <path d={svgPaths.pf7b6880} fill="#FF4E00" />
        </g>
        {/* horizontal line */}
        <g transform="translate(108,95) scale(0.85)">
          <path d={svgPaths.p1bca1a00} fill="#FF4E00" />
        </g>
      </svg>
    </div>
  );
}

function InventoryIcon() {
  return (
    <svg fill="none" viewBox="0 0 110.853 108.821" className="w-full h-full">
      <path d={svgPaths.pda0b600} fill="#FF4E00" />
      <path d={svgPaths.p335cb300} fill="#FF4E00" />
      <path d={svgPaths.p5d95e70} fill="#FF4E00" />
      <path d={svgPaths.p131616f0} fill="#FF4E00" />
    </svg>
  );
}

interface ModuleCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function ModuleCard({ title, icon, onClick }: ModuleCardProps) {
  return (
    <button
      onClick={onClick}
      className="relative bg-white border border-[#e9e9e9] rounded-[17px] overflow-hidden cursor-pointer hover:shadow-lg hover:border-[#ff4e00] transition-all duration-200 w-full text-left aspect-[11/10]"
    >
      <div className="absolute top-[14%] left-[20%] right-[20%] bottom-[32%]">
        {icon}
      </div>
      <div className="absolute bottom-[10%] left-0 right-0 flex justify-center">
        <p className="text-[#ff4e00] text-[22px] font-medium text-center px-4">{title}</p>
      </div>
    </button>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const modules = [
    { title: 'Sales & Orders', icon: <SalesOrdersIcon />, path: '/sales' },
    { title: 'Point of Sale', icon: <PointOfSaleIcon />, path: '/pos' },
    { title: 'Workshops', icon: <WorkshopsIcon />, path: '/workshops' },
    { title: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
  ];

  return (
    <div className="flex-1 flex bg-white overflow-hidden">
      {/* Left: Flower images — two rounded photos stacked */}
      <div className="hidden lg:flex flex-col w-[360px] xl:w-[420px] shrink-0 gap-[14px] p-[14px]">
        {/* Top photo */}
        <div className="h-[42%] rounded-[28px] overflow-hidden">
          <img
            src={imgRectangle4}
            alt="Flowers"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Bottom photo */}
        <div className="flex-1 rounded-[28px] overflow-hidden">
          <img
            src={imgRectangle3}
            alt="Flowers"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Right: Module cards */}
      <div className="flex-1 flex items-center justify-center p-6 xl:p-10">
        <div className="grid grid-cols-2 gap-4 w-full max-w-[680px]">
          {modules.map(mod => (
            <ModuleCard
              key={mod.title}
              title={mod.title}
              icon={mod.icon}
              onClick={() => navigate(mod.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
