export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR',
  TOGGLE_GOAL_ACHIEVED: 'TOGGLE_GOAL_ACHIEVED',
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }

    case ACTIONS.SET_DATA:
      return {
        ...state,
        loading: false,
        error: '',
        activities: action.payload,
      }

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case ACTIONS.TOGGLE_GOAL_ACHIEVED: {
      const id = String(action.payload)

      const updatedActivities = state.activities.map((activity) => {
        if (String(activity.activityId) !== id) {
          return activity
        }

        const nextGoal = activity.steps >= 8000 ? true : !activity.goalAchieved

        if (nextGoal === activity.goalAchieved) {
          return activity
        }

        return {
          ...activity,
          goalAchieved: nextGoal,
        }
      })

      return {
        ...state,
        activities: updatedActivities,
      }
    }

    default:
      return state
  }
}
