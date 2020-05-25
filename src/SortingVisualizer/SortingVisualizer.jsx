import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import { getinsertionSortAnimations } from "../sortingAlgorithms/insertionSort";
import { getbubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";
import { getquickSortAnimations } from "../sortingAlgorithms/quickSort";

//Changing width,height accordingly with the browser
let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;

//change the value for speed of animations
const ANIMATION_SPEED_MS = 2;

//change this value for the number of bars (value) in the array
const NUMBER_OF_ARRAY_BARS = 150;

//change this main color of array bars
const PRIMARY_COLOR = "turquoise";

//This the color of array bars when being compared
const SECONDARY_COLOR = "red";

//This the colour of the array bars once sorted
const SORTED_COLOR = "green";

//This the colour of the array bars once sorted
const UNTOUCHED_COLOR = "black";

const DISABLED_BUTTON = "Currently Disabled";
const ENABLED_BUTTON = {
  nlogn: "O(NlogN) Time Complexity",
  nSquare: "O(N^2) Time Complexity",
};

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(this.randomIntFromInterval(5, 600));
    }
    this.setState({ array });
  }

  disableSortButtons() {
    document.getElementById("mergeSort").disabled = true;
    let buttonStyle = document.getElementById("mergeSort").style;
    document.getElementById("mergeSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("quickSort").disabled = true;
    buttonStyle = document.getElementById("quickSort").style;
    document.getElementById("quickSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("insertionSort").disabled = true;
    buttonStyle = document.getElementById("insertionSort").style;
    document.getElementById("insertionSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";

    document.getElementById("bubbleSort").disabled = true;
    buttonStyle = document.getElementById("bubbleSort").style;
    document.getElementById("bubbleSort").title = DISABLED_BUTTON;
    buttonStyle.cursor = "default";
    buttonStyle.background = "#000000";
  }
  restoreStoreButtons() {
    document.getElementById("mergeSort").disabled = false;
    let buttonStyle = document.getElementById("mergeSort").style;
    document.getElementById("mergeSort").title = ENABLED_BUTTON.nlogn;
    buttonStyle.background = "#14E014";
    buttonStyle.cursor = "pointer";

    document.getElementById("quickSort").disabled = false;
    buttonStyle = document.getElementById("quickSort").style;
    document.getElementById("quickSort").title = ENABLED_BUTTON.nSquare;
    buttonStyle.background = "#14E014";
    buttonStyle.cursor = "pointer";

    document.getElementById("bubbleSort").disabled = false;
    buttonStyle = document.getElementById("bubbleSort").style;
    document.getElementById("bubbleSort").title = ENABLED_BUTTON.nSquare;
    buttonStyle.background = "#14E014";
    buttonStyle.cursor = "pointer";

    document.getElementById("insertionSort").disabled = false;
    buttonStyle = document.getElementById("insertionSort").style;
    document.getElementById("insertionSort").title = ENABLED_BUTTON.nSquare;
    buttonStyle.background = "#14E014";
    buttonStyle.cursor = "pointer";
  }

  mergeSort() {
    this.disableSortButtons();
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
  }
  bubbleSort() {
    this.disableSortButtons();
    const animations = getbubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
  }

  quickSort() {
    this.disableSortButtons();
    const animations = getquickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length - 1; i++) {
      const isColorChange = i % 6 === 0 || i % 6 === 1;
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color = i % 6 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex] = animations[i];
        if (barOneIndex === -1) {
          continue;
        }
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
  }
  insertionSort() {
    this.disableSortButtons();
    const animations = getinsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparision1" ||
        animations[i][0] === "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange) {
        const color =
          animations[i][0] === "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_MS * animations.length) / 2 + 3000
    );
    setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
  }

  render() {
    const { array } = this.state;

    const SORT_BUTTONS = 4;
    const TOTAL_BUTTONS = 1 + SORT_BUTTONS;

    return (
      <>
        <div className="heading">
          <h1>Sorting Visualizer</h1>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
            ></div>
          ))}
          <div className="buttons">
            <button
              title="Generates a new random array"
              style={{
                position: "relative",
                top: `${(0 * (WINDOW_HEIGHT - 20)) / TOTAL_BUTTONS}px`,
              }}
              className="btn-reset"
              onClick={() => this.resetArray()}
            >
              Generate New Array
            </button>
            <button
              title="O(NlogN) Time Complexity"
              id="mergeSort"
              style={{
                position: "relative",
                top: `${(0.5 * (WINDOW_HEIGHT - 20)) / TOTAL_BUTTONS}px`,
              }}
              onClick={() => this.mergeSort()}
            >
              Merge Sort
            </button>
            <button
              title="O(N^2) Time Complexity"
              id="quickSort"
              style={{
                position: "relative",
                top: `${(1.5 * (WINDOW_HEIGHT - 20)) / TOTAL_BUTTONS}px`,
              }}
              onClick={() => this.quickSort()}
            >
              Quick Sort
            </button>
            <button
              title="O(N^2) Time Complexity"
              id="bubbleSort"
              style={{
                position: "relative",
                top: `${(2.5 * (WINDOW_HEIGHT - 20)) / TOTAL_BUTTONS}px`,
              }}
              onClick={() => this.bubbleSort()}
            >
              Bubble Sort
            </button>
            <button
              title="O(N^2) Time Complexity"
              id="insertionSort"
              style={{
                position: "relative",
                top: `${(3.5 * (WINDOW_HEIGHT - 20)) / TOTAL_BUTTONS}px`,
              }}
              onClick={() => this.insertionSort()}
            >
              Insertion Sort
            </button>
          </div>
        </div>
      </>
    );
  }

  //credits stack overflow
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default SortingVisualizer;

