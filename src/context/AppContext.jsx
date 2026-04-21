import { useEffect, useMemo, useReducer } from 'react'
import { fetchActivities, fetchToken } from '../services/api'
import { ACTIONS, appReducer } from '../reducer/AppReducer'
import { isValidActivity, normalizeActivity } from '../utils/activityUtils'
import { AppContext } from './AppContextObject'

const initialState = {
  loading: true,
  error: '',
  activities: [],
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })

      try {
        const token = await fetchToken()
        const dataset = await fetchActivities(token)

        if (!Array.isArray(dataset)) {
          throw new Error('Dataset is not an array.')
        }

        const normalized = dataset.map(normalizeActivity)

        if (isMounted) {
          dispatch({ type: ACTIONS.SET_DATA, payload: normalized })
        }
      } catch (error) {
        if (isMounted) {
          dispatch({
            type: ACTIONS.SET_ERROR,
            payload: error?.message || 'Failed to load activities.',
          })
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  const value = useMemo(() => {
    const validActivities = state.activities.filter(isValidActivity)

    return {
      ...state,
      validActivities,
      dispatch,
    }
  }, [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
