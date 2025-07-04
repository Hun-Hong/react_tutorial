# 🧠 React + TypeScript 학습 기록

## 📖 목차
- [1. React 기초](#-day-1-이론-상세-설명-react--typescript-기초)
- [2. useState](#-day-2-이론-정리-usestate-이벤트-처리-조건부-렌더링)
- [3. 입력 필드와 객체 상태 관리](#-day-3-이론-정리-입력-필드와-객체-상태-관리)
- [4. useEffect와 API 요청](#-day-4-useeffect와-api-요청)

# 🧠 Day 1 이론 상세 설명: React + TypeScript 기초
## 1. React 기초
### 1-1. JSX (JavaScript XML)
JSX란?
JSX는 JavaScript에서 HTML처럼 생긴 문법을 사용할 수 있게 해주는 문법 확장입니다.
React에서는 UI를 선언적으로 작성하기 위해 JSX를 사용합니다.

🔍 예시
```tsx
const element = <h1>Hello, world!</h1>;
```

📌 특징
- HTML과 비슷하지만 완전히 같지 않습니다.

  - class → className

  - for → htmlFor

- JSX는 JavaScript 표현식 안에서 사용됩니다. ({} 안에 변수나 함수 가능)

### 1-2. 함수형 컴포넌트
React는 대부분 함수 기반 컴포넌트로 구성합니다.

🔧 기본 구조
```tsx
function Welcome(props: { name: string }) {
  return <h1>Hello, {props.name}</h1>;
}
```
또는 구조 분해:
```tsx
const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}</h1>;
};
```
💡 특징
- 상태 관리 (후에 useState)

- 이벤트 처리 (onClick, onChange)

- return 안에 JSX 반환

### 1-3. Props
Props는 컴포넌트 간 데이터를 전달하는 방법입니다.

👇 예시
```tsx
type UserProps = {
  nickname: string;
}

const User = ({ nickname }: UserProps) => {
  return <p>{nickname}</p>;
}
```

🔑 특징
- Props는 읽기 전용입니다.

- 부모 컴포넌트가 자식 컴포넌트에게 값 전달

- 여러 개도 전달 가능 (객체로 묶여 있음)

## 2. TypeScript 기초
### 2-1. TypeScript의 목적
TypeScript는 JavaScript에 정적 타입을 추가한 언어입니다.
즉, 실행 전에 타입 오류를 잡아줄 수 있어 더 안전한 코드를 작성할 수 있습니다.

### 2-2. 주요 기본 타입
|타입|예시|
|-------|-------|
|string|"hello"|
|number|1, 3.14|
|boolean|true, false|
|Array|string[], number[]|
|object|{ key: value }|
|any|아무 타입이나 가능 (지양)|
|unknown|어떤 타입인지 모름 (제한적 사용)|

### 2-3. 인터페이스 / 타입 정의
✏️ type과 interface 차이
```ts
type Profile = {
  name: string;
  age: number;
};

interface Profile {
  name: string;
  age: number;
}
```

- type: 유니언 타입, 매핑 등 고급 타입 조합이 강함

- interface: 주로 컴포넌트의 props 정의에 많이 사용, 확장성 좋음

둘 다 props 타입 지정에 쓸 수 있어요. 큰 차이는 없지만 type을 더 자주 보게 될 수 있어요.

### 2-4. 컴포넌트에 타입 적용
📦 Props 타입 지정
```tsx
type GreetingProps = {
  name: string;
};

const Greeting = ({ name }: GreetingProps) => {
  return <p>Hello, {name}</p>;
};
```

- 구조 분해 시에도 타입을 붙여야 합니다.

- useState, useEffect에도 타입 적용 가능 (Day 2에서 진행)

## 🔄 정리
|개념|설명|
|-------|-------|
|JSX|HTML처럼 보이지만 실제로는 JS 표현식. 컴포넌트의 UI를 구성|
|함수형 컴포넌트|하나의 UI 단위. 함수처럼 선언하며 JSX를 return|
|Props|부모 컴포넌트가 자식에게 주는 읽기 전용 데이터|
|TypeScript 타입|코드의 안정성과 예측 가능성을 높이는 도구|
|Props 타입화|컴포넌트에 전달되는 값의 구조를 명확히 지정|

## 📌 마무리 퀴즈
다음 중 React 컴포넌트의 props를 타입으로 선언하는 올바른 방법은?

```tsx
A. const Comp = (props: string) => {...}
B. const Comp = (props: { name: string }) => {...}
C. const Comp = (name: string) => {...}
D. const Comp = { name: string } => {...}
```

정답: B

## ✅ 해설
```tsx
B. const Comp = (props: { name: string }) => {...}
```
- 이 방식은 props 객체의 구조를 직접 타입으로 명시한 방식이며, React + TypeScript에서 자주 사용하는 기본 패턴입니다.

- 타입을 따로 선언하고 사용하는 것도 가능합니다:

```tsx
type Props = { name: string };
const Comp = (props: Props) => {...}
```

### 다른 선택지 해설
|선택지|설명|
|-------|-------|
|A|props가 string이어야 한다는 뜻이므로 객체 구조가 아님 → ❌|
|C|props를 구조 분해했지만 타입이 누락되어 있음 → ❌|
|D|구조 자체가 잘못됨. {}는 매개변수 선언이 아니라 객체 → ❌|


# 🧠 Day 2 이론 정리: useState, 이벤트 처리, 조건부 렌더링

## 1. useState (상태 관리)
### ✅ 개념
useState는 React 함수형 컴포넌트에서 상태값을 보존하고 변경할 수 있게 해주는 훅입니다.
상태가 변경되면 해당 컴포넌트가 다시 렌더링됩니다.

### 🔧 사용법
```tsx
import { useState } from "react";

const [count, setCount] = useState<number>(0);
```
- count: 현재 상태값
- setCount: 상태 변경 함수
- number: 상태 타입 (TypeScript에서 명시)

### 💡 주의점
- TypeScript에서는 boolean, number, string 등 소문자 원시 타입을 사용해야 합니다.
- setState는 비동기이며 즉시 반영되지 않습니다.

## 2. 이벤트 처리
### ✅ 개념
React에서 이벤트를 처리할 때는 HTML 이벤트와 다르게 카멜케이스를 사용합니다.

### 🔧 예시
```tsx
<button onClick={handleClick}>클릭</button>

const handleClick = () => {
  alert("눌렀습니다!");
};
```
- 버튼, 입력, 폼 등의 사용자 동작에 대응 가능
- onClick, onChange, onSubmit 등 다양하게 제공

## 3. 조건부 렌더링
### ✅ 개념
React에서는 if 대신 JSX 안에서 삼항 연산자 또는 **논리 AND (&&)**를 사용해 조건에 따라 화면을 바꿉니다.

### 🔧 삼항 연산자
```tsx
{isLoggedIn ? <p>환영합니다</p> : <p>로그인해주세요</p>}
```
### 🔧 논리 AND
```tsx
{error && <p>에러가 발생했습니다</p>}
```

## 4. 전체 정리
|개념|설명|
|---|---|
|useState|컴포넌트 내부 상태를 선언하고 변경하는 훅|
|onClick|버튼 클릭 이벤트 핸들러|
|onChange|입력값 변경을 감지하는 이벤트|
|조건부 렌더링|? : 또는 &&를 사용하여 조건에 따라 JSX 렌더링|

## 5. 마무리 퀴즈
아래 보기 중 React + TypeScript에서 상태(state)를 선언하고 사용할 때 적절하지 않은 코드는 무엇일까요?

```tsx
A. const [count, setCount] = useState<number>(0);

B. const [name, setName] = useState<string>("훈");

C. const [isOpen, setIsOpen] = useState<Boolean>(false);

D. const [items, setItems] = useState<string[]>([]);
```

정답: C

## ✅ 해설
```tsx
C. const [isOpen, setIsOpen] = useState<Boolean>(false);
```

## ❌ 문제점
- Boolean은 래퍼 객체 타입입니다. (new Boolean(false) 같은)
- 실제 상태 값으로 사용하기에는 의도치 않은 결과를 만들 수 있어 지양해야 합니다.
- 대신 **원시 타입인 boolean**을 사용해야 합니다.

## ✅ 올바른 코드
```tsx
const [isOpen, setIsOpen] = useState<boolean>(false);
```

## 🔍 나머지 보기 해설
|보기|설명|적절성|
|---|---|-----|
|A|number 타입 상태값 선언|✅|
|B|string 타입 상태값 선언|✅|
|D|string[] (배열) 상태값 선언|✅|


# 🧠 Day 3 이론 정리: 입력 필드와 객체 상태 관리

## 1. 입력 필드와 useState
### ✅ 입력값을 상태에 연결하는 기본 패턴
```tsx
const [value, setValue] = useState<string>("");

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

- value: 입력 필드에 표시되는 값
- onChange: 사용자가 입력할 때 상태 업데이트
- 필수: 상태값과 input은 항상 양방향 바인딩되어야 함

## 2. 여러 상태 관리 방식
### ✅ 방식 1: 상태 각각 분리
```tsx
const [nickname, setNickname] = useState<string>("");
const [age, setAge] = useState<number>(0);
```

### ✅ 방식 2: 하나의 객체로 묶기
```tsx
const [profile, setProfile] = useState<{ nickname: string; age: number }>({
  nickname: "",
  age: 0,
});
```
- 한 번에 많은 필드를 관리할 수 있어 효율적
- 단, 업데이트 시 불변성 유지 필요

## 3. 객체 상태 업데이트
### ✅ 스프레드 연산자로 불변성 유지
```tsx
setProfile({
  ...profile,
  nickname: "훈",
});
```
- 기존 값은 유지하고 필요한 부분만 덮어쓰기
- useState로 객체를 관리할 땐 항상 이렇게 부분 업데이트를 수행해야 안전함

## 4. 전체 요약
|개념|설명|
|---|---|
|useState와 input 연결|입력 필드와 상태값을 동기화하는 양방향 바인딩 구조|
|여러 상태 관리|각각 분리하거나 객체로 통합|
|객체 상태 업데이트|...기존값 스프레드로 불변성 유지하며 덮어쓰기|
|입력값 타입 처리|숫자는 Number(e.target.value)로 형 변환 필요|

## 5. 마무리 퀴즈
아래 중 React + TypeScript에서 객체 상태를 잘못 업데이트한 코드는 무엇일까요?

```tsx
const [profile, setProfile] = useState<{ name: string; age: number }>({
  name: "",
  age: 0,
});
```

### 선택지
- A.
```tsx
setProfile({ name: "훈", age: 30 });
```
- B.
```tsx
setProfile({ ...profile, name: "훈" });
```
- C.
```tsx
setProfile({ name: "훈" });
```
- D.
```tsx
setProfile({ ...profile, age: profile.age + 1 });
```

정답: C

## 🔍 해설
```tsx
C. setProfile({ name: "훈" });
```
- ❌ 이 코드는 age 필드를 생략했습니다.
- profile 상태는 { name: string; age: number } 타입으로 선언되어 있기 때문에, 모든 필드를 포함한 객체를 전달해야 합니다.
- age가 빠진 상태로 setProfile()을 호출하면 타입 오류 발생

## 나머지 보기 해설
|보기|설명|적절성|
|---|---|------|
|A|모든 필드를 직접 명시함 (name, age)|✅|
|B|기존 객체를 스프레드한 후 name만 변경|✅|
|D|기존 age를 기반으로 증가시킴|✅|


# 🧠 Day 4 useEffect와 API 요청

---

## ✅ useEffect 핵심 요약

- `useEffect()`는 **컴포넌트가 렌더링된 이후에 실행**됨
- 주로 **API 요청, 타이머, 외부 이벤트 등록** 등에 사용
- 의존성 배열을 통해 **실행 시점 제어 가능**

### 사용 패턴

```tsx
useEffect(() => {
  // 실행할 코드
}, [의존성]); // 없으면 매 렌더마다 실행, []는 최초 1회
```

---

## ✅ 비동기 API 요청 패턴

- `useEffect` 안에서 직접 `async` 사용 불가능
- 내부에 `async` 함수를 따로 선언한 뒤 호출해야 함

```tsx
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("https://...");
    const data = await res.json();
    setData(data);
  };

  fetchData();
}, []);
```

---

## ✅ 마운트, 업데이트, 언마운트

| 시점         | 설명                                     |
|--------------|------------------------------------------|
| 마운트       | 컴포넌트가 처음 나타날 때 (`[]`)         |
| 업데이트     | 특정 상태/props 변경 시 (`[value]`)      |
| 언마운트     | 컴포넌트가 사라질 때 (cleanup 리턴 사용) |

---

## ✅ 전체 요약

| 개념            | 설명                                           |
|------------------|------------------------------------------------|
| `useEffect()`     | 생명주기 훅. 렌더 이후 실행됨                 |
| `async/await` 패턴 | 내부 함수로 감싸서 호출해야 안정적             |
| 의존성 배열       | 실행 조건 설정 (`[]`, `[value]`, 없음 주의)     |

---

## 🧠 마무리 퀴즈

다음 중 `useEffect` 안에서 **비동기 API 요청을 잘못 처리한 코드**는?

```tsx
A. useEffect(() => {
  const load = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  };
  load();
}, []);
```

```tsx
B. useEffect(async () => {
  const res = await fetch(url);
  const data = await res.json();
  setData(data);
}, []);
```

```tsx
C. useEffect(() => {
  fetch(url).then((res) => res.json()).then(setData);
}, []);
```

```tsx
D. useEffect(() => {
  const run = async () => {
    const data = await fetch(url).then((res) => res.json());
    setData(data);
  };
  run();
}, []);
```

**정답: B**
