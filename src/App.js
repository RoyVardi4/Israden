import Map from './components/Map/Map'
import AppBar from './components/AppBar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    // common: {
    //   white: "#00000d"
    // },
    natural: {
      main: '#e3ebc1'
    },
    primary: {
      light: '#71c149',
      main: '#233b16',
      // dark: '#002884',
      // contrastText: '#fff',
    },
    secondary: {
      light: '#ffd8ad',
      main: '#a10002',
      // dark: '#ba000d',
      // contrastText: '#000',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div> 
        <AppBar/>
        <div style={{marginRight: "10px"}}>
          <Map/>
        </div>
      </div>
    </ThemeProvider>
  )
};

export default App;