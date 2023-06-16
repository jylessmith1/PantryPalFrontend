import './App.css';
import Header from './components/Header';
import MainRenderArea from './components/MainRenderArea';
import BottomNavBar from './components/BottomNavBar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <section className="App">
      <Routes>
        <Route path={"/*"} element={[<Header />, <MainRenderArea />, <BottomNavBar />]} />
        <Route path="/eader" component={Header} />
      </Routes>
    </section>
  );
}
export default App;
