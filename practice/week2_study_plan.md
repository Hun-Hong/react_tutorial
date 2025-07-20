# React + TypeScript 2주차 학습 계획

**학습 범위**: useReducer와 Context API 기초, 전역 상태 관리

---

## 📚 주차별 학습 목표

### **2주차 목표**
- useReducer로 복잡한 상태 관리하는 방법 익히기
- Context API로 Props drilling 문제 해결하기
- useReducer + Context API 조합으로 전역 상태 관리 구현
- 실제 프로젝트에서 사용할 수 있는 패턴 학습

---

## 📖 이론 학습

### **useReducer: 복잡한 상태 관리의 시작**

#### **핵심 개념**
- **useReducer**: useState보다 복잡한 상태 로직을 관리하는 훅
- **Reducer**: 상태 변경 로직을 모아둔 함수
- **Action**: 상태를 어떻게 바꿀지 설명하는 객체
- **Dispatch**: Action을 Reducer에게 보내는 함수

#### **기초부터 차근차근**

**🎯 1. useState vs useReducer - 언제 사용할까?**

```typescript
// useState: 간단한 상태
function SimpleCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}

// useReducer: 복잡한 상태와 여러 작업
interface CounterState {
  count: number;
  step: number;
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; step: number };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return { ...state, count: 0 };
    case 'setStep':
      return { ...state, step: action.step };
    default:
      throw new Error('Unknown action');
  }
}

function ComplexCounter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });
  
  return (
    <div>
      <p>Count: {state.count} (Step: {state.step})</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+{state.step}</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-{state.step}</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <input 
        type="number" 
        value={state.step}
        onChange={(e) => dispatch({ type: 'setStep', step: Number(e.target.value) })}
      />
    </div>
  );
}
```

**🎯 2. useReducer 기본 패턴**

```typescript
// 1단계: 상태와 액션 타입 정의
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type TodoAction = 
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'delete'; id: number }
  | { type: 'setFilter'; filter: 'all' | 'active' | 'completed' };

// 2단계: Reducer 함수 작성
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.text, completed: false }
        ]
      };
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id 
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case 'setFilter':
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state;
  }
}

// 3단계: 컴포넌트에서 사용
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <h2>할 일 관리 (useReducer)</h2>
      
      {/* 할 일 추가 */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const text = formData.get('text') as string;
        if (text.trim()) {
          dispatch({ type: 'add', text: text.trim() });
          e.currentTarget.reset();
        }
      }}>
        <input name="text" placeholder="할 일을 입력하세요" />
        <button type="submit">추가</button>
      </form>

      {/* 필터 버튼 */}
      <div>
        <button 
          onClick={() => dispatch({ type: 'setFilter', filter: 'all' })}
          style={{ fontWeight: state.filter === 'all' ? 'bold' : 'normal' }}
        >
          전체
        </button>
        <button 
          onClick={() => dispatch({ type: 'setFilter', filter: 'active' })}
          style={{ fontWeight: state.filter === 'active' ? 'bold' : 'normal' }}
        >
          진행중
        </button>
        <button 
          onClick={() => dispatch({ type: 'setFilter', filter: 'completed' })}
          style={{ fontWeight: state.filter === 'completed' ? 'bold' : 'normal' }}
        >
          완료
        </button>
      </div>

      {/* 할 일 목록 */}
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'toggle', id: todo.id })}
              />
              <span style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none' 
              }}>
                {todo.text}
              </span>
            </label>
            <button onClick={() => dispatch({ type: 'delete', id: todo.id })}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### **Context API: Props Drilling 해결사**

#### **핵심 개념**
- **Props Drilling**: Props를 여러 단계에 걸쳐 전달하는 문제
- **Context**: 컴포넌트 트리 전체에서 데이터를 공유하는 방법
- **Provider**: Context 값을 제공하는 컴포넌트
- **Consumer**: Context 값을 사용하는 컴포넌트 (useContext 훅 사용)

#### **기초부터 차근차근**

**🎯 1. Props Drilling 문제 이해하기**

```typescript
// ❌ Props Drilling 문제 - 깊은 컴포넌트에 데이터 전달하기 어려움
function App() {
  const [user, setUser] = useState({ name: '김철수', theme: 'dark' });
  
  return <Layout user={user} />;
}

