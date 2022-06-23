import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";
import {Clock} from "./components/counter/Counter";

function App() {
  return (
      <div>
          <h1>Bookkeeper</h1>
          <nav
              style={{
                  borderBottom: "solid 1px",
                  paddingBottom: "1rem",
              }}
          >
              <Link to="/components">Invoices</Link> |{" "}
              <Link to="/components">Expenses</Link>
          </nav>
          <Outlet />
      </div>
  );
}


export default App;
