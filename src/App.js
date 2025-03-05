

// import logo from './logo.svg';
// import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
// import Temp from './Components/Temp';

function App() {
  return (
    <div className="App" 
    // style={{backgroundColor:'#212529'}}
    >
    {/* <Temp/> */}
    <Navbar/>
    <News/>
    </div>
  );
}

export default App;
