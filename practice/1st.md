# 1주차: React + TypeScript 기초 & 컴포넌트 개발

## 📚 학습 범위 (교재 기준)
- **7장 비동기 호출** (200-247p)
- **8장 JSX에서 TSX로** (250-281p)  
- **9장 훅** (286-302p)

## 🎯 학습 목표
- TypeScript로 API 호출을 타입 안전하게 구현할 수 있다
- React 컴포넌트의 Props와 State를 올바르게 타입 정의할 수 있다
- React Hooks를 TypeScript와 함께 사용할 수 있다
- 커스텀 훅을 TypeScript로 구현할 수 있다

---

## 📖 7장: 비동기 호출

### 💡 핵심 개념과 예제

#### 1. fetch API 요청하기
기본적인 fetch 사용법과 TypeScript 타입 정의를 알아봅시다.

```typescript
// 📝 기본 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// 🔄 기본 fetch 사용법
const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const user: User = await response.json();
  return user;
};

// 🎯 사용 예시
const getUserData = async () => {
  try {
    const user = await fetchUser(1);
    console.log(user.name); // 타입 안전하게 접근
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
};
```

#### 2. 서비스 레이어 분리하기
API 호출을 체계적으로 관리하는 방법입니다.

```typescript
// 📝 공통 API 응답 타입
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// 🔧 API 클래스 구현
class UserService {
  private baseURL = 'https://jsonplaceholder.typicode.com';

  async getUser(id: number): Promise<User> {
    const response = await fetch(`${this.baseURL}/users/${id}`);
    return this.handleResponse<User>(response);
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseURL}/users`);
    return this.handleResponse<User[]>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  }
}

// 🎯 사용 예시
const userService = new UserService();
const users = await userService.getUsers();
```

#### 3. Axios 활용하기
Axios를 사용할 때의 TypeScript 패턴입니다.

```typescript
import axios, { AxiosResponse } from 'axios';

// 📝 Axios 인스턴스 설정
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

// 🔄 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error('API Error:', error.response?.data);
    return Promise.reject(error);
  }
);

// 🎯 타입 안전한 API 호출
const fetchUserWithAxios = async (id: number): Promise<User> => {
  const response: AxiosResponse<User> = await apiClient.get(`/users/${id}`);
  return response.data;
};
```

### 🧪 실습 1: 기본 API 타입 정의
```typescript
// 📋 문제: 다음 API 응답에 맞는 타입을 정의해보세요
/*
API 응답 예시:
{
  "id": 1,
  "title": "Learn TypeScript",
  "completed": false,
  "userId": 1
}
*/

interface Todo {
  // TODO: 타입 정의
}

const fetchTodo = async (id: number): Promise<???> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return response.json();
};
```

### 🧪 실습 2: Axios 인터셉터 타입 정의
```typescript
// 📋 문제: Axios 응답 인터셉터에서 공통 에러 처리를 구현해보세요
interface ApiError {
  // TODO: 에러 구조 정의
}

const apiClient = axios.create({
  baseURL: 'https://api.example.com'
});

// TODO: 타입 안전한 응답 인터셉터 구현
```

### 🧪 실습 3: 에러 처리 타입 정의
```typescript
// 📋 문제: 다양한 에러 타입을 처리하는 함수를 작성해보세요
type NetworkError = {
  type: 'network';
  message: string;
};

type ValidationError = {
  type: 'validation';
  field: string;
  message: string;
};

type ApiError = NetworkError | ValidationError;

const handleError = (error: unknown): ApiError => {
  // TODO: 에러 타입 판별 및 변환 로직
};
```

---

## 📖 8장: JSX에서 TSX로

### 💡 핵심 개념과 예제

#### 1. React 컴포넌트 타입 이해하기
React와 TypeScript에서 컴포넌트 타입을 정의하는 방법들입니다.

```typescript
// 📝 다양한 React 타입들
import React from 'react';

// 🔹 ReactNode: 렌더링 가능한 모든 것
interface WrapperProps {
  children: React.ReactNode; // string, number, JSX, null, undefined 등
}

