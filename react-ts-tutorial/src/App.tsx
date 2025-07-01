import Greeting from "./components/Greeting"
import Profile from "./components/Profile"

function App() {

  return (
    <div>
      <Greeting name="훈" />
      <Profile nickname="훈" age={29} isDeveloper={true} />
    </div>
  )
}

export default App;
