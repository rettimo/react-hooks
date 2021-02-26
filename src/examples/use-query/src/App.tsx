import { useState, useCallback, useEffect } from 'react'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export function useQuery<T>(
  url: string,
  immediate = true,
): {
  execute: () => Promise<any>
  loading: boolean
  data: T | null
  error: boolean
} {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<boolean>(false)

  const execute = useCallback(async () => {
    setLoading(true)

    const response: Response = await fetch(url)
    const value: T = await response.json()
    setLoading(false)

    if (response.ok) {
      setData(value)
    } else {
      setError(true)
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, loading, data, error }
}

export const App = () => {
  const { error, loading, data, execute } = useQuery<Todo[]>(
    'https://jsonplaceholder.typicode.com/todos',
    false,
  )

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error...</h1>
  }

  return (
    <div>
      <button onClick={execute}>Get todos</button>
      {data && data.map(({ id, title }) => <h1 key={id}>{title}</h1>)}
    </div>
  )
}
