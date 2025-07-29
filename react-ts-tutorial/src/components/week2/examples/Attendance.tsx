import { useReducer, useState } from "react";
import Student from "./Student";
import type { StudentInfo, Action } from "./AttendTypes";


const reducer = (state: StudentInfo, action: Action) => {
  switch (action.type) {
    case 'add-student': {
      const name = action.payload.name

      if (!name || !name.trim()) {
        return state
      }

      const newStudent = {
        id: Date.now(),
        name,
        isHere: false
      }
      return {
        count: state.count + 1,
        students: [...state.students, newStudent]
      }
    }
    case 'delete-student': {
      return {
        count: state.count - 1,
        students: state.students.filter((student) => student.id != action.payload.id) || []
      }
    }
    case 'mark-student':
      return {
        ...state,
        students: state.students.map(student => {
          if (student.id === action.payload.id) {
            return {...student, isHere: !student.isHere}
          }
          return student
        })
      }
    default:
      return state
  }
}

const initialState = {
  count: 0,
  students: []
}

function Attendance() {
  const [name, setName] = useState("")
  const [studentInfo, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <h1>출석부</h1>
      <p>총 학생 수: {studentInfo.count}</p>
      <input type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({ type: "add-student", payload: { name } })
        }}>추가</button>
      {studentInfo.students.map(student => {
        return <Student key={student.id} name={student.name} dispatch={dispatch} id={student.id} isHere={student.isHere} />
      })}
    </div>
  )
}

export default Attendance