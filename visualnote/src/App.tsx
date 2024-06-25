import Landing from './pages/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Create from './components/DashboardTabs/Create';
import Catalog from './components/DashboardTabs/Catalog';
import { DashboardDataProvider } from './contexts/DashboardDataContext';

export function App() {
 return (
  <BrowserRouter>
   <Layout>
    <main>
     <Routes>
      <Route index element={<Landing />} />
      <Route
       path="/dashboard"
       element={
        <DashboardDataProvider>
         <Dashboard />
        </DashboardDataProvider>
       }
      >
       <Route path="create" element={<Create />} />
       <Route path="notes" element={<Catalog />} />
      </Route>
     </Routes>
    </main>
   </Layout>
  </BrowserRouter>
 );
}

export default App;
