import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Behaviors } from './components/Behaviors';
import { Exercise } from './components/Exercise';
import { Goal } from './components/Goal';
import { Header } from './components/Header';
import { Measurement } from './components/Measurement';

function App() {
  return (
    <div className="app _container">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/goal" replace />} />
          <Route path="/goal" element={<Goal />} />

          <Route path="/goal/measurement" element={<Measurement />} />

          <Route path="/goal/measurement/behaviors" element={<Behaviors />} />

          <Route
            path="/goal/measurement/behaviors/exercise"
            element={<Exercise />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
