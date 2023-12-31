import { BrowserRouter, Route, Routes } from "react-router-dom";
import PeopleDirectory from "./pages/PeopleDirectory";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PeopleDirectory />}/>
            <Route path="/user/:id" element={<UserProfile />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
