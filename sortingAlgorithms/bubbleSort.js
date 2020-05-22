export function getbubbleSortAnimations(array) {
  let animations = [];
  let auxiliaryArray = array.slice();
  bubbleSort(auxiliaryArray, animations);
  array = auxiliaryArray;
  return [animations, array];
}

function bubbleSort(auxiliaryArray, animations) {
  const n = auxiliaryArray.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      animations.push([j, j + 1]);
      animations.push((j, j + 1));
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push([j, auxiliaryArray[j + 1]]);
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
