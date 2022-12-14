import './App.css';
import { ThemeTogglerButton } from './components/buttons/theme-toggler-button/theme-toggler-button';
import { ThemeProvider } from './contexts/theme-context';
import { GlobalStyle } from './css/reset';
import { AppRoutes } from './pages/routes/routes'

function App() {
  return (
    <div>
      <ThemeProvider>
      <ThemeTogglerButton/>
        <GlobalStyle />
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;



