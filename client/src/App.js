import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useStoreRehydrated } from "easy-peasy";

// Views
import Home from "./views/Home";
import Upload from "./views/Upload";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Navbar from "./components/Navbar";

const App = () => {
  const isRehydrated = useStoreRehydrated();
  return (
    <div className="App">
      {isRehydrated ? (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/upload" exact>
              <Upload />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
          </Switch>
        </BrowserRouter>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
