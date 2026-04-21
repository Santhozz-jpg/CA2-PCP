import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import { getEfficiency, getSafeDate, getSafeName } from '../utils/activityUtils'

function ActivityDetailPage() {
  const { id } = useParams()
  const { loading, error, validActivities } = useAppContext()

  const activity = useMemo(
    () => validActivities.find((item) => String(item.activityId) === String(id)),
    [id, validActivities],
  )

  if (loading) {
    return <p>Loading activity details...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!id || !activity) {
    return <p>Activity not found</p>
  }

  const efficiency = getEfficiency(activity)

  return (
    <section>
      <h1>Activity Detail</h1>
      <p>ID: {activity.activityId}</p>
      <p>Name: {getSafeName(activity.name)}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Goal Achieved: {String(activity.goalAchieved)}</p>
      <p>Date: {getSafeDate(activity.date)}</p>
      <p>Efficiency Score: {Number.isFinite(efficiency) ? efficiency.toFixed(2) : '0.00'}</p>
    </section>
  )
}

export default ActivityDetailPage
