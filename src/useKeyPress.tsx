import { useState, useEffect, useCallback } from 'react'

//! Unstable hook

export const App = () => {
  const happyPress = useKeyPress('Escape')
  const sadPress = useKeyPress('w')
  const robotPress = useKeyPress('e')
  const foxPress = useKeyPress('r')

  return (
    <div>
      <div>q, w, e, r</div>
      <div>
        {happyPress && '😊'}
        {sadPress && '😢'}
        {robotPress && '🤖'}
        {foxPress && '🦊'}
      </div>
    </div>
  )
}

const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = useCallback(
    ({ key }) => {
      console.log(key)

      if (key === targetKey) {
        setKeyPressed(true)
      }
    },
    [targetKey],
  )

  const upHandler = useCallback(
    ({ key }) => {
      console.log(key)

      if (key === targetKey) {
        setKeyPressed(false)
      }
    },
    [targetKey],
  )

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [downHandler, upHandler])

  return keyPressed
}
