import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import ActivitiesPage from '../pages/ActivitiesPage'
import ActivityDetailPage from '../pages/ActivityDetailPage'
import FilterPage from '../pages/FilterPage'
import StatsPage from '../pages/StatsPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/activities">Activities</Link>{' '}
        <Link to="/filter">Filter</Link>{' '}
        <Link to="/stats">Stats</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/activities" replace />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<ActivityDetailPage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
