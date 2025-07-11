# React + TypeScript 1주차 학습 계획 (초보자용)

**학습 범위**: 7장 비동기 호출, 8장 JSX에서 TSX로, 9장 리액트 훅

---

## 📚 주차별 학습 목표

### **1주차 목표 (초보자 친화적)**
- JavaScript의 fetch로 서버에서 데이터 가져오기
- React 컴포넌트에 TypeScript 타입 추가하는 기본 방법
- useState와 useEffect 훅 사용법 익히기
- 간단한 실습을 통해 기초 다지기

---

## 📖 이론 학습

### **7장: 비동기 호출 (서버에서 데이터 가져오기)**

#### **핵심 개념**
- **fetch**: 서버에서 데이터를 가져오는 JavaScript 기본 기능
- **async/await**: 비동기 코드를 쉽게 쓰는 방법
- **에러 처리**: 문제가 생겼을 때 대처하는 방법

#### **기초부터 차근차근**

**🎯 1. 가장 간단한 fetch 사용법**
```typescript
// 1단계: 기본적인 데이터 가져오기
async function getUser() {
  const response = await fetch('/api/user/1');
  const user = await response.json();
  console.log(user);
}

// 2단계: 에러가 날 수도 있으니 try-catch 추가
async function getUserSafe() {
  try {
    const response = await fetch('/api/user/1');
    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.log('에러가 발생했어요:', error);
  }
}
```

**🎯 2. TypeScript로 데이터 타입 정하기**
```typescript
// 사용자 정보가 어떻게 생겼는지 미리 정의
interface User {
  id: number;
  name: string;
  email: string;
}

// 이제 TypeScript가 user의 타입을 알 수 있어요
async function getUser(): Promise<User> {
  const response = await fetch('/api/user/1');
  const user: User = await response.json();
  return user;
}
```

**🎯 3. React 컴포넌트에서 사용하기**
```typescript
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

// 간단한 사용자 정보 보여주는 컴포넌트
function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch('/api/user/1');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.log('사용자 정보를 가져올 수 없어요');
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (!user) return <div>사용자를 찾을 수 없어요</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### **8장: JSX에서 TSX로**

#### **핵심 개념**
- **Props**: 컴포넌트에 전달하는 데이터
- **Interface**: Props의 타입을 정의하는 방법
- **TypeScript**: JavaScript에 타입을 추가한 것

#### **기초부터 차근차근**

**🎯 1. 가장 기본적인 컴포넌트**
```typescript
// JavaScript로 했던 것
function Greeting() {
  return <h1>안녕하세요!</h1>;
}

// TypeScript로 바꾸면 (사실 거의 같아요!)
function Greeting() {
  return <h1>안녕하세요!</h1>;
}
```

**🎯 2. Props 받는 컴포넌트**
```typescript
// 1단계: Props가 어떻게 생겼는지 정의
interface GreetingProps {
  name: string;
}

// 2단계: 컴포넌트에서 Props 사용
function Greeting({ name }: GreetingProps) {
  return <h1>안녕하세요, {name}님!</h1>;
}

// 3단계: 사용하기
function App() {
  return <Greeting name="철수" />;
}
```

**🎯 3. 선택적 Props (있어도 되고 없어도 되는 것)**
```typescript
interface ButtonProps {
  text: string;        // 필수: 버튼에 쓰일 글자
  color?: string;      // 선택적: 색깔 (? 표시로 선택적임을 나타냄)
}

function Button({ text, color = "blue" }: ButtonProps) {
  return (
    <button style={{ backgroundColor: color }}>
      {text}
    </button>
  );
}

// 사용 예제
function App() {
  return (
    <div>
      <Button text="클릭하세요" />                    {/* color 안 줘도 됨 */}
      <Button text="빨간 버튼" color="red" />        {/* color 줘도 됨 */}
    </div>
  );
}
```

**🎯 4. 클릭 이벤트 처리하기**
```typescript
interface ButtonProps {
  text: string;
  onClick: () => void;  // 클릭했을 때 실행할 함수
}

function Button({ text, onClick }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>;
}

function App() {
  const handleClick = () => {
    alert('버튼이 클릭되었어요!');
  };

  return <Button text="클릭하세요" onClick={handleClick} />;
}
```

### **9장: 리액트 훅**

#### **핵심 개념**
- **useState**: 컴포넌트에서 값을 기억하고 바꾸는 방법
- **useEffect**: 컴포넌트가 화면에 나타날 때 뭔가 하고 싶을 때 사용

#### **기초부터 차근차근**

**🎯 1. useState - 값 기억하고 바꾸기**
```typescript
import { useState } from 'react';

function Counter() {
  // count라는 값을 0으로 시작, setCount로 값 바꾸기
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);  // count를 1 증가
  };

  return (
    <div>
      <p>현재 숫자: {count}</p>
      <button onClick={increase}>1 증가</button>
    </div>
  );
}
```

**🎯 2. useState에 TypeScript 타입 추가**
```typescript
import { useState } from 'react';

function UserGreeting() {
  // string 타입의 name, 초기값은 빈 문자열
  const [name, setName] = useState<string>('');
  
  // boolean 타입의 isVisible
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? '숨기기' : '보이기'}
      </button>
      
      {isVisible && <p>안녕하세요, {name}님!</p>}
    </div>
  );
}
```

**🎯 3. useEffect - 컴포넌트가 나타날 때 실행하기**
```typescript
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  // 컴포넌트가 화면에 나타나면 타이머 시작
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 컴포넌트가 사라질 때 타이머 정리
    return () => clearInterval(timer);
  }, []); // 빈 배열 = 처음 한 번만 실행

  return <div>타이머: {seconds}초</div>;
}
```

---

## 💻 실습 과제 (초보자용)

### **실습 1: 간단한 사용자 카드**
```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{user.name}</h3>
      <p>나이: {user.age}세</p>
      <p>이메일: {user.email}</p>
    </div>
  );
}

