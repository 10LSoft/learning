import { useReducer, useState } from 'react'

const UseReducerHook = () => {
  const [myNumber, dispatch] = useReducer((state, _) => {
    return Math.random(state)
  })

  return (
    <div>
      <h1>Using useReducer</h1>
      <p>O número atual é {myNumber}</p>
      <button onClick={dispatch}>Sortear número</button>
    </div>
  )
}

export { UseReducerHook }

const TodoUsingReduceHook = () => {
  const [task, setTesk] = useState('')

  const manageTasks = (state, action) => {
    const cases = {
      ADD: () => { }
    }
  }
}
