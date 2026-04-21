import { useMemo, useState } from 'react'
import { useAppContext } from '../context/useAppContext'
import ActivityItem from '../components/ActivityItem'

function FilterPage() {
  const { loading, error, validActivities } = useAppContext()
  const [stepsInput, setStepsInput] = useState('')
  const [inputError, setInputError] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const threshold = useMemo(() => {
    if (stepsInput.trim() === '') {
      return null
    }

    return Number(stepsInput)
  }, [stepsInput])

  const filteredActivities = useMemo(() => {
    if (threshold === null || Number.isNaN(threshold)) {
      return []
    }

    return validActivities.filter((activity) => activity.steps >= threshold)
  }, [threshold, validActivities])

  const handleInputChange = (event) => {
    const value = event.target.value
    setStepsInput(value)
    setHasSubmitted(false)

    if (value.trim() === '') {
      setInputError('')
      return
    }

    if (Number.isNaN(Number(value))) {
      setInputError('Input must be a valid number')
      return
    }

    setInputError('')
  }

  const handleFilterSubmit = (event) => {
    event.preventDefault()
    setHasSubmitted(true)

    if (stepsInput.trim() === '') {
      setInputError('Input is required')
      return
    }

    if (Number.isNaN(Number(stepsInput))) {
      setInputError('Input must be a valid number')
      return
    }

    setInputError('')
  }

  if (loading) {
    return <p>Loading filter page...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section>
      <h1>Filter Activities</h1>
      <form onSubmit={handleFilterSubmit}>
        <label htmlFor="steps-filter">Minimum Steps</label>
        <input
          id="steps-filter"
          data-testid="filter-input"
          type="text"
          value={stepsInput}
          onChange={handleInputChange}
        />
        <button type="submit">Apply Filter</button>
      </form>
      {inputError && <p>{inputError}</p>}
      {!inputError && !hasSubmitted && <p>Enter a value to filter activities.</p>}
      {!inputError && hasSubmitted && threshold !== null && (
        <ul>
          {filteredActivities.map((activity) => (
            <ActivityItem
              key={activity.activityId}
              activity={activity}
              onToggleGoal={() => {}}
              showToggle={false}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default FilterPage
