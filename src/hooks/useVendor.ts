import { useState } from 'react';
import { Vendor } from '../types';

export const useVendor = () => {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      name: "John Smith",
      title: "Electrical Contractor",
      phone: "555-0123",
      email: "john@example.com"
    },
    {
      name: "Sarah Johnson",
      title: "Plumbing Supervisor",
      phone: "555-0124",
      email: "sarah@example.com"
    },
    {
      name: "Mike Brown",
      title: "HVAC Specialist",
      phone: "555-0125",
      email: "mike@example.com"
    }
  ]);

  const addVendor = (vendor: Vendor) => {
    setVendors([...vendors, vendor]);
  };

  return {
    vendors,
    addVendor
  };
};