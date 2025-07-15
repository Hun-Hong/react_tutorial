# React + TypeScript 1주차 학습 정리

## 🎯 학습 목표 달성도
- ✅ fetch로 서버 데이터 가져오기
- ✅ TypeScript interface로 타입 정의
- ✅ React 컴포넌트에 Props 전달
- ✅ useState로 상태 관리
- ✅ useEffect로 부수 효과 처리

## 📖 핵심 개념 정리

### 1. 비동기 데이터 처리

```typescript
// 기본 패턴
async function fetchUser(id: number): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

**핵심 포인트:**
- `async/await`로 비동기 코드를 동기처럼 작성
- `try-catch`로 에러 처리 필수
- 타입 정의로 안전한 데이터 처리

### 2. TypeScript 기초

```typescript
// Interface 정의
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;  // 선택적 속성
}

// Props 타입 정의
interface UserCardProps {
  user: User;
  onEdit?: (id: number) => void;
}

// 컴포넌트에서 사용 (React.FC 지양!)
const UserCard = ({ user, onEdit }: UserCardProps) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && <button onClick={() => onEdit(user.id)}>수정</button>}
    </div>
  );
};
```

**핵심 포인트:**
- `interface`로 객체 구조 정의
- `?`로 선택적 속성 표시
- Props 직접 타이핑 (React.FC 사용 안 함)

### 3. React Hooks

#### useState - 상태 관리
```typescript
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Item[]>([]);

// 함수형 업데이트 (권장)
setCount(prev => prev + 1);
setItems(prev => [...prev, newItem]);
```

#### useEffect - 부수 효과
```typescript
// 컴포넌트 마운트 시 한 번만 실행
useEffect(() => {
  fetchUserData();
}, []);

// 특정 값 변경 시 실행
useEffect(() => {
  updateStats();
}, [itemList]);

// 클린업 함수
useEffect(() => {
  const timer = setInterval(() => {
    // 주기적 작업
  }, 1000);
  
  return () => clearInterval(timer); // 정리
}, []);
```

**핵심 포인트:**
- 의존성 배열로 실행 조건 제어
- 클린업 함수로 메모리 누수 방지
- 빈 배열 `[]`은 마운트 시 한 번만 실행

## 🛠️ 실전 패턴

### 1. 리스트 상태 관리
```typescript
// 추가
setItems(prev => [...prev, newItem]);

// 삭제
setItems(prev => prev.filter(item => item.id !== targetId));

// 수정
setItems(prev => prev.map(item => 
  item.id === targetId ? { ...item, done: !item.done } : item
));
```

### 2. 조건부 렌더링
```typescript
{loading && <div>로딩 중...</div>}
{error && <div>에러: {error}</div>}
{items.length === 0 ? (
  <div>아이템이 없어요</div>
) : (
  <ul>
    {items.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)}
```

### 3. 이벤트 처리
```typescript
// 매개변수 없는 경우
<button onClick={handleClick}>클릭</button>

// 매개변수 있는 경우
<button onClick={() => handleDelete(item.id)}>삭제</button>

// 이벤트 객체 필요한 경우
<input onChange={(e) => setValue(e.target.value)} />
```

## 🚫 흔한 실수들

### 1. 상태 직접 수정
```typescript
// ❌ 잘못된 방법
items.push(newItem);
setItems(items);

// ✅ 올바른 방법
setItems([...items, newItem]);
```

### 2. useEffect 의존성 누락
```typescript
// ❌ 경고 발생
useEffect(() => {
  doSomething(value);
}, []); // value가 의존성에 없음

// ✅ 올바른 방법
useEffect(() => {
  doSomething(value);
}, [value]);
```

### 3. onClick 즉시 실행
```typescript
// ❌ 렌더링 시 즉시 실행
<button onClick={handleClick()}>클릭</button>

// ✅ 클릭 시 실행
<button onClick={handleClick}>클릭</button>
<button onClick={() => handleClick(param)}>클릭</button>
```

## 💡 스터디원들과 공유할 인사이트

### 🎯 React 상태 관리의 핵심
1. **상태는 최소한으로**: `totalItem`, `totalChecked`는 계산으로 충분
2. **불변성 유지**: `[...itemList, newItem]`, `map()` 사용으로 원본 배열 보존
3. **함수형 업데이트**: `setNumber(prev => prev + 1)`가 더 안전

### 🚀 성능 최적화 팁
- **useMemo**: 계산 결과 캐싱
- **useCallback**: 함수 재생성 방지
- **key prop**: 리스트 렌더링 최적화

### 📱 사용자 경험 개선
- **Enter 키 지원**: 사용자 편의성
- **빈 상태 처리**: 명확한 피드백
- **접근성**: label로 체크박스와 텍스트 연결

### 🔍 디버깅 꿀팁
```typescript
// 상태 변화 확인하기
useEffect(() => {
  console.log('itemList 변경:', itemList);
}, [itemList]);

// 렌더링 확인하기
console.log('컴포넌트 렌더링됨');
```

## 🎯 성과 및 과제

### ✅ 이번 주 성과
- 기본적인 React 컴포넌트 작성 능력 획득
- TypeScript 타입 시스템 기초 이해
- 상태 관리와 이벤트 처리 패턴 습득
- 실제 동작하는 Todo, Counter 앱 완성

### 📋 다음 주 준비사항
- 컴포넌트 간 데이터 전달 방법
- 더 복잡한 상태 관리 (useReducer)
- 커스텀 훅 만들기
- 성능 최적화 (useMemo, useCallback)

## 💡 핵심 인사이트

1. **타입 안전성**: TypeScript는 런타임 에러를 컴파일 타임에 잡아줌
2. **불변성**: React에서 상태는 항상 새로운 객체/배열로 교체
3. **선언적 프로그래밍**: "어떻게"보다 "무엇을" 렌더링할지 선언
4. **컴포넌트 사고**: UI를 독립적이고 재사용 가능한 조각으로 분리

React는 처음엔 복잡해 보이지만, 이 기본 패턴들을 익히면 더 큰 애플리케이션도 쉽게 만들 수 있습니다! 🚀