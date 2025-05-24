import "./App.css";
import Main from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/Admin/AdminContext/AdminRoute";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllBlog from "./components/AllBlog/AllBlog";
import AllBiodata from "./components/AllBiodata/AllBiodata";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import ScrollToTop from "./structure/ScrollToTop/ScrollToTop";
import ChooseOption from "./components/ChooseOption/ChooseOption";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import BiodataDetail from "./components/BiodataDetail/BiodataDetail";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import ProductionDashboard from "./components/Admin/ProductionDashboard/ProductionDashboard";
import BiodataMaster from "./structure/BiodataMaster/BiodataMaster";
import UploadBiodata from "./components/UploadBiodata/UploadBiodata";
import CreateBiodata from "./components/CreateBiodata/CreateBiodata";
import RequestConfirmation from "./components/RequestConfirmation/RequestConfirmation";
import { AdminProvider } from "./components/Admin/AdminContext/AdminContex";
import Feedback from "./components/Feedback/Feedback";
import CheckStatus from "./components/CheckStatus/CheckStatus";
import AdminNavbar from "./components/Admin/AdminNavbar/AdminNavbar";
import AdminFooter from "./components/Admin/AdminFooter/AdminFooter";
import RequestBiodataDetail from "./components/Admin/RequestBiodataDetail/RequestBiodataDetail";
import ProductionBiodataDetail from "./components/Admin/ProductionBiodataDetail/ProductionBiodataDetail";
import ContactUsDashboard from "./components/Admin/ContactUsDashboard/ContactUsDashboard";
import WhyUs from "./components/WhyUs/WhyUs";
import WeWork from "./components/WeWork/WeWork";
import ContactUs from "./components/ContactUs/ContactUs";
import Payment from "./components/Payments/Payment/Payment";
import PaymentSuccess from "./components/Payments/PaymentSucess/PaymentSucess";

function App() {
  return (
    <div className="App">
      <AdminProvider>
        <Router basename="/">
          <ScrollToTop />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <>
                    <AdminNavbar />
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route
                        path="production"
                        element={<ProductionDashboard />}
                      />
                      <Route path="contact" element={<ContactUsDashboard />} />
                      <Route
                        path="production/:requestId"
                        element={<ProductionBiodataDetail />}
                      />
                      <Route
                        path="production/preview/:requestId"
                        element={<BiodataMaster />}
                      />
                      <Route
                        path="request/:requestId"
                        element={<RequestBiodataDetail />}
                      />
                    </Routes>
                    <AdminFooter />
                  </>
                </AdminRoute>
              }
            />

            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="biodata" element={<AllBiodata />} />
                    <Route
                      path="biodata/:modelNumber"
                      element={<BiodataDetail />}
                    />

                    <Route path="contact" element={<ContactUs />} />
                    <Route path="how-we-work" element={<WeWork />} />
                    <Route path="whyus" element={<WhyUs />} />
                    <Route path="blog" element={<AllBlog />} />
                    <Route path="blog/:slug" element={<BlogDetail />} />
                    <Route path="privacy" element={<PrivacyPolicy />} />
                    <Route path="terms" element={<TermsOfService />} />
                    <Route path="choose-option" element={<ChooseOption />} />
                    <Route path="upload-biodata" element={<UploadBiodata />} />
                    <Route path="create-biodata" element={<CreateBiodata />} />
                    <Route
                      path="confirmation"
                      element={<RequestConfirmation />}
                    />
                    <Route
                      path="feedback/:requestNumber"
                      element={<Feedback />}
                    />
                    <Route
                      path="track-status/:requestNumber"
                      element={<CheckStatus />}
                    />
                    <Route 
                      path="payment/:requestNumber" 
                      element={<Payment />} 
                    />
                    <Route 
                      path="payment-success/:requestNumber" 
                      element={<PaymentSuccess />} 
                    />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </Router>
      </AdminProvider>
    </div>
  );
}

export default App;
