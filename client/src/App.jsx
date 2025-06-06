import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/app.scss";
import SettingBar from "./components/SettingBar";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/:id"
            element={
              <>
                <Toolbar />
                <SettingBar />
                <Canvas />
              </>
            }
          />
          <Route
            path="*"
            element={<Navigate to={`f${(+new Date()).toString(16)}`} replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
