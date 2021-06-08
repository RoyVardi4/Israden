import Map from './components/Map/Map'
import AppBar from './components/AppBar'

const App = () => {
  return (
    <div> 
      <AppBar/>
      <div style={{marginRight: "10px"}}>
        <Map/>
      </div>
    </div>
  )
};

export default App;