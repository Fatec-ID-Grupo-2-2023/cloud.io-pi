import { ThemeProvider } from '@mui/material'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import './i18n'
import './styles/main.scss'
import theme from './styles/theme'

ReactDOM.render((
  <HelmetProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </HelmetProvider>
), document.getElementById('root'));