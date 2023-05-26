import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import Records from './components/Records';

import "./index.css";

function App() {
  return (
   
    <BrowserRouter>
     
      <Routes>
        
        <Route path="/" element={<Home />} />
        
        <Route path="/game1" element={<Game1 />} />
       
        <Route path="/game2" element={<Game2 />} />
        
        <Route path="/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;