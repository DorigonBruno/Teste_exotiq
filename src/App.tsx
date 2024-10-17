import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Articles from "./components/Articles/Articles";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/article/:title/:description/:content/:author/:urlToImage/:url"
          element={<Articles />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
