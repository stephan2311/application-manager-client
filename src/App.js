import './App.css';
import { Routes, Route, Outlet } from "react-router-dom";

import Header from './components/Header';
import ApplicationList from './components/ApplicationList';
import ApplicationDetailsPage from './components/ApplicationDetails';
import EditApplicationPage from './pages/EditApplicationPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import AddApplication from './components/AddApplication';
import AddCompany from './pages/AddCompany';
import CompanyListPage from './pages/CompanyListPage';
import Footer from './components/Footer';
import CompanyDetailsPage from './pages/CompanyDetailsPage';
import Account from './pages/HomePage';
import HomePage from './pages/HomePage';
import EditCompanyPage from './pages/EditCompanyPage';
import JobListPage from './pages/JobListPage';


// function ApplicationView() {
//   return (
//     <>
//       <Route path="/account/applications" element={<IsPrivate><ApplicationListPage /></IsPrivate>} />
//       <Route path="/account/applications/:applicationId" element={<IsPrivate><ApplicationDetailsPage /></IsPrivate>} />
//     </>
//   );
// }


function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/account/applications" element={<IsPrivate><ApplicationList /></IsPrivate>} />
        <Route path=":applicationId" element={<IsPrivate><ApplicationDetailsPage /></IsPrivate>} />
        <Route path="/" element={<IsAnon><HomePage /></IsAnon>} />
        <Route path="/jobs" element={<IsPrivate><JobListPage /></IsPrivate>} />
        <Route path="/companies" element={<IsPrivate><CompanyListPage /></IsPrivate>} />
        <Route path="/companies/:companyId" element={<IsPrivate><CompanyDetailsPage /></IsPrivate>} />
        <Route path="/account/applications/edit/:applicationId" element={<IsPrivate><EditApplicationPage /></IsPrivate>} />
        <Route path="/companies/edit/:companyId" element={<IsPrivate><EditCompanyPage /></IsPrivate>} />
        <Route path="/account/applications/create-application" element={<IsPrivate><AddApplication /></IsPrivate>} />
        <Route path="/companies/create-company" element={<IsPrivate><AddCompany /></IsPrivate>} />
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
      </Routes>

      {/* <Footer /> */}

    </div >
  );
}

export default App;