//need to be checked

/*function arraysAreEqual(arrayOne,arrayTwo)
{
    if(arrayOne.lenght !== arrayTwo.lenght)
    return false;
    for(let i=0;i<arrayOne.lenghtl;i++)
    {
        if(arrayOne[i]!==arrayTwo[i])
        return false;
    }
    return true;
}*/

/*const arrayBars = document.getElementsByClassName("array-bar");
   for (let i = 0; i < animations.length; i++) {
     //if (sorted_array[i] === animations[i])
     arrayBars[i].style.backgroundColor = UNTOUCHED_COLOR;
   }*/

/* if (this.sortedArray(animations)) {
//const arrayBars = document.getElementsByClassName("array-bar");
// for (let i = 0; i < animations.length; i++) {
// arrayBars[i].style.backgroundColor = SORTED_COLOR;
//}
console.log(this.sortedArray(animations));
}
}
{
/* // changing the colour once sorted
const sorted_array = this.state.array;
//sorted_array.sort();
const arrayBars = document.getElementsByClassName("array-bar");
for (let i = 0; i < sorted_array.length; i++) {
//if (sorted_array[i] === animations[i])
arrayBars[i].style.backgroundColor = UNTOUCHED_COLOR;
}
{
//changing color once sorted
const sorted_array = this.state.array.slice().sort((a, b) => a - b);
// if (animations[i] === sorted_array[i]) {
// const arrayBars = document.getElementsByClassName("array-bar");
for (let i = 0; i < animations.length; i++) {
if (animations[i] === sorted_array[i]) {
arrayBars.style.backgroundColor = SORTED_COLOR;
}
}
}*/

//needs testing
/* sortedArray(animations) {
  const sorted_array = this.state.array.slice().sort((a, b) => a - b);
  //sorted_array.sort();
  for (let i = 0; i < sorted_array.length; i++) {
    console.log(sorted_array[i]);
  }
  for (let i = 0; i < sorted_array.length; i++) {
    if (animations[i] !== sorted_array[i]) {
      return false;
      break;
    }
    return true;
  }
}*/
