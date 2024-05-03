import logo from "./logo.svg";
import "./App.css";
import Terapis from "./pages/Terapis";
import HomePage from "./pages/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/menu";
import InputTerapis from "./pages/InputTerapis";
import InputJanjiTemu from "./pages/InputjanjiTemu";
import InputTindakan from "./pages/InputTindakan";
import ListTindakan from "./pages/ListTindakan";
import JanjiTemu from "./pages/ListJanjiTemu";
import ListDetailTindakan from "./pages/ListDetailTindakan";
import InputDetailTindakan from "./pages/InputDetailTindakan";
import Loading from "./components/loading";
import UpdateTerapis from "./pages/UpdateTerapis";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="relative  h-[100vh]">
      <Router>
        <div className="h-[90vh] w-[100%] overflow-y-scroll p-0 m-0">
          <Routes>
            <Route path="/load" element={<Loading />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/tindakan/detail-tindakan/"
              element={<ListDetailTindakan />}
            />{" "}
            <Route
              path="/tindakan/detail-tindakan/tambah-data"
              element={<InputDetailTindakan />}
            />
            <Route path="/tindakan" element={<ListTindakan />} />
            <Route path="/tindakan/tambah-data/" element={<InputTindakan />} />
            <Route
              path="/janji-temu/tambah-data/"
              element={<InputJanjiTemu />}
            />
            <Route path="/terapis" element={<Terapis />} />
            <Route path="/janji-temu/" element={<JanjiTemu />} />
            <Route path="/terapis/tambah-data/" element={<InputTerapis />} />
            <Route path="/terapis/:id/" element={<UpdateTerapis />} />
          </Routes>
        </div>

        {/* <div className="mt-6 h-[8%] w-[100%] p-0 m-0 z-[999] sticky bg-green-500">
          <Sidebar />
        </div> */}

        <Nav />
      </Router>
    </div>
  );
}

export default App;
