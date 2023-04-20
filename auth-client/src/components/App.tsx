import { Route, Routes, Link, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
