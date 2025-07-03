import Greeting from "./components/Greeting"
import Profile from "./components/Profile"
import Counter from "./components/Counter";
import LoginToggle from "./components/LoginToggle";
import NicknameInput from "./components/NicknameInput";
import ProfileEditor from "./components/ProfileEditor";

function App() {

  return (
    <div>
      <Greeting name="훈" />
      <Profile nickname="훈" age={29} isDeveloper={true} />
      <Counter/>
      <LoginToggle />
      <NicknameInput />
      <ProfileEditor />
    </div>
  )
}

export default App;
