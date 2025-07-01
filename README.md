# 🧠 React + TypeScript 학습 기록
## 📅 Day 1 – React & TypeScript 기초
## 📖 목차
- [1. React 기초](#-day-1--react--typescript-기초)


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
