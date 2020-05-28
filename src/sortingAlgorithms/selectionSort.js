export function getselectionSortAnimations(array) {
  const animations = [];
  const auxillaryArray = array.slice();
  selectionSort(auxillaryArray, animations);
  return animations;
}

function selectionSort(auxillaryArray, animations) {
  for (let i = 0; i < auxillaryArray.length - 1; i++) {
    let minIndex = i; //Finding minimum element in unsorted array
    for (let j = i + 1; j < auxillaryArray.length; j++) {
      animations.push(["comparision1", j, minIndex]);
      animations.push(["comparision2", j, minIndex]);
      if (auxillaryArray[j] < auxillaryArray[minIndex]) {
        minIndex = j;
      }
    }
    animations.push(["swap", minIndex, auxillaryArray[i]]);
    animations.push(["swap", i, auxillaryArray[minIndex]]);
    // Swap the found minimum element with the first element
    swap(auxillaryArray, minIndex, i);
  }
}

function swap(auxillaryArray, firstIndex, secondIndex) {
  let temp = auxillaryArray[firstIndex];
  auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
  auxillaryArray[secondIndex] = temp;
}
