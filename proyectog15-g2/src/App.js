import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuAdmin from './components/MenuAdmin';
import PageInicio from './components/PageInicio';
import PageEventos from './components/PageEventos';
import PageUsuarios from './components/PageUsuarios';

import MenuInicial from './components/MenuInicial';
import PageLogin from './components/PageLogin';
import PageDeportes from './components/PageDeportes';
import PageEquipos from './components/PageEquipos';
//import PageLogout from './components/PageEventos';

class App extends Component {

  render() {
    return (
      <Router>
        <MenuInicial />
        <Routes>
          <Route path='/' element={<PageInicio />} />
          <Route path='/PageLogin' element={<PageLogin />} />
          <Route path='/PageEventos' element={<PageEventos />} />
          <Route path='/PageDeportes' element={<PageDeportes />} />
          <Route path='/PageEquipos' element={<PageEquipos />} />
          <Route path='/PageUsuarios' element={<PageUsuarios />} />
        </Routes>
      </Router>
      /*<Router>
      <Menu />
      <Routes>
        <Route path='/' element={<PageInicio />} />
        <Route path='/PageInicio' element={<PageInicio />} />
        <Route path='/PageDeportes' element={<PageDeportes />} />
        <Route path='/PageEquipos' element={<PageEquipos />} />
        <Route path='/PageEventos' element={<PageEventos />} />
        <Route path='/PageUsuarios' element={<PageUsuarios />} />
      </Routes>
      </Router>
     */

    );
  }
}

export default App;
