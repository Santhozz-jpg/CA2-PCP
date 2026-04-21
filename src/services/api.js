const getJson = async (response) => {
  const text = await response.text()
  if (!text) {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

export const fetchToken = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const studentId = import.meta.env.VITE_STUDENT_ID
  const password = import.meta.env.VITE_STUDENT_PASSWORD

  if (!baseUrl || !studentId || !password) {
    throw new Error(
      'Missing API env vars. Set VITE_API_BASE_URL, VITE_STUDENT_ID, VITE_STUDENT_PASSWORD.',
    )
  }

  const response = await fetch(`${baseUrl}/public/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ studentId, password }),
  })

  const data = await getJson(response)

  if (!response.ok || !data.token) {
    throw new Error('Unable to fetch token. Check credentials and API URL.')
  }

  return data.token
}

export const fetchActivities = async (token) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  if (!baseUrl) {
    throw new Error('Missing API env var: VITE_API_BASE_URL.')
  }

  const response = await fetch(`${baseUrl}/private/data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await getJson(response)

  if (!response.ok) {
    throw new Error('Unable to fetch private data. Token may be invalid or expired.')
  }

  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data.data)) {
    return data.data
  }

  if (Array.isArray(data.activities)) {
    return data.activities
  }

  throw new Error('Private data format is invalid. Expected an array dataset.')
}