// 사용 예제
function App() {
  const sampleUser = {
    name: '김철수',
    age: 25,
    email: 'cheolsu@example.com'
  };

  return <UserCard user={sampleUser} />;
}
```

### **실습 2: 할 일 추가하기**
```typescript
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),  // 간단한 ID 생성
      text: inputText,
      done: false
    };

    setTodos([...todos, newTodo]);
    setInputText('');  // 입력창 비우기
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, done: !todo.done }
        : todo
    ));
  };

  return (
    <div>
      <h2>할 일 목록</h2>
      
      <div>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{ 
                textDecoration: todo.done ? 'line-through' : 'none' 
              }}>
                {todo.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### **실습 3: 간단한 데이터 가져오기**
```typescript
import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log('포스트를 가져올 수 없어요:', error);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>게시글 목록</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 과제

### **기초 과제: 간단한 카운터 만들기**
다음 기능이 있는 카운터를 만들어보세요:
- 숫자를 보여주기
- 증가 버튼 (+1)
- 감소 버튼 (-1)
- 리셋 버튼 (0으로 만들기)
- 0 미만으로 내려가지 않게 하기

```typescript
function Counter() {
  // 여기에 코드를 작성해보세요!
  // 힌트: useState를 사용하세요
}
```

### **도전 과제: 간단한 쇼핑 목록**
다음 기능이 있는 쇼핑 목록을 만들어보세요:
- 아이템 추가하기
- 아이템 삭제하기
- 아이템 체크하기 (구매 완료 표시)
- 총 아이템 개수와 완료된 개수 보여주기

---

## 📋 체크리스트

### **기본 개념 이해**
- [ ] fetch로 데이터 가져오는 방법 이해
- [ ] async/await 사용법 알기
- [ ] try-catch로 에러 처리하는 방법 알기
- [ ] interface로 타입 정의하는 방법 이해
- [ ] Props를 받는 컴포넌트 만들기
- [ ] useState로 상태 관리하기
- [ ] useEffect로 컴포넌트 생명주기 다루기

### **실습 완료**
- [ ] 실습 1: 사용자 카드 컴포넌트
- [ ] 실습 2: 할 일 앱 만들기
- [ ] 실습 3: 데이터 가져와서 보여주기

### **과제 완료**
- [ ] 기초 과제: 카운터 만들기
- [ ] 도전 과제: 쇼핑 목록 만들기

---

## 🔖 참고 자료 (심화 학습용)

<details>
<summary>🚀 더 알아보기 (클릭해서 펼치기)</summary>

### **고급 패턴들 (나중에 배워도 됨)**

#### **Custom Hook 만들기**
```typescript
// 자주 사용하는 로직을 Hook으로 만들어 재사용
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increase = () => setCount(prev => prev + 1);
  const decrease = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increase, decrease, reset };
}

// 사용법
function CounterComponent() {
  const { count, increase, decrease, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

#### **useCallback과 useMemo (성능 최적화)**
```typescript
import { useState, useCallback, useMemo } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  // 함수를 메모이제이션 (불필요한 재생성 방지)
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  // 값을 메모이제이션 (불필요한 재계산 방지)
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item, 0);
  }, [items]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Sum: {expensiveValue}</p>
      <button onClick={handleClick}>Increase</button>
    </div>
  );
}
```

#### **에러 바운더리**
```typescript
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>, 
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>뭔가 잘못되었어요.</h1>;
    }

    return this.props.children;
  }
}
```

</details>

---

## 💡 학습 팁

### **TypeScript 처음 사용할 때**
1. **에러 메시지를 친구로 생각하세요**: TypeScript 에러는 코드를 고쳐주려는 도우미예요
2. **작은 것부터 시작하세요**: interface 하나씩, Props 하나씩 차근차근
3. **any 타입은 최대한 피하세요**: 타입을 정확히 모르겠으면 물어보세요

### **React 처음 사용할 때**
1. **컴포넌트는 함수라고 생각하세요**: 입력(Props)을 받아서 JSX를 반환하는 함수
2. **useState는 변수를 업그레이드한 것**: 값이 바뀌면 화면도 다시 그려져요
3. **useEffect는 "언제 실행할지" 정하는 것**: 컴포넌트가 나타날 때, 사라질 때 등

### **디버깅 팁**
1. **console.log를 활용하세요**: 값이 어떻게 바뀌는지 확인해보세요
2. **React Developer Tools 설치**: 브라우저 확장 프로그램으로 React 상태를 볼 수 있어요
3. **한 번에 하나씩 고치세요**: 여러 문제를 동시에 해결하려고 하지 마세요

---

## 🚀 주차 마무리

이번 주차에서 배운 것들:
- ✅ fetch로 서버에서 데이터 가져오기
- ✅ TypeScript로 데이터 타입 정의하기
- ✅ React 컴포넌트에 Props 전달하기
- ✅ useState로 상태 관리하기
- ✅ useEffect로 컴포넌트 생명주기 다루기

**다음 주차 미리보기**: 더 복잡한 상태 관리, 여러 컴포넌트 간 데이터 공유, 라우팅 등을 배워보겠습니다! 🎯

궁금한 것이 있으면 언제든지 물어보세요. 천천히, 차근차근 함께 배워나가요! 😊