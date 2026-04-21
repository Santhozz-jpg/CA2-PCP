import { useEffect, useMemo } from 'react'
import { useAppContext } from '../context/useAppContext'

function StatsPage() {
  const { loading, error, validActivities } = useAppContext()

  const stats = useMemo(() => {
    return validActivities.reduce(
      (acc, activity) => {
        acc.totalActivities += 1

        if (activity.goalAchieved === true) {
          acc.goalAchievedCount += 1
        } else if (activity.goalAchieved === false) {
          acc.goalNotAchievedCount += 1
        }

        return acc
      },
      {
        totalActivities: 0,
        goalAchievedCount: 0,
        goalNotAchievedCount: 0,
      },
    )
  }, [validActivities])

  useEffect(() => {
    window.appState = {
      totalActivities: stats.totalActivities,
      goalAchievedCount: stats.goalAchievedCount,
      goalNotAchievedCount: stats.goalNotAchievedCount,
    }

    window.appstate = {
      totalactivities: stats.totalActivities,
      goalachievedcount: stats.goalAchievedCount,
      goalnotachievedcount: stats.goalNotAchievedCount,
    }
  }, [stats])

  if (loading) {
    return <p>Loading stats...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section>
      <h1>Activities Stats</h1>
      <div data-testid="total-activities">{stats.totalActivities}</div>
      <div data-testid="goal-achieved">{stats.goalAchievedCount}</div>
      <div data-testid="goal-not-achieved">{stats.goalNotAchievedCount}</div>
    </section>
  )
}

export default StatsPage
