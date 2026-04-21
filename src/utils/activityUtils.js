const toNumber = (value) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : NaN
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed === '') {
      return NaN
    }
    return Number(trimmed)
  }

  return NaN
}

const toBooleanOrNull = (value) => {
  if (typeof value === 'boolean') {
    return value
  }
  return null
}

const pick = (item, keys, fallback = undefined) => {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      return item[key]
    }
  }
  return fallback
}

export const normalizeActivity = (item) => {
  const source = item && typeof item === 'object' ? item : {}

  const normalized = {
    activityId: String(pick(source, ['activityId', 'id', 'activity_id'], '')),
    name: pick(source, ['name', 'activityName'], ''),
    steps: toNumber(pick(source, ['steps'], NaN)),
    caloriesBurned: toNumber(
      pick(source, ['caloriesBurned', 'calories_burned', 'calories'], NaN),
    ),
    workoutMinutes: toNumber(
      pick(source, ['workoutMinutes', 'workout_minutes'], NaN),
    ),
    goalAchieved: toBooleanOrNull(
      pick(source, ['goalAchieved', 'goalachieved', 'goal_achieved'], null),
    ),
    date: pick(source, ['date'], ''),
  }

  return normalized
}

export const isValidActivity = (activity) => {
  if (!activity || typeof activity !== 'object') {
    return false
  }

  return (
    activity.steps > 0 &&
    activity.caloriesBurned > 0 &&
    activity.workoutMinutes > 0 &&
    typeof activity.goalAchieved === 'boolean'
  )
}

export const getSafeName = (name) => {
  if (typeof name !== 'string' || name.trim() === '') {
    return 'Unknown'
  }
  return name
}

export const getSafeDate = (date) => {
  if (typeof date !== 'string' || date.trim() === '') {
    return 'No Date'
  }
  return date
}

export const getEfficiency = (activity) => {
  const minutes = activity?.workoutMinutes
  const calories = activity?.caloriesBurned

  if (!(minutes > 0) || !(calories >= 0)) {
    return 0
  }

  return calories / minutes
}
