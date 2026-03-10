import React, { createContext, useContext, useState } from 'react';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Attendee {
  id: number;
  customerId: number;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
}

export interface Workshop {
  id: number;
  title: string;
  date: string;
  capacity: number;
  spotsLeft: number;
  price: string;
  attendees: Attendee[];
}

interface AppContextType {
  customers: Customer[];
  workshops: Workshop[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  deleteCustomer: (id: number) => void;
  updateCustomer: (customer: Customer) => void;
  addWorkshop: (workshop: Omit<Workshop, 'id' | 'attendees'>) => void;
  registerCustomerForWorkshop: (workshopId: number, customer: Customer) => void;
  isCustomerRegistered: (workshopId: number, customerId: number) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

const initialCustomers: Customer[] = [
  { id: 1, name: 'Mark Smith', email: 'mark.smith@gmail.com', phone: '1+ 23 4567 890' },
  { id: 2, name: 'Susan Anderson', email: 'susananderson@gmail.com', phone: '1+ 23 4567 890' },
  { id: 3, name: 'Richard Mann', email: 'richard.mann@gmail.com', phone: '1+ 23 4567 890' },
  { id: 4, name: 'Jason Marcus', email: 'jason.marcus@gmail.com', phone: '1+ 23 4567 890' },
  { id: 5, name: 'David Johnson', email: 'davild.johnson@gmail.com', phone: '1+ 23 4567 890' },
  { id: 6, name: 'Michael Bain', email: 'michael.bain@gmail.com', phone: '1+ 23 4567 890' },
  { id: 7, name: 'Ricky Jass', email: 'ricky.jass@gmail.com', phone: '1+ 23 4567 890' },
  { id: 8, name: 'Sarah Miller', email: 'sarah.miller@gmail.com', phone: '1+ 23 4567 890' },
  { id: 9, name: 'John Smith', email: 'john.smith@gmail.com', phone: '1+ 23 4567 890' },
  { id: 10, name: 'Emma Brown', email: 'emma.brown@gmail.com', phone: '1+ 23 4567 890' },
  { id: 11, name: 'Lisa Taylor', email: 'lisa.taylor@gmail.com', phone: '1+ 23 4567 890' },
  { id: 12, name: 'Chris Wilson', email: 'chris.wilson@gmail.com', phone: '1+ 23 4567 890' },
];

const initialWorkshops: Workshop[] = [
  {
    id: 1,
    title: 'Flower Arrangement Workshop',
    date: 'Oct. 20, 2025 - 10PM',
    capacity: 20,
    spotsLeft: 11,
    price: 'P50',
    attendees: [
      { id: 1, customerId: 101, name: 'Susan Santos', email: 'susan.santos@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 3, 2025 | 4:40 PM' },
      { id: 2, customerId: 102, name: 'Mildred Dela Cruz', email: 'mildred.delacruz@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 4, 2025 | 6:10 PM' },
      { id: 3, customerId: 103, name: 'Cristy Villar', email: 'cristy.villar@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 5, 2025 | 8:00 PM' },
      { id: 4, customerId: 104, name: 'Sarah Cruz', email: 'sarah.cruz@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 6, 2025 | 1:25 PM' },
      { id: 5, customerId: 105, name: 'Stella May Santos', email: 'stella.santos@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 6, 2025 | 4:20 PM' },
      { id: 6, customerId: 106, name: 'Kim Dela Cruz', email: 'kim.delacruz@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 7, 2025 | 5:30 PM' },
      { id: 7, customerId: 107, name: 'Michelle Villar', email: 'michelle.villar@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct7, 2025 | 6:00 PM' },
      { id: 8, customerId: 108, name: 'Christine Santos', email: 'christine.santos@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 8, 2025 | 5:30 PM' },
      { id: 9, customerId: 109, name: 'Grace Reyes', email: 'grace.reyes@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 9, 2025 | 3:00 PM' },
      { id: 10, customerId: 110, name: 'Anna Lopez', email: 'anna.lopez@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 10, 2025 | 2:00 PM' },
      { id: 11, customerId: 111, name: 'Maria Garcia', email: 'maria.garcia@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 10, 2025 | 4:30 PM' },
      { id: 12, customerId: 112, name: 'Rosa Flores', email: 'rosa.flores@gmail.com', phone: '1+ 23 4567 890', registeredAt: 'Oct 11, 2025 | 10:00 AM' },
    ],
  },
  { id: 2, title: 'Flower Growing Workshop', date: 'Oct. 20, 2025 - 10PM', capacity: 30, spotsLeft: 5, price: 'P100', attendees: [] },
  { id: 3, title: 'Flower Arrangement Workshop', date: 'Oct. 20, 2025 - 10PM', capacity: 50, spotsLeft: 45, price: 'P75', attendees: [] },
  { id: 4, title: 'Flower Growing Workshop', date: 'Oct. 20, 2025 - 10PM', capacity: 20, spotsLeft: 10, price: 'P80', attendees: [] },
  { id: 5, title: 'Flower Arrangement Workshop', date: 'Oct. 20, 2025 - 10PM', capacity: 10, spotsLeft: 6, price: 'P100', attendees: [] },
  { id: 6, title: 'Flower Growing Workshop', date: 'Oct. 20, 2025 - 10PM', capacity: 30, spotsLeft: 3, price: 'P50', attendees: [] },
  { id: 7, title: 'Flower Arrangement Workshop', date: 'Oct. 20, 2025 - 10PM', capacity: 20, spotsLeft: 12, price: 'P60', attendees: [] },
  { id: 8, title: 'Flower Growing Workshop', date: 'Oct. 20, 2025 - 10PM', capacity: 50, spotsLeft: 40, price: 'P75', attendees: [] },
  { id: 9, title: 'Flower Arrangement Workshop', date: 'Nov. 5, 2025 - 2PM', capacity: 25, spotsLeft: 8, price: 'P55', attendees: [] },
  { id: 10, title: 'Flower Growing Workshop', date: 'Nov. 5, 2025 - 2PM', capacity: 35, spotsLeft: 15, price: 'P90', attendees: [] },
  { id: 11, title: 'Flower Arrangement Workshop', date: 'Nov. 10, 2025 - 6PM', capacity: 20, spotsLeft: 2, price: 'P70', attendees: [] },
  { id: 12, title: 'Flower Growing Workshop', date: 'Nov. 10, 2025 - 6PM', capacity: 40, spotsLeft: 20, price: 'P85', attendees: [] },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [workshops, setWorkshops] = useState<Workshop[]>(initialWorkshops);
  const [nextCustomerId, setNextCustomerId] = useState(13);
  const [nextWorkshopId, setNextWorkshopId] = useState(13);

  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    setCustomers(prev => [...prev, { ...customer, id: nextCustomerId }]);
    setNextCustomerId(n => n + 1);
  };

  const deleteCustomer = (id: number) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const updateCustomer = (updated: Customer) => {
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const addWorkshop = (workshop: Omit<Workshop, 'id' | 'attendees'>) => {
    setWorkshops(prev => [...prev, { ...workshop, id: nextWorkshopId, attendees: [] }]);
    setNextWorkshopId(n => n + 1);
  };

  const registerCustomerForWorkshop = (workshopId: number, customer: Customer) => {
    setWorkshops(prev => prev.map(w => {
      if (w.id !== workshopId) return w;
      const alreadyRegistered = w.attendees.some(a => a.customerId === customer.id);
      if (alreadyRegistered) return w;
      const now = new Date();
      const registeredAt = now.toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true
      });
      const newAttendee: Attendee = {
        id: w.attendees.length + 1,
        customerId: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        registeredAt,
      };
      return {
        ...w,
        spotsLeft: Math.max(0, w.spotsLeft - 1),
        attendees: [...w.attendees, newAttendee],
      };
    }));
  };

  const isCustomerRegistered = (workshopId: number, customerId: number) => {
    const workshop = workshops.find(w => w.id === workshopId);
    if (!workshop) return false;
    return workshop.attendees.some(a => a.customerId === customerId);
  };

  return (
    <AppContext.Provider value={{
      customers, workshops,
      addCustomer, deleteCustomer, updateCustomer,
      addWorkshop, registerCustomerForWorkshop, isCustomerRegistered,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
