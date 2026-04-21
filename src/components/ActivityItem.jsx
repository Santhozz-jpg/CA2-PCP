import { getSafeDate, getSafeName } from '../utils/activityUtils'
import { Link } from 'react-router-dom'

function ActivityItem({ activity, onToggleGoal, showToggle = true }) {
  return (
    <li data-testid="activity-item">
      <p>ID: {activity.activityId}</p>
      <p>Name: {getSafeName(activity.name)}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Goal Achieved: {String(activity.goalAchieved)}</p>
      <p>Date: {getSafeDate(activity.date)}</p>
      <p>
        <Link to={`/activities/${activity.activityId}`}>View Detail</Link>
      </p>
      {showToggle && (
        <button type="button" onClick={() => onToggleGoal(activity.activityId)}>
          Toggle Goal
        </button>
      )}
    </li>
  )
}

export default ActivityItem
