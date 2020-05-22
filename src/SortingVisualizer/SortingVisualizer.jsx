import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgoritms";

//change the value for speed of animations
const ANIMATION_SPEED_MS = 1;

//change this value for the number of bars (value) in the array
const NUMBER_OF_ARRAY_BARS = 310;

//change this main color of array bars
const PRIMARY_COLOR = "turquoise";

//This the color of array bars when being compared
const SECONDARY_COLOR = "red";

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
      array.push(this.randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  mergeSort() {
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
  }

  quickSort() {}

  heapSort() {}
  insertionSort() {}

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
      </div>
    );
  }

  //credits stack overflow
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

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
}

export default SortingVisualizer;