function Layout({ user }: { user: User }) {
  return (
    <div>
      <Header user={user} />
      <MainContent user={user} />
    </div>
  );
}

function Header({ user }: { user: User }) {
  return <Navigation user={user} />;
}

function Navigation({ user }: { user: User }) {
  return <UserProfile user={user} />;
}

function UserProfile({ user }: { user: User }) {
  return <div>안녕하세요, {user.name}님!</div>;
}
```

**🎯 2. Context로 문제 해결하기**

```typescript
// 1단계: Context 생성
interface User {
  name: string;
  theme: 'light' | 'dark';
}

const UserContext = createContext<User | null>(null);

// 2단계: 커스텀 훅 만들기 (선택사항이지만 권장)
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// 3단계: Provider 컴포넌트
function App() {
  const [user] = useState<User>({ name: '김철수', theme: 'dark' });
  
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

// 4단계: 하위 컴포넌트에서 직접 사용
function Layout() {
  return (
    <div>
      <Header />
      <MainContent />
    </div>
  );
}

function Header() {
  return <Navigation />;
}

function Navigation() {
  return <UserProfile />;
}

function UserProfile() {
  const user = useUser(); // Props 없이 직접 접근!
  
  return (
    <div style={{ 
      backgroundColor: user.theme === 'dark' ? '#333' : '#fff',
      color: user.theme === 'dark' ? '#fff' : '#333'
    }}>
      안녕하세요, {user.name}님!
    </div>
  );
}
```

### **useReducer + Context API: 최강 조합**

#### **핵심 개념**
- useReducer로 상태 로직 관리
- Context로 상태와 dispatch 함수 전역 공유
- 커스텀 훅으로 사용하기 쉽게 만들기

**🎯 실제 쇼핑 카트 예제**

```typescript
// 1단계: 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction = 
  | { type: 'add'; product: Product }
  | { type: 'remove'; productId: number }
  | { type: 'updateQuantity'; productId: number; quantity: number }
  | { type: 'clear' }
  | { type: 'toggleCart' };

// 2단계: Reducer 함수
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existingItem = state.items.find(item => 
        item.product.id === action.product.id
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }]
      };
    }
    case 'remove':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.productId)
      };
    case 'updateQuantity':
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    case 'clear':
      return { ...state, items: [] };
    case 'toggleCart':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

// 3단계: Context 생성
const CartContext = createContext<CartState | null>(null);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | null>(null);

// 4단계: Provider 컴포넌트
function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false
  });

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

// 5단계: 커스텀 훅
function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error('useCartDispatch must be used within CartProvider');
  }
  return context;
}

// 6단계: 실제 사용 예제
function App() {
  return (
    <CartProvider>
      <div>
        <Header />
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}

function Header() {
  const cart = useCart();
  const dispatch = useCartDispatch();
  
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <header>
      <h1>쇼핑몰</h1>
      <button onClick={() => dispatch({ type: 'toggleCart' })}>
        장바구니 ({totalItems})
      </button>
    </header>
  );
}

function ProductCard({ product }: { product: Product }) {
  const dispatch = useCartDispatch();
  
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
      <img src={product.image} alt={product.name} width="100" />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
      <button onClick={() => dispatch({ type: 'add', product })}>
        장바구니에 추가
      </button>
    </div>
  );
}

