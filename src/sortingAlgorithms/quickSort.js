export function getquickSortAnimations(array) {
  const animations = [];
  const auxillaryArray = array.slice();
  quickSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
  return animations;
}

function quickSort(auxillaryArray, startIndex, endIndex, animations) {
  let pivotIndex;
  if (startIndex < endIndex) {
    pivotIndex = partitionArray(
      auxillaryArray,
      startIndex,
      endIndex,
      animations
    );
    quickSort(auxillaryArray, startIndex, pivotIndex - 1, animations);
    quickSort(auxillaryArray, pivotIndex + 1, endIndex, animations);
  }
}

function partitionArray(auxillaryArray, startIndex, endIndex, animations) {
  let pivot = auxillaryArray[endIndex];
  let pivotIndex = startIndex;
  for (let i = startIndex; i <= endIndex - 1; i++) {
    animations.push([i, endIndex]);
    animations.push([i, endIndex]);
    if (auxillaryArray[i] <= pivot) {
      //Swap these two heights
      animations.push([i, auxillaryArray[pivotIndex]]);
      animations.push([pivotIndex, auxillaryArray[i]]);
      swap(auxillaryArray, i, pivotIndex);
      pivotIndex++;
    } else {
      animations.push([-1, -1]);
      animations.push([-1, -1]);
    }
    animations.push([-1, -1]);
    animations.push([-1, -1]);
  }
  animations.push([-1, -1]);
  animations.push([-1, -1]);
  animations.push([-1, -1]);
  animations.push([-1, -1]);
  //Swap these two heights
  animations.push([pivotIndex, auxillaryArray[endIndex]]);
  animations.push([endIndex, auxillaryArray[pivotIndex]]);
  swap(auxillaryArray, pivotIndex, endIndex);
  return pivotIndex;
}

function swap(auxillaryArray, firstIndex, secondIndex) {
  let temp = auxillaryArray[firstIndex];
  auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
  auxillaryArray[secondIndex] = temp;
}
