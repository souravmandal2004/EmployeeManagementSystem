import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import NoMatch from './pages/NoMatch/NoMatch';
import PostUser from "./pages/employee/PostUser";
import UpdateUser from './pages/employee/UpdateUser';

function App() {

  return (
    <div>
        <Header />

        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='*' element={<NoMatch />} />
          <Route path='/employee' element={<PostUser />} />
          <Route path='/employee/:id' element={<UpdateUser />} />
        </Routes>
    </div>
  )
}

export default App;
