import './App.css';
import { Routes, Route } from "react-router-dom";

import Header from './components/Header';
import ApplicationListPage from './pages/ApplicationListPage';
import ApplicationDetailsPage from './pages/CompanyDetailsPage';
import EditApplicationPage from './pages/EditApplicationPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import AddApplication from './components/AddApplication';
import AddCompany from './pages/AddCompany';
import CompanyListPage from './pages/CompanyListPage';


function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/applications" element={<IsPrivate><ApplicationListPage /></IsPrivate>} />
        <Route path="/companies" element={<IsPrivate><CompanyListPage /></IsPrivate>} />
        <Route path="/applications/:applicationId" element={<IsPrivate><ApplicationDetailsPage /></IsPrivate>} />
        <Route path="/applications/:applicationId" element={<IsPrivate><ApplicationDetailsPage /></IsPrivate>} />
        <Route path="/applications/edit/:applicationId" element={<IsPrivate><EditApplicationPage /></IsPrivate>} />
        <Route path="/applications/create-application" element={<IsPrivate><AddApplication /></IsPrivate>} />
        <Route path="/companies/create-company" element={<IsPrivate><AddCompany /></IsPrivate>} />
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
      </Routes>

    </div >
  );
}

export default App;
