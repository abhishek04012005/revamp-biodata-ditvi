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
import ChooseOption from './components/ChooseOption/ChooseOption';
import BlogDetail from './components/BlogDetail/BlogDetail';
import BiodataDetail from './components/BiodataDetail/BiodataDetail';
import GetNow from './structure/GetNow/GetNow';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import ProductionDashboard from './components/Admin/ProductionDashboard/ProductionDashboard';


function App() {
  return (
    <div className="App">
      <Router basename='/'>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/biodata" element={<AllBiodata />} />
          <Route path="/biodata/:modelName" element={<BiodataDetail />} />
          <Route path="/blog" element={<AllBlog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/choose-option" element={<ChooseOption />} />
          <Route path="/get-now" element={<GetNow />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/production" element={<ProductionDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