function Cart() {
  const cart = useCart();
  const dispatch = useCartDispatch();
  
  if (!cart.isOpen) return null;
  
  const total = cart.items.reduce(
    (sum, item) => sum + (item.product.price * item.quantity), 
    0
  );
  
  return (
    <div style={{ 
      position: 'fixed', 
      right: 0, 
      top: 0, 
      width: '300px', 
      height: '100vh',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      padding: '20px'
    }}>
      <h2>장바구니</h2>
      <button onClick={() => dispatch({ type: 'toggleCart' })}>
        닫기
      </button>
      
      {cart.items.length === 0 ? (
        <p>장바구니가 비어있습니다</p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.product.id} style={{ margin: '10px 0' }}>
              <h4>{item.product.name}</h4>
              <p>{item.product.price.toLocaleString()}원</p>
              <div>
                <button onClick={() => dispatch({
                  type: 'updateQuantity',
                  productId: item.product.id,
                  quantity: item.quantity - 1
                })}>-</button>
                <span> {item.quantity} </span>
                <button onClick={() => dispatch({
                  type: 'updateQuantity',
                  productId: item.product.id,
                  quantity: item.quantity + 1
                })}>+</button>
                <button onClick={() => dispatch({
                  type: 'remove',
                  productId: item.product.id
                })}>삭제</button>
              </div>
            </div>
          ))}
          <hr />
          <h3>총액: {total.toLocaleString()}원</h3>
          <button onClick={() => dispatch({ type: 'clear' })}>
            장바구니 비우기
          </button>
        </>
      )}
    </div>
  );
}
```

---

## 💻 실습

### **실습 1: 간단한 테마 스위처**
```typescript
interface Theme {
  name: string;
  backgroundColor: string;
  textColor: string;
}

const themes: Theme[] = [
  { name: 'light', backgroundColor: '#ffffff', textColor: '#000000' },
  { name: 'dark', backgroundColor: '#333333', textColor: '#ffffff' },
  { name: 'blue', backgroundColor: '#0066cc', textColor: '#ffffff' }
];

type ThemeAction = { type: 'setTheme'; theme: Theme };

const ThemeContext = createContext<Theme | null>(null);
const ThemeDispatchContext = createContext<React.Dispatch<ThemeAction> | null>(null);

