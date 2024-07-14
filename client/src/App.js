import AllRoute from "./routes/AllRoute";
import {ToastContainer} from "react-toastify";
import'react-toastify/dist/ReactToastify.css';
import './App.css';




function App() {
  return (
    <div className="App">
      <AllRoute/>
      <ToastContainer/>
    </div>
  );
}

export default App;
