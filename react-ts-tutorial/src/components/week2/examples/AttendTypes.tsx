import React from "react";

export type StudentType = {
  id: number;
  name: string;
  isHere: boolean;
}

export type StudentInfo = {
  count: number,
  students: StudentType[]
}

export type Payload = {
  name?: string,
  id?: number
}

export type Action = {
  type: string;
  payload: Payload;
}

export type StudentProps = {
  name: string;
  id: number;
  isHere: boolean;
  dispatch: React.Dispatch<Action>
}