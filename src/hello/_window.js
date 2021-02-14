import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../logo.svg";
import "../index.css";
import { backendURL } from "../utils/globals";

export default function Hello() {
  const [greeting, setGreeting] = useState("");

  async function setup() {
    const greeting = await axios.get(`${backendURL}/hello/`).catch((err) => {
      console.log(JSON.stringify(err));
      alert(err.response.data.msg || "Default error message");
    });
    if (!greeting) return;

    setGreeting(greeting.data);
  }
  useEffect(() => setup(), []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p className="mt-4">{greeting}</p>
      </header>
    </div>
  );
}
