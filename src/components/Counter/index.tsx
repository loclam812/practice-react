import React, { useState } from 'react'

import Button from '../common/Button'

import './counter.scss'

export default function Counter () {
  const [count, setCount] = useState(0)

  const handleIncrease = () => {
    setCount(count + 1);
  }

  const handleReset = () => {
    setCount(0);
  }

  return (
    <div className="component-counter">
      <h2 className="component-counter__title">Counter</h2>
      <div className="component-counter__content">
        <Button
          handleClick={handleReset}
          isDisabled={!count}
        >
          Reset
        </Button>
        <div className="component-counter__content-count">
          {count}
        </div>
        <Button classModifier="--blue" handleClick={handleIncrease}>
          Increase
        </Button>
      </div>
    </div>
  )
}
