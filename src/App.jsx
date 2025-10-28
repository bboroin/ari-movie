import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import Home from "@pages/Home";
import SearchResult from "@pages/SearchResult";
import MovieDetail from "@pages/MovieDetail";
import ScrollToTop from "@components/sections/common/ScrollToTop";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
