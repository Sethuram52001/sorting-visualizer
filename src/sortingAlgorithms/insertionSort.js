export function getinsertionSortAnimations(array) {
  const animations = [];
  const auxillaryArray = array.slice();
  insertionSort(auxillaryArray, animations);
  array = auxillaryArray;
  return animations;
}

function insertionSort(auxillaryArray, animations) {
  const n = auxillaryArray.length;
  for (let i = 1; i < n; i++) {
    let temp = auxillaryArray[i];
    let j = i - 1;
    //these values that are we are comparing;
    //we push them once to change the colour
    animations.push(["comparision1", j, i]);
    //these are the values that we are comparing
    //we push them second time to revert their colour
    animations.push(["comparision2", j, i]);
    while (j >= 0 && auxillaryArray[j] > temp) {
      //we overwrite the value in index j+1 in original array
      animations.push(["overwrite", j + 1, auxillaryArray[j]]);
      auxillaryArray[j + 1] = auxillaryArray[j];
      j = j - 1;
      if (j >= 0) {
        //this is not for comparing, we push to change the colour
        animations.push(["comparision1", j, i]);
        //this is not for comparing, we push to revert colour
        animations.push(["comparision2", j, i]);
      }
    }
    //we overwrite the value at index j+1
    animations.push(["overwrite", j + 1, temp]);
    auxillaryArray[j + 1] = temp;
  }
}
