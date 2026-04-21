import { useAppContext } from '../context/useAppContext'
import { ACTIONS } from '../reducer/AppReducer'
import ActivityItem from '../components/ActivityItem'

function ActivitiesPage() {
  const { loading, error, validActivities, dispatch } = useAppContext()

  const handleToggleGoal = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_GOAL_ACHIEVED, payload: id })
  }

  if (loading) {
    return <p>Loading activities...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section>
      <h1>Activities</h1>
      <ul>
        {validActivities.map((activity) => (
          <ActivityItem
            key={activity.activityId}
            activity={activity}
            onToggleGoal={handleToggleGoal}
          />
        ))}
      </ul>
    </section>
  )
}

export default ActivitiesPage
