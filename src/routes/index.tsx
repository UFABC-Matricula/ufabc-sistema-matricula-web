import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Main from 'pages/Main';
import Resumo from 'pages/Resumo';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="resumo" element={<Resumo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
