// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import "./App.css";
import Counter from "./Counter.tsx";

const params = window.location.search.substr(1);

function App(props) {
  const [mostSignificant, setMostSignificant] = useState(
    params.includes("mostSignificant")
  );

  const all = params.includes("all");
  const [count, setCount] = useState(all ? "????????" : "????");
  const [commaPositions, setCommaPositions] = useState([]);

  const [thin, setThin] = useState(false);
  const inc = useRef(0);

  const schedule3amReload = () => {
    const now = new Date();
    const next3am = new Date();

    next3am.setHours(3, 0, 0, 0);

    // if it's already past 3am today, schedule for tomorrow
    if (now >= next3am) {
      next3am.setDate(next3am.getDate() + 1);
    }

    const msUntil3am = next3am.getTime() - now.getTime();

    setTimeout(() => {
      window.location.reload();
    }, msUntil3am);
  };

  const randomCount = async () => {
    const ee = await fetch(
      "https://zambrero.xchangefusion.com/api/product/getdonationbyid/2"
    );

    const e = await ee.json();
    if (params.includes("debug")) {
      e.TotalItemCount = 99999990 + inc.current;
    }
    if (all) {
      setCount(e.TotalItemCount.toString());
      setCommaPositions([1, 5]);
      return;
    }
    inc.current += 1;
    if (e.TotalItemCount.toString().length === 9) {
      setThin(true);
      if (mostSignificant) {
        setCount("*" + e.TotalItemCount.toString().slice(0, 4));
        setCommaPositions([1]);
      } else {
        setCount(e.TotalItemCount.toString().slice(4));
        setCommaPositions([1]);
      }
    } else if (e.TotalItemCount.toString().length === 10) {
      setThin(true);
      if (mostSignificant) {
        setCommaPositions([3]);
        setCount(e.TotalItemCount.toString().slice(0, 5));
      } else {
        setCount(e.TotalItemCount.toString().slice(5));
        setCommaPositions([1]);
      }
    } else {
      setThin(false);
      setCount("????");
    }
  };

  useEffect(() => {
    setInterval(() => {
      randomCount();
    }, 2000);
    randomCount();
    schedule3amReload();
  }, []);

  return (
    <div className="body">
      <Counter count={count} thinner={thin} commaPositions={commaPositions} />
    </div>
  );
}

export default App;
