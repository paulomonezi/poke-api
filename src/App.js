import './App.css';
import { Card } from './components/card/card';
import { GlobalStyle } from './css/reset';
import { AppRoutes } from './pages/routes'

function App() {
  return (
    <div>
      <GlobalStyle/>
      <AppRoutes />
    </div>
  );
}

export default App;



