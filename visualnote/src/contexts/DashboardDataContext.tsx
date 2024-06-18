// src/contexts/DashboardDataContext.tsx
import React, {
 createContext,
 useContext,
 useState,
 useEffect,
 ReactNode,
} from 'react';

import axios from 'axios';

type DashboardData = {
 // Define the structure of your data here
 topic: string;
 content: JSON;
 imageURL: string;
 date: Date;
};

type DashboardDataContextProps = {
 data: DashboardData | null;
};

const DashboardDataContext = createContext<
 DashboardDataContextProps | undefined
>(undefined);

export const useDashboardData = (): DashboardDataContextProps => {
 const context = useContext(DashboardDataContext);
 if (!context) {
  throw new Error(
   'useDashboardData must be used within a DashboardDataProvider'
  );
 }
 return context;
};

type DashboardDataProviderProps = {
 children: ReactNode;
};

export const DashboardDataProvider: React.FC<DashboardDataProviderProps> = ({
 children,
}) => {
 const [data, setData] = useState<DashboardData | null>(null);

 try {
  // useEffect(() => {
  //   // Fetch data from API
  //   const fetchData = async () => {
  //     const res = await axios.get('http://localhost:3000/api/notes-data');
  //     setData(res.data);
  //   };
  // }, []);
  console.log('this is the data');
 } catch (error) {
  console.log(error);
 }

 return (
  <DashboardDataContext.Provider value={{ data }}>
   {children}
  </DashboardDataContext.Provider>
 );
};
