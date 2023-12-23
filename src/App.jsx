import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NewsSinglePage from "./components/NewsSinglePage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="news/:articleId" element={<NewsSinglePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
