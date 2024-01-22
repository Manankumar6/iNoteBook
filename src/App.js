
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);

  }

  return (
    <>
  <NoteState>

      <Navbar />
      <Alert alert={alert} />
    <div className="container">

    <Routes basename={process.env.PUBLIC_URL}>
    <Route exact path='/' element={<Home showAlert={showAlert} />} />
    <Route exact path='/about' element={<About />} />
    <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
    <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
    <Route path='*' element={<Home showAlert={showAlert} />} />
    </Routes>
    </div>

  </NoteState>
    </>
  );
}

export default App;