// 🔹 ReactElement: JSX 요소만
interface ContainerProps {
  header: React.ReactElement; // 반드시 JSX 요소
}

// 🔹 JSX.Element: ReactElement의 더 구체적인 타입
const MyComponent = (): JSX.Element => {
  return <div>Hello World</div>;
};

// 🎯 실제 사용 예시
const Card: React.FC<WrapperProps> = ({ children }) => {
  return <div className="card">{children}</div>;
};
```

#### 2. Props 인터페이스 설계하기
실무에서 자주 사용되는 Props 패턴들입니다.

```typescript
// 📝 기본 Props 인터페이스
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

// 🔧 컴포넌트 구현
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = ''
}) => {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const classes = [baseClass, variantClass, sizeClass, className].join(' ');

  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// 🎯 사용 예시
<Button 
  variant="danger" 
  size="large" 
  onClick={() => console.log('Clicked!')}
>
  Delete
</Button>
```

#### 3. 이벤트 핸들러 타입 정의
React에서 다양한 이벤트를 타입 안전하게 처리하는 방법입니다.

```typescript
// 📝 이벤트 타입들
import React from 'react';

interface FormComponentProps {
  onSubmit: (data: { name: string; email: string }) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // 🔹 input 변경 이벤트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
  };

  // 🔹 폼 제출 이벤트
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  // 🔹 버튼 클릭 이벤트
  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
};
```

### 🧪 실습 4: 컴포넌트 Props 타입 정의
```typescript
// 📋 문제: Card 컴포넌트의 Props 타입을 정의하고 구현해보세요
/*
요구사항:
- title: 문자열
- children: 렌더링 가능한 모든 요소
- variant: 'success' | 'warning' | 'error' (선택적, 기본값 'success')
- onClose: 닫기 버튼 클릭 핸들러 (선택적)
*/

interface CardProps {
  // TODO: Props 타입 정의
}

const Card: React.FC<CardProps> = (props) => {
  // TODO: 구현
  return <div>Card Component</div>;
};
```

### 🧪 실습 5: 이벤트 핸들러 타입
```typescript
// 📋 문제: SearchBar 컴포넌트의 이벤트 핸들러 타입을 정의해보세요
const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: ???) => {
    // TODO: input 값 변경 처리
  };

  const handleFormSubmit = (e: ???) => {
    // TODO: 폼 제출 처리
  };

  const handleClearClick = (e: ???) => {
    // TODO: 검색어 초기화
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input 
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleClearClick}>Clear</button>
    </form>
  );
};
```

---

## 📖 9장: 훅

### 💡 핵심 개념과 예제

#### 1. useState 타입 정의
useState를 TypeScript와 함께 사용하는 다양한 패턴입니다.

```typescript
import { useState } from 'react';

// 📝 기본 타입 추론
const [count, setCount] = useState(0); // number로 추론
const [name, setName] = useState(''); // string으로 추론

// 🔹 명시적 타입 지정
const [user, setUser] = useState<User | null>(null);

// 🔹 복잡한 객체 상태
interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

const [formData, setFormData] = useState<FormState>({
  email: '',
  password: '',
  rememberMe: false
});

// 🎯 상태 업데이트 함수
const updateFormData = (field: keyof FormState, value: string | boolean) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};
```

#### 2. useEffect 타입과 의존성 배열
useEffect의 TypeScript 사용법과 주의사항입니다.

```typescript
import { useEffect, useState } from 'react';

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 기본 useEffect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await userService.getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // 의존성 배열 타입은 자동 추론

  // 🔹 cleanup 함수가 있는 useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    // cleanup 함수는 void를 반환해야 함
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.name}</div>;
};
```

#### 3. useRef 타입 정의
useRef의 다양한 사용 사례와 타입 정의입니다.

```typescript
import { useRef, useEffect } from 'react';

