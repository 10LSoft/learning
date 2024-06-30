import { useState } from 'react'

const useStateComponent = () => {
  const [clicks, setClicks] = useState(0)

  return (
    <div>
      <button onClick={setClicks(clicks + 1)}>
        Você clicou {clicks} {clicks === 1 ? 'vezes' : 'vez'}
      </button>
    </div>
  )
}

export default useStateComponent