function themeReducer(state: Theme, action: ThemeAction): Theme {
  switch (action.type) {
    case 'setTheme':
      return action.theme;
    default:
      return state;
  }
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, dispatch] = useReducer(themeReducer, themes[0]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        <div style={{
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
          minHeight: '100vh',
          padding: '20px'
        }}>
          {children}
        </div>
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

function useThemeDispatch() {
  const context = useContext(ThemeDispatchContext);
  if (!context) throw new Error('useThemeDispatch must be used within ThemeProvider');
  return context;
}

function ThemeSwitcher() {
  const theme = useTheme();
  const dispatch = useThemeDispatch();

  return (
    <div>
      <h2>테마 선택</h2>
      <p>현재 테마: {theme.name}</p>
      {themes.map(t => (
        <button
          key={t.name}
          onClick={() => dispatch({ type: 'setTheme', theme: t })}
          style={{
            margin: '5px',
            padding: '10px',
            backgroundColor: t.backgroundColor,
            color: t.textColor,
            border: theme.name === t.name ? '2px solid red' : '1px solid gray'
          }}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <h1>테마 스위처 예제</h1>
      <ThemeSwitcher />
      <p>이 텍스트도 테마에 따라 색깔이 바뀝니다!</p>
    </ThemeProvider>
  );
}
```

### **실습 2: 사용자 관리 시스템**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UserState {
  users: User[];
  loading: boolean;
  selectedUser: User | null;
}

type UserAction = 
  | { type: 'setLoading'; loading: boolean }
  | { type: 'setUsers'; users: User[] }
  | { type: 'addUser'; user: User }
  | { type: 'updateUser'; user: User }
  | { type: 'deleteUser'; userId: number }
  | { type: 'selectUser'; user: User | null };

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'setLoading':
      return { ...state, loading: action.loading };
    case 'setUsers':
      return { ...state, users: action.users, loading: false };
    case 'addUser':
      return { 
        ...state, 
        users: [...state.users, action.user]
      };
    case 'updateUser':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.user.id ? action.user : user
        ),
        selectedUser: state.selectedUser?.id === action.user.id 
          ? action.user 
          : state.selectedUser
      };
    case 'deleteUser':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.userId),
        selectedUser: state.selectedUser?.id === action.userId 
          ? null 
          : state.selectedUser
      };
    case 'selectUser':
      return { ...state, selectedUser: action.user };
    default:
      return state;
  }
}

// Context와 Provider 구현
const UserContext = createContext<UserState | null>(null);
const UserDispatchContext = createContext<React.Dispatch<UserAction> | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, {
    users: [
      { id: 1, name: '김철수', email: 'kim@example.com', role: 'admin' },
      { id: 2, name: '이영희', email: 'lee@example.com', role: 'user' }
    ],
    loading: false,
    selectedUser: null
  });

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUsers must be used within UserProvider');
  return context;
}

function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (!context) throw new Error('useUserDispatch must be used within UserProvider');
  return context;
}

function UserList() {
  const { users, selectedUser } = useUsers();
  const dispatch = useUserDispatch();

  return (
    <div>
      <h2>사용자 목록</h2>
      {users.map(user => (
        <div 
          key={user.id}
          onClick={() => dispatch({ type: 'selectUser', user })}
          style={{
            padding: '10px',
            margin: '5px',
            border: '1px solid #ddd',
            backgroundColor: selectedUser?.id === user.id ? '#e3f2fd' : 'white',
            cursor: 'pointer'
          }}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <span>역할: {user.role}</span>
        </div>
      ))}
    </div>
  );
}

function UserDetail() {
  const { selectedUser } = useUsers();
  const dispatch = useUserDispatch();

  if (!selectedUser) {
    return <p>사용자를 선택해주세요</p>;
  }

  return (
    <div>
      <h2>사용자 상세정보</h2>
      <p>이름: {selectedUser.name}</p>
      <p>이메일: {selectedUser.email}</p>
      <p>역할: {selectedUser.role}</p>
      <button onClick={() => dispatch({ 
        type: 'deleteUser', 
        userId: selectedUser.id 
      })}>
        사용자 삭제
      </button>
    </div>
  );
}
```

### **실습 3: 알림 시스템**
```typescript
interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
}

type NotificationAction = 
  | { type: 'add'; notification: Notification }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'add':
      return {
        notifications: [...state.notifications, action.notification]
      };
    case 'remove':
      return {
        notifications: state.notifications.filter(n => n.id !== action.id)
      };
    case 'clear':
      return { notifications: [] };
    default:
      return state;
  }
}

const NotificationContext = createContext<NotificationState | null>(null);
const NotificationDispatchContext = createContext<React.Dispatch<NotificationAction> | null>(null);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: []
  });

  return (
    <NotificationContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationContext.Provider>
  );
}

function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
}

function useNotificationDispatch() {
  const context = useContext(NotificationDispatchContext);
  if (!context) throw new Error('useNotificationDispatch must be used within NotificationProvider');
  return context;
}

// 편리한 알림 추가 훅
function useAddNotification() {
  const dispatch = useNotificationDispatch();

  return (message: string, type: Notification['type'] = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({ 
      type: 'add', 
      notification: { id, message, type, duration } 
    });

    // 자동으로 제거
    setTimeout(() => {
      dispatch({ type: 'remove', id });
    }, duration);
  };
}

function NotificationContainer() {
  const { notifications } = useNotifications();
  const dispatch = useNotificationDispatch();

  const getNotificationStyle = (type: Notification['type']) => {
    const baseStyle = {
      padding: '12px 16px',
      margin: '8px',
      borderRadius: '4px',
      color: 'white',
      cursor: 'pointer'
    };

    switch (type) {
      case 'success': return { ...baseStyle, backgroundColor: '#4caf50' };
      case 'error': return { ...baseStyle, backgroundColor: '#f44336' };
      case 'warning': return { ...baseStyle, backgroundColor: '#ff9800' };
      case 'info': return { ...baseStyle, backgroundColor: '#2196f3' };
      default: return baseStyle;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      {notifications.map(notification => (
        <div
          key={notification.id}
          style={getNotificationStyle(notification.type)}
          onClick={() => dispatch({ type: 'remove', id: notification.id })}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}

function TestButtons() {
  const addNotification = useAddNotification();

  return (
    <div>
      <h2>알림 테스트</h2>
      <button onClick={() => addNotification('성공했습니다!', 'success')}>
        성공 알림
      </button>
      <button onClick={() => addNotification('오류가 발생했습니다!', 'error')}>
        오류 알림
      </button>
      <button onClick={() => addNotification('주의해주세요!', 'warning')}>
        경고 알림
      </button>
      <button onClick={() => addNotification('정보를 확인하세요!', 'info')}>
        정보 알림
      </button>
    </div>
  );
}
```

### **실습 4: 간단한 게시판 시스템**
```typescript
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  likes: number;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  selectedPost: Post | null;
  searchTerm: string;
}

type PostAction = 
  | { type: 'setPosts'; posts: Post[] }
  | { type: 'addPost'; post: Post }
  | { type: 'updatePost'; post: Post }
  | { type: 'deletePost'; postId: number }
  | { type: 'likePost'; postId: number }
  | { type: 'selectPost'; post: Post | null }
  | { type: 'setSearchTerm'; searchTerm: string }
  | { type: 'setLoading'; loading: boolean };

function postReducer(state: PostState, action: PostAction): PostState {
  switch (action.type) {
    case 'setPosts':
      return { ...state, posts: action.posts, loading: false };
    case 'addPost':
      return { 
        ...state, 
        posts: [action.post, ...state.posts] 
      };
    case 'updatePost':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.post.id ? action.post : post
        )
      };
    case 'deletePost':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId),
        selectedPost: state.selectedPost?.id === action.postId 
          ? null 
          : state.selectedPost
      };
    case 'likePost':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.postId 
            ? { ...post, likes: post.likes + 1 }
            : post
        )
      };
    case 'selectPost':
      return { ...state, selectedPost: action.post };
    case 'setSearchTerm':
      return { ...state, searchTerm: action.searchTerm };
    case 'setLoading':
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}

const PostContext = createContext<PostState | null>(null);
const PostDispatchContext = createContext<React.Dispatch<PostAction> | null>(null);

function PostProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(postReducer, {
    posts: [
      {
        id: 1,
        title: 'React + TypeScript 학습 후기',
        content: 'useReducer와 Context API를 배우고 있습니다!',
        author: '김개발',
        createdAt: new Date('2024-01-15'),
        likes: 5
      },
      {
        id: 2,
        title: '상태 관리의 중요성',
        content: '복잡한 애플리케이션에서는 상태 관리가 정말 중요해요.',
        author: '이코딩',
        createdAt: new Date('2024-01-14'),
        likes: 3
      }
    ],
    loading: false,
    selectedPost: null,
    searchTerm: ''
  });

  return (
    <PostContext.Provider value={state}>
      <PostDispatchContext.Provider value={dispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePosts must be used within PostProvider');
  return context;
}

function usePostDispatch() {
  const context = useContext(PostDispatchContext);
  if (!context) throw new Error('usePostDispatch must be used within PostProvider');
  return context;
}

function PostList() {
  const { posts, searchTerm } = usePosts();
  const dispatch = usePostDispatch();

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>게시글 목록</h2>
      
      <input
        type="text"
        placeholder="게시글 검색..."
        value={searchTerm}
        onChange={(e) => dispatch({ 
          type: 'setSearchTerm', 
          searchTerm: e.target.value 
        })}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      />

      {filteredPosts.map(post => (
        <div
          key={post.id}
          style={{
            border: '1px solid #ddd',
            padding: '16px',
            marginBottom: '12px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
          onClick={() => dispatch({ type: 'selectPost', post })}
        >
          <h3>{post.title}</h3>
          <p>{post.content.slice(0, 100)}...</p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '14px',
            color: '#666'
          }}>
            <span>작성자: {post.author}</span>
            <span>좋아요: {post.likes}</span>
            <span>{post.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PostDetail() {
  const { selectedPost } = usePosts();
  const dispatch = usePostDispatch();

  if (!selectedPost) {
    return <p>게시글을 선택해주세요</p>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{selectedPost.title}</h2>
      <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
        <span>작성자: {selectedPost.author}</span> | 
        <span> {selectedPost.createdAt.toLocaleDateString()}</span>
      </div>
      <p style={{ lineHeight: '1.6' }}>{selectedPost.content}</p>
      <div style={{ marginTop: '16px' }}>
        <button 
          onClick={() => dispatch({ type: 'likePost', postId: selectedPost.id })}
          style={{
            padding: '8px 16px',
            marginRight: '8px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          👍 좋아요 ({selectedPost.likes})
        </button>
        <button 
          onClick={() => dispatch({ type: 'deletePost', postId: selectedPost.id })}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
```

---

## 🎯 과제

### **기초 과제: 쇼핑 카트 시스템**
다음 기능을 가진 쇼핑 카트를 만들어보세요:

**요구사항:**
- 상품 목록 보기
- 장바구니에 상품 추가/제거
- 수량 변경
- 총 가격 계산
- 장바구니 열기/닫기

**시작 코드:**
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const sampleProducts: Product[] = [
  { id: 1, name: '노트북', price: 1200000, image: '💻' },
  { id: 2, name: '마우스', price: 30000, image: '🖱️' },
  { id: 3, name: '키보드', price: 80000, image: '⌨️' }
];

// 여기에 CartItem, CartState, CartAction 타입을 정의하세요
// 그리고 cartReducer, Context, Provider를 구현해보세요
```

### **도전 과제: 메모장 앱**
다음 기능을 가진 메모장 앱을 만들어보세요:

**요구사항:**
- 메모 추가/수정/삭제
- 메모 검색
- 카테고리별 분류
- 즐겨찾기 기능
- 메모 내용 미리보기
- LocalStorage에 저장 (useEffect 활용)

**고려사항:**
- useReducer로 복잡한 상태 관리
- Context API로 전역 상태 공유
- TypeScript 타입 정의 철저히
- 사용자 친화적인 UI/UX

**시작 코드:**
```typescript
interface Memo {
  id: string;
  title: string;
  content: string;
  category: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MemoState {
  memos: Memo[];
  selectedMemo: Memo | null;
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
}

// 여기서부터 구현해보세요!
```

---

## 📋 체크리스트

### **useReducer 이해**
- [ ] useState vs useReducer 차이점 이해
- [ ] Reducer 함수 작성 방법 알기
- [ ] Action 타입 정의하는 방법 이해
- [ ] dispatch 함수 사용법 익히기
- [ ] 복잡한 상태 로직을 Reducer로 분리하는 방법 알기

### **Context API 이해**
- [ ] Props drilling 문제 이해
- [ ] createContext 사용법 알기
- [ ] Context Provider 설정 방법 이해
- [ ] useContext로 Context 값 사용하는 방법 알기
- [ ] 커스텀 훅으로 Context 사용 편하게 만드는 방법 알기

### **useReducer + Context 조합**
- [ ] 상태와 dispatch 함수를 별도 Context로 분리하는 이유 이해
- [ ] Provider 컴포넌트 구현 방법 알기
- [ ] 전역 상태 관리 패턴 이해
- [ ] 타입 안전성 보장하는 방법 알기

### **실습 완료**
- [ ] 실습 1: 테마 스위처 구현
- [ ] 실습 2: 사용자 관리 시스템 구현
- [ ] 실습 3: 알림 시스템 구현
- [ ] 실습 4: 게시판 시스템 구현

### **과제 완료**
- [ ] 기초 과제: 쇼핑 카트 시스템 완성
- [ ] 도전 과제: 메모장 앱 완성

---

## 💡 학습 팁

### **useReducer 사용 팁**
1. **언제 useReducer를 사용할까?**
   - 상태가 복잡한 객체일 때
   - 여러 하위 값들이 연관되어 있을 때
   - 다음 상태가 이전 상태에 의존할 때
   - 상태 업데이트 로직을 컴포넌트 외부로 분리하고 싶을 때

2. **Reducer 함수 작성 요령**
   - 순수 함수로 작성하기 (같은 입력에 같은 출력)
   - 기존 상태를 변경하지 말고 새 객체 반환하기
   - switch문으로 액션 타입별 처리하기
   - default case에서 에러 던지거나 기존 상태 반환하기

3. **Action 설계 팁**
   - type 필드는 필수
   - 필요한 데이터만 payload에 포함
   - TypeScript 유니온 타입으로 모든 액션 정의

### **Context API 사용 팁**
1. **Context 분리하기**
   - 상태와 dispatch 함수를 별도 Context로 분리
   - 필요한 부분만 리렌더링되도록 최적화

2. **커스텀 훅 활용**
   - useContext를 감싸는 커스텀 훅 만들기
   - 에러 처리와 타입 체크 포함
   - 사용하기 쉬운 API 제공

3. **Provider 배치**
   - 필요한 최소 범위에만 Provider 설정
   - 너무 상위에 두면 불필요한 리렌더링 발생

### **디버깅 팁**
1. **Redux DevTools 활용**
   ```typescript
   // 개발 환경에서 Redux DevTools 연결
   const [state, dispatch] = useReducer(
     reducer,
     initialState,
     process.env.NODE_ENV === 'development' 
       ? (initial) => initial 
       : undefined
   );
   ```

2. **액션 로깅**
   ```typescript
   function debugReducer(state: State, action: Action): State {
     console.log('Action:', action);
     console.log('Previous State:', state);
     const newState = yourReducer(state, action);
     console.log('New State:', newState);
     return newState;
   }
   ```

3. **타입 에러 해결**
   - 타입 정의를 먼저 명확히 하기
   - 액션 타입에 모든 경우 포함했는지 확인
   - Context의 기본값을 null로 설정하고 에러 처리하기

### **성능 최적화**
1. **불필요한 리렌더링 방지**
   - React.memo 사용
   - 상태를 세분화해서 관리
   - useCallback, useMemo 적절히 활용

2. **Context 분리**
   - 자주 변경되는 상태와 그렇지 않은 상태 분리
   - 읽기 전용 데이터는 별도 Context로 관리

---

## 🔖 참고 자료 (심화 학습용)

<details>
<summary>🚀 더 알아보기 (클릭해서 펼치기)</summary>

### **고급 패턴들**

#### **Reducer 합성 패턴**
```typescript
// 여러 Reducer를 합성하는 패턴
function combineReducers<T>(reducers: { [K in keyof T]: (state: T[K], action: any) => T[K] }) {
  return (state: T, action: any): T => {
    const nextState = {} as T;
    let hasChanged = false;
    
    for (const key in reducers) {
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    
    return hasChanged ? nextState : state;
  };
}
```

#### **미들웨어 패턴**
```typescript
type Middleware<State, Action> = (
  store: { getState: () => State; dispatch: React.Dispatch<Action> }
) => (next: React.Dispatch<Action>) => (action: Action) => void;

const loggingMiddleware: Middleware<any, any> = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  console.log('Current state:', store.getState());
  next(action);
  console.log('Next state:', store.getState());
};
```

#### **비동기 액션 패턴**
```typescript
// 비동기 작업을 위한 thunk 패턴
type ThunkAction<State> = (
  dispatch: React.Dispatch<any>,
  getState: () => State
) => void;

function useThunkReducer<State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State
) {
  const [state, setState] = useState(initialState);
  
  const dispatch = useCallback((action: Action | ThunkAction<State>) => {
    if (typeof action === 'function') {
      action(dispatch, () => state);
    } else {
      setState(prevState => reducer(prevState, action));
    }
  }, [reducer, state]);
  
  return [state, dispatch] as const;
}

// 사용 예제
const fetchUserThunk = (userId: number): ThunkAction<UserState> => 
  async (dispatch, getState) => {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const user = await fetchUser(userId);
      dispatch({ type: 'SET_USER', user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: error.message });
    }
  };
```

</details>

---

## 🚀 주차 마무리

이번 주차에서 배운 것들:
- ✅ useReducer로 복잡한 상태 로직 관리하기
- ✅ Context API로 Props drilling 문제 해결하기  
- ✅ useReducer + Context API 조합으로 전역 상태 관리하기
- ✅ TypeScript로 타입 안전한 상태 관리 구현하기
- ✅ 실제 프로젝트에서 사용할 수 있는 패턴 익히기

**다음 주차 미리보기**: 
- React Router로 라우팅 구현하기
- 폼 처리와 유효성 검사
- API 연동과 데이터 페칭 최적화
- 성능 최적화 기법 (React.memo, useMemo, useCallback)
- 커스텀 훅 심화

잘 따라와 주셨어요! 이제 useState만으로는 어려웠던 복잡한 상태도 자신있게 관리할 수 있을 거예요. useReducer와 Context API는 중급 React 개발자로 가는 중요한 발판이니까요! 🎯

궁금한 것이 있으면 언제든지 물어보세요. 다음 주차도 화이팅! 😊