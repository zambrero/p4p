// @ts-nocheck
import { useEffect, useState } from "react";
import "./styles.css";

type Props = {
  count: number;
  thinner: boolean;
};

const params = window.location.search.substr(1);

function Counter(props: Props) {
  const leastSignificant = !params.includes("mostSignificant");
  const all = params.includes("all");
  const [digitElements, setDigitElements] = useState([]);
  const [oldCount, setOldCount] = useState(props.count.toString());
  const [initial, setInitial] = useState(true);

  const animationLength = 400;

  const background = (
    <>
      <div className={"bg1"}></div>
      <div className={"bg2"}></div>
      <div className={"bg3"}></div>
      <div className={"bg4"}></div>
    </>
  );

  const setDigitElementsFunc = (newNumber: number, refresh?: boolean) => {
    const newNumberArray = newNumber.toString().split("");
    const oldNumberArray = oldCount.split("");
    const newDigits = [];

    const extraClasses = ` ${props.thinner ? "thin" : ""} ${all ? "all" : ""}`;

    for (let i = 0; i < newNumberArray.length; i++) {
      if (refresh) {
        console.log("herrree");
        newDigits.push(
          <div key={i} className={`digit ${extraClasses}`}>
            {background}
            <div className={"top"}>{newNumberArray[i]}</div>
            <div className={"bottom"}>{newNumberArray[i]}</div>
          </div>
        );
      } else if (newNumberArray[i] !== oldNumberArray[i]) {
        newDigits.push(
          <div key={i} className={`digit ${extraClasses}`}>
            {background}

            <div className={"top"}>{newNumberArray[i]}</div>
            <div className={"bottom"}>{oldNumberArray[i]}</div>
            <div className={"half"}>{oldNumberArray[i]}</div>
            <div className={"bottom-half"}>{newNumberArray[i]}</div>
          </div>
        );
      } else {
        newDigits.push(
          <div key={i} className={`digit ${extraClasses}`}>
            {background}

            <div className={"top"}>{oldNumberArray[i]}</div>
            <div className={"bottom"}>{oldNumberArray[i]}</div>
          </div>
        );
      }
    }
    setDigitElements(newDigits);
  };

  useEffect(() => {
    if (initial) {
      setInitial(false);
      setDigitElementsFunc(props.count, true);
      return;
    }
    console.log("here once", props.count);
    setDigitElementsFunc(props.count);

    setTimeout(() => {
      setOldCount(props.count.toString());
    }, animationLength / 2);

    setTimeout(() => {
      setDigitElementsFunc(props.count, true);
    }, animationLength + 50);
  }, [props.count]);

  useEffect(() => {
    // setThin(true);
  }, [props.thinner]);

  return <div className={`container ${all ? "all" : ""}`}>{digitElements}</div>;
}

export default Counter;
