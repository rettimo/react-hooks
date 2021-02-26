import { useRef, useState, useEffect, RefObject } from 'react'

type Event = MouseEvent | TouchEvent

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  clickOutside: (event: Event) => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current
      if (!el || el.contains((event?.target as Node) || null)) {
        return
      }
      clickOutside(event)
    }
    document.addEventListener(`mousedown`, listener)
    document.addEventListener(`touchstart`, listener)
    return () => {
      document.removeEventListener(`mousedown`, listener)
      document.removeEventListener(`touchstart`, listener)
    }
  }, [ref, clickOutside])
}

export const App = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  const onClickInside = () => {
    if (!open) {
      console.log('click inside')
      setOpen(true)
    }
  }

  const onClickOutside = () => {
    if (open) {
      console.log('click outside')
      setOpen(false)
    }
  }

  useClickOutside(ref, onClickOutside)

  return (
    <>
      <div
        ref={ref}
        onClick={onClickInside}
        style={{
          width: 100,
          height: 100,
          backgroundColor: `${open ? 'red' : 'blue'}`,
          cursor: 'pointer',
        }}
      />
      {!open ? <h1>Click inside square</h1> : <h1>Click outside square</h1>}
    </>
  )
}
