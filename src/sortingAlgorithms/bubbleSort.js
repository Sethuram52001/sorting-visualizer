export function getbubbleSortAnimations(array) {
  const animations = [];
  const auxiliaryArray = array.slice();
  bubbleSort(auxiliaryArray, animations);
  return animations;
}

function bubbleSort(auxiliaryArray, animations) {
  const n = auxiliaryArray.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      //these values that we are comparing
      //we push them once to change the colour
      animations.push([j, j + 1]);
      //these are the values that we are comparing
      //we push them second time to revert their colour
      animations.push([j, j + 1]);
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        //we overwrite the value at index j in original array
        //with value in auxiliary array at j+1
        animations.push([j, auxiliaryArray[j + 1]]);
        //we overwrite the value at index j+1 in original array
        //with value in auxiliary array at j
        animations.push([j + 1, auxiliaryArray[j]]);
        swap(auxiliaryArray, j, j + 1);
      } else {
        animations.push([-1, -1]);
        animations.push([-1, -1]);
      }
    }
  }
}

function swap(auxiliaryArray, firstIndex, secondIndex) {
  let temp = auxiliaryArray[firstIndex];
  auxiliaryArray[firstIndex] = auxiliaryArray[secondIndex];
  auxiliaryArray[secondIndex] = temp;
}
