import './App.css';
import { Routes, Route, Outlet } from "react-router-dom";

import Header from './components/Header';
import ApplicationListPage from './components/ApplicationList';
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
import Account from './pages/Account';
import ApplicationsView from './pages/ApplicationsView';


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
        <Route path="/account/applications" element={<IsPrivate><ApplicationsView /></IsPrivate>} >
          <Route path="" element={<IsPrivate><ApplicationListPage /></IsPrivate>} />
          <Route path=":applicationId" element={<IsPrivate><ApplicationDetailsPage /></IsPrivate>} />
        </Route>
        <Route path="/companies" element={<IsPrivate><CompanyListPage /></IsPrivate>} />
        <Route path="/companies/:companyId" element={<IsPrivate><CompanyDetailsPage /></IsPrivate>} />
        <Route path="/account/applications/edit/:applicationId" element={<IsPrivate><EditApplicationPage /></IsPrivate>} />
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
