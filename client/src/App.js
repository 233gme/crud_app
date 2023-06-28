import {BrowserRouter, Route, Routes} from "react-router-dom";

import Main from "./pages/Main";
import Add from "./pages/Add";
import Update from "./pages/Update";
import {Suspense} from "react";

function App() {
  return (
    <div className="App">
      <Suspense fallback="...Loading">
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route path={'/add'} element={<Add/>}/>
            <Route path={'/update/:id'} element={<Update/>}/>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
