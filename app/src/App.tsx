import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './login';
import { ServicosListar } from './servicos';
import { ServicosAlterar } from './servicos';

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <nav>
            <ul>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/servicos'>Listar Serviços</Link>
              </li>
              <li>
                <Link to='/alterar-servicos'>Cadastrar Serviço</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/servicos' element={<ServicosListar />} />
            <Route path='/alterar-servicos' element={<ServicosAlterar />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
