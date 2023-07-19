// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import "./App.css";
import Counter from "./Counter.tsx";

const params = window.location.search.substr(1);

function App(props) {
  const [count, setCount] = useState(localStorage.getItem(params) || "9999");
  const [mostSignificant, setMostSignificant] = useState(
    params.includes("mostSignificant")
  );

  const [thin, setThin] = useState(
    localStorage.getItem(params + "thin") === "true"
  );
  const inc = useRef(0);

  const randomCount = async () => {
    const ee = await fetch(
      "https://zambrero.xchangefusion.com/api/product/getdonationbyid/2"
    );

    const e = await ee.json();
    if (params.includes("debug")) {
      e.TotalItemCount = 99999990 + inc.current;
    }
    inc.current += 1;
    if (e.TotalItemCount.toString().length === 8) {
      setThin(false);
      if (mostSignificant) {
        setCount(e.TotalItemCount.toString().slice(0, 4));
      } else {
        setCount(e.TotalItemCount.toString().slice(4));
      }
    } else if (e.TotalItemCount.toString().length === 9) {
      setThin(true);
      if (mostSignificant) {
        setCount(e.TotalItemCount.toString().slice(0, 4));
      } else {
        setCount(e.TotalItemCount.toString().slice(4));
      }
    } else if (e.TotalItemCount.toString().length === 10) {
      setThin(true);
      if (mostSignificant) {
        setCount(e.TotalItemCount.toString().slice(0, 5));
      } else {
        setCount(e.TotalItemCount.toString().slice(5));
      }
    } else {
      setThin(false);
      setCount("????");
    }
  };

  useEffect(() => {
    localStorage.setItem(params, count);
  }, [count]);

  useEffect(() => {
    localStorage.setItem(params + "thin", thin + "");
  }, [thin]);

  useEffect(() => {
    const nowMillis = new Date().getMilliseconds();
    setTimeout(() => {
      setInterval(() => {
        randomCount();
      }, 2000);
    }, 1000 - nowMillis);
  }, []);

  return (
    <div className="body">
      <Counter count={count} thinner={thin} />
    </div>
  );
}

export default App;
