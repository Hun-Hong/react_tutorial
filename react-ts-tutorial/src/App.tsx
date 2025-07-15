import TodoApp from "./components/week1/practices/Todo";
import UserCard from "./components/week1/practices/UserCard";
import PostList from "./components/week1/practices/Post";
import Counter from "./components/week1/assignments/Counter";
import ShoppingList from "./components/week1/assignments/ShoppingList";

function App() {
  // const handleClick = () => {
  //   alert("버튼이 클릭되었어요!")
  // }
  const sampleUser = {
    name: "홍훈",
    age: 31,
    email: "adeliae.p1841@gmail.com"
  }

  return (
    <div>
      <Counter />
      <ShoppingList />

      <UserCard user={sampleUser}/>
      <TodoApp />
      <PostList />
    </div>
  )
}
export default App;
