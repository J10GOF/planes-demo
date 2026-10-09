import { Navigate, Route, Routes } from 'react-router-dom'
import { DemoProvider, useDemo } from './context/DemoContext'
import AppShell from './components/AppShell'
import LoginPage from './pages/LoginPage'
import ExplorePage from './pages/ExplorePage'
import BusinessPlansPage from './pages/BusinessPlansPage'
import MyPlansPage from './pages/MyPlansPage'
import PlanDetailPage from './pages/PlanDetailPage'
import CreatePlanPage from './pages/CreatePlanPage'

function ProtectedLayout() {
  const { user } = useDemo()
  return user ? <AppShell/> : <Navigate to="/login" replace />
}

function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<LoginPage/>}/>
    <Route element={<ProtectedLayout/>}>
      <Route path="/" element={<ExplorePage/>}/>
      <Route path="/negocios" element={<BusinessPlansPage/>}/>
      <Route path="/mis-planes" element={<MyPlansPage/>}/>
      <Route path="/planes/:planId" element={<PlanDetailPage/>}/>
      <Route path="/crear" element={<CreatePlanPage/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/" replace />}/>
  </Routes>
}

export default function App() {
  return <DemoProvider><AppRoutes/></DemoProvider>
}
