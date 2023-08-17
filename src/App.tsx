import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import Exprerimental from "./pages/exprerimental";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="exp" element={<Exprerimental />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
