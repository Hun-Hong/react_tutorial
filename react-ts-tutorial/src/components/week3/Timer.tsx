import { useReducer, useRef, useEffect } from 'react';
import type { TimerAction, TimerState } from './types/TimerType';
/*
힌트:
- setInterval 대신 requestAnimationFrame 사용하면 더 정확함
- Date.now()로 실제 시간 기반 계산
- useRef는 값이 변해도 리렌더링되지 않으므로 intervalId 저장에 적합
- cleanup 함수에서 clearInterval 필수

*/
const StopwatchApp = () => {
  const lapTimes = useRef<number[]>([])
  const startTime = useRef<number>(0)
  const accTime = useRef<number>(0)

  function stopwatchReducer(state: TimerState, action: TimerAction) {
    switch (action.type) {
      case "START": {
        if (state.isRunning) {
          return state
        }
        accTime.current = 0
        startTime.current = Date.now()

        return {
          time: 0,
          isRunning: true,
          lapTimes: lapTimes.current,
          startTime: startTime.current
        }
      }
      case "PAUSE": {
        if (state.isRunning) {
          accTime.current = state.time
          return {
            ...state,
            isRunning: false
          }
        }
        else {
          startTime.current = Date.now()
          return {
            ...state,
            isRunning: true
          }
        }

      }
      case "RESET": {
        accTime.current = 0
        lapTimes.current = []
        startTime.current = 0

        return {
          ...state,
          time: 0,
          isRunning: false,
          lapTimes: lapTimes.current,
          startTime: startTime.current
        }
      }
      case "UPDATE_TIME": {
        if (state.isRunning) {
          return {
            ...state,
            time: accTime.current + (Date.now() - startTime.current)
          }
        }
        return state
      }
      case "ADD_LAP": {
        lapTimes.current.push(state.time)
        return {
          ...state,
          lapTimes: [...lapTimes.current]
        }
      }
      case "REMOVE_LAP": {
        lapTimes.current.pop()
        return {
          ...state,
          lapTimes: [...lapTimes.current]
        }
      }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(
    stopwatchReducer,
    {
      time: 0,
      isRunning: false,
      lapTimes: [],
      startTime: 0
    }
  )

  useEffect(() => {
    let animationId: number;

    const updateTimer = () => {
      dispatch({ type: "UPDATE_TIME" })

      if (state.isRunning) {
        animationId = requestAnimationFrame(updateTimer)
      }
    }

    if (state.isRunning) {
      animationId = requestAnimationFrame(updateTimer)
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [state.isRunning])

  return (

    <div>
      <h2>Time: {state.time / 1000}</h2>
      <ul>LAP{state.lapTimes.map((lap: number, idx) => {
        return <li key={idx}>{`lap ${idx}: ${lap / 1000}`}</li>
      })}</ul>
      <button onClick={() => dispatch({ type: "START" })}>
        START
      </button>
      <button onClick={() => dispatch({ type: "PAUSE" })}>
        PAUSE
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>
        RESET
      </button>
      <button onClick={() => dispatch({ type: "ADD_LAP" })}>
        ADD LAP
      </button>
      <button onClick={() => dispatch({ type: "REMOVE_LAP" })}>
        REMOVE LAP
      </button>
    </div>
  )
};

export default StopwatchApp