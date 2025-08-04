### 📘 React + TypeScript 기본 정리

* 컴포넌트 props 타입 정의는 보통 `interface` 또는 `type` 사용
* `useState`는 `<T>` 제네릭으로 상태 타입을 지정
* `type`은 유니언/교차에 유리하고, `interface`는 확장/구조화에 유리
* props는 **객체 자체로 받거나 구조분해 할당**으로 받을 수 있다
* 반환 타입은 `JSX.Element`, `React.FC`, 혹은 생략 가능

---

### 🧩 퀴즈 복습

```tsx
interface Props {
  message: string;
}

function Welcome(props: Props) {
  return <p>{props.msg}</p>;
}
```

> Q. 위 코드에서 잘못된 부분은 무엇인가요?

**정답: C. `props.msg`는 존재하지 않는 속성이므로 오류다.**

---
