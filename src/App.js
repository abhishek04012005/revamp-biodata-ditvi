import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AllBlog from './components/AllBlog/AllBlog';
import AllBiodata from './components/AllBiodata/AllBiodata';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './components/TermsOfService/TermsOfService';
import ScrollToTop from './structure/ScrollToTop/ScrollToTop';


function App() {
  return (
    <div className="App">
      <Router basename='/'>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/biodata" element={<AllBiodata />} />
          <Route path="/blog" element={<AllBlog />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
