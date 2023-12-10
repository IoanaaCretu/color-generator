import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#f15025").all(10));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    try {
      let colors = new Values(color).all(Math.round(100 / amount));
      setList(colors);
      setColor("");
      setAmount("");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <section className="container">
        <h3>Color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#f15025"
            className={`${error ? "error" : null}`}
          />
          <input
            type="number"
            min="2"
            max="50"
            value={amount === 0 ? "" : amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="number of shades"
          />
          <button className="btn" type="submit">
            submit
          </button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
              list={list}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