const FocusInput = () => {
  // 🔹 DOM 요소 참조
  const inputRef = useRef<HTMLInputElement>(null);

  // 🔹 값 저장용 ref
  const countRef = useRef<number>(0);

  useEffect(() => {
    // null 체크 후 사용
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    countRef.current += 1;
    console.log('Count:', countRef.current);
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
```

#### 4. 커스텀 훅 만들기
재사용 가능한 로직을 커스텀 훅으로 분리하는 방법입니다.

```typescript
// 📝 API 호출 커스텀 훅
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useApi = <T>(url: string): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: T = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

// 🎯 사용 예시
const UserList = () => {
  const { data: users, loading, error, refetch } = useApi<User[]>('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

### 🧪 실습 6: 커스텀 훅 구현
```typescript
// 📋 문제: 로컬 스토리지를 사용하는 커스텀 훅을 구현해보세요
/*
요구사항:
- 초기값 설정 가능
- 타입 안전성 보장
- 로컬 스토리지 동기화
- JSON 직렬화/역직렬화 처리
*/

const useLocalStorage = <T>(key: string, initialValue: T) => {
  // TODO: useState와 useEffect를 활용하여 구현
  // 반환 타입: [T, (value: T | ((prev: T) => T)) => void]
};

// 사용 예시
const MyComponent = () => {
  const [settings, setSettings] = useLocalStorage('userSettings', {
    theme: 'light',
    notifications: true
  });
  
  return (
    <div>
      <p>Theme: {settings.theme}</p>
      <button onClick={() => setSettings(prev => ({ 
        ...prev, 
        theme: prev.theme === 'light' ? 'dark' : 'light' 
      }))}>
        Toggle Theme
      </button>
    </div>
  );
};
```

---

## 📝 과제

## 🥉 저난이도 과제: 사용자 프로필 카드

### 과제 개요
JSONPlaceholder API를 사용하여 사용자 정보를 표시하는 프로필 카드 컴포넌트를 구현합니다.

### 🔧 기술 스택
- React 18 + TypeScript
- fetch API 또는 Axios
- 기본 CSS

### 📋 구현 기능
1. **사용자 정보 조회**: API에서 사용자 데이터 가져오기
2. **프로필 카드 표시**: 이름, 이메일, 주소, 회사 정보 표시
3. **로딩 상태**: 데이터 로딩 중 스피너 표시
4. **에러 처리**: API 호출 실패시 에러 메시지 표시
5. **사용자 변경**: 다른 사용자 정보 보기

### 🎯 구현 요구사항

#### 1. 타입 정의
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

interface UserCardProps {
  userId: number;
}
```

#### 2. 컴포넌트 구조
```
src/
├── components/
│   ├── UserCard.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── hooks/
│   └── useUser.ts
├── types/
│   └── user.ts
└── App.tsx
```

#### 3. 커스텀 훅 구현
- `useUser(userId: number)` 훅 구현
- 로딩, 에러, 데이터 상태 관리

### 📊 평가 기준
- 타입 정의 완성도 (40%)
- 기능 구현 완성도 (30%)
- 에러 처리 (20%)
- 코드 품질 (10%)

---

## 🏆 고난이도 과제: 실시간 댓글 시스템

### 과제 개요
JSONPlaceholder API를 활용하여 실시간 댓글 시스템을 구현합니다. 여러 포스트에 대한 댓글을 CRUD 형태로 관리하고, 복잡한 상태 관리와 성능 최적화를 적용합니다.

### 🔧 기술 스택
- React 18 + TypeScript
- useReducer (복잡한 상태 관리)
- React.memo (성능 최적화)
- Axios (API 호출)

### 📋 구현 기능
1. **포스트 목록**: 포스트 리스트 표시 및 선택
2. **댓글 조회**: 선택된 포스트의 댓글 표시
3. **댓글 CRUD**: 댓글 생성, 수정, 삭제
4. **실시간 검색**: 댓글 내용 실시간 필터링
5. **댓글 정렬**: 최신순, 오래된순 정렬
6. **페이지네이션**: 댓글 페이지 처리
7. **좋아요 기능**: 댓글 좋아요/취소
8. **사용자 구분**: 내 댓글과 다른 사용자 댓글 구분

### 🎯 구현 요구사항

#### 1. 복잡한 타입 정의
```typescript
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  likes?: number;
  isLiked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface CommentState {
  comments: Comment[];
  filteredComments: Comment[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  totalPages: number;
  editingCommentId: number | null;
}

type CommentAction = 
  | { type: 'FETCH_COMMENTS_START' }
  | { type: 'FETCH_COMMENTS_SUCCESS'; payload: Comment[] }
  | { type: 'FETCH_COMMENTS_ERROR'; payload: string }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'UPDATE_COMMENT'; payload: { id: number; updates: Partial<Comment> } }
  | { type: 'DELETE_COMMENT'; payload: number }
  | { type: 'TOGGLE_LIKE'; payload: number }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_SORT_ORDER'; payload: 'asc' | 'desc' }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_EDITING_COMMENT'; payload: number | null };
```

#### 2. 컴포넌트 구조
```
src/
├── components/
│   ├── PostList.tsx
│   ├── CommentSection.tsx
│   ├── CommentItem.tsx
│   ├── CommentForm.tsx
│   ├── CommentSearch.tsx
│   ├── CommentSort.tsx
│   ├── Pagination.tsx
│   └── LoadingSpinner.tsx
├── hooks/
│   ├── useComments.ts
│   ├── usePosts.ts
│   ├── useDebounce.ts
│   └── usePagination.ts
├── reducers/
│   └── commentReducer.ts
├── types/
│   ├── post.ts
│   └── comment.ts
├── utils/
│   ├── commentUtils.ts
│   └── dateUtils.ts
└── App.tsx
```

#### 3. 고급 구현 요구사항

**상태 관리**
- useReducer를 활용한 복잡한 상태 관리
- 타입 안전한 액션과 리듀서 구현

**성능 최적화**
- React.memo를 활용한 불필요한 리렌더링 방지
- useMemo, useCallback을 활용한 계산 최적화
- 가상화를 고려한 대용량 댓글 처리

**고급 기능**
```typescript
// debounce를 활용한 실시간 검색
const useDebounce = <T>(value: T, delay: number): T => {
  // 구현...
};

// 페이지네이션 커스텀 훅
const usePagination = (items: any[], itemsPerPage: number) => {
  // 구현...
};

// 댓글 정렬 및 필터링 유틸리티
const commentUtils = {
  sortComments: (comments: Comment[], order: 'asc' | 'desc') => {
    // 구현...
  },
  filterComments: (comments: Comment[], searchTerm: string) => {
    // 구현...
  }
};
```

**에러 처리 및 UX**
- 낙관적 업데이트 (Optimistic Updates)
- 재시도 로직 구현
- 로딩 상태별 UI 처리
- 에러 바운더리 구현

### 📊 평가 기준
- 타입 시스템 활용도 (25%)
- 상태 관리 복잡도 (25%)
- 성능 최적화 적용 (20%)
- 기능 완성도 (15%)
- 사용자 경험 (10%)
- 코드 품질 및 구조 (5%)

### 💡 추가 도전 과제
1. **무한 스크롤**: 페이지네이션 대신 무한 스크롤 구현
2. **드래그 앤 드롭**: 댓글 순서 변경 기능
3. **실시간 동기화**: WebSocket을 활용한 실시간 댓글 업데이트
4. **다크 모드**: 테마 시스템 구현
5. **접근성**: ARIA 속성을 활용한 접근성 개선

---

## 📅 제출 기한
**다음 스터디 모임 전날 23:59까지**

## 🤝 스터디 진행 방식
1. **개별 학습**: 교재 해당 챕터 학습 + 이론 예제 분석
2. **간단한 실습**: 각 챕터별 실습 문제 해결
3. **과제 선택**: 저난이도 또는 고난이도 과제 중 선택하여 구현
4. **스터디 모임**: 과제 코드 리뷰 + 어려웠던 점 토론 + 간단한 실습 문제 해결

## 📞 문의 사항
과제 진행 중 궁금한 점이나 막히는 부분이 있다면 스터디 그룹 채팅방에 언제든 질문해주세요!