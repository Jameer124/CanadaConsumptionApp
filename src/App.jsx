// import { Route, Routes, Link, BrowserRouter } from "react-router";
// import Home from "./Home";
// import About from "./About";
// import Wiki from "./Wiki";
// import { Counter } from "./features/counter/Counter";
// import "@progress/kendo-theme-default/dist/all.css";
// import "./App.css";
// import "./App_KendoStyles.css";
// import Filterpanel from "./Components/Views/AllData/Filterpanel";
// import MainIndex from "./Components/Views/AllData/MainIndex";

// function App() {


//   return (
//     <>
//     <div style={{display:'flex',justifyContent:'space-around'}}>
//       <Link to="/Home">Home</Link>
 
//       <Link to="/About">About</Link>

//       <Link to="/MainIndex">Canada Consumption</Link>
//       </div>
//       <Routes>
//         <Route  path="/Home" element={<Home />} />
//         <Route path="/About" element={<About />} />
//         <Route path="/Counter" element={<Counter />} />
//         <Route path="/MainIndex" element={<MainIndex />} />
//         <Route path="/user/:userId/username/:userName" element={<Wiki />} />
//       </Routes>
//       <span></span>
//       {/* <Counter></Counter> */}
      
//     </>
//   );
// }

// export default App;



import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './features/counter/counterSlice';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const servername = import.meta.env.VITE_SERVER;

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Count: {count}</h1>
      <div className="mt-4 space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => dispatch(increment())}>+</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => dispatch(decrement())}>-</button>
      </div>
      <p>{servername}</p>

    </div>
  );
}

export default App;
