export function getHeapSortAnimations(array) {
  const animations = [];
  const auxiliaryArray = array.slice();
  heapSort(animations, auxiliaryArray);
  return animations;
}

function heapSort(animations, auxiliaryArray) {
  let len_aux = auxiliaryArray.length;
  for (let i = Math.floor(auxiliaryArray.length / 2); i >= 0; i -= 1) {
    heapRoot(animations, auxiliaryArray, i);
  }
  for (let i = len_aux - 1; i > 0; i--) {
    swap(auxiliaryArray, 0, i);
    len_aux--;
  }
  heapRoot(animations, auxiliaryArray, 0);
}

function heapRoot(animations, auxiliaryArray, i) {
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let max = i;
  animations.push(["comparison1", right, left]);
  animations.push(["comparison2", right, left]);
  if (
    left < auxiliaryArray.length &&
    auxiliaryArray[left] > auxiliaryArray[max]
  ) {
    max = left;
  }
  if (
    right < auxiliaryArray.length &&
    auxiliaryArray[right] > auxiliaryArray[max]
  ) {
    max = right;
  }
  if (max != i) {
    animations.push(["swap", auxiliaryArray[i], max]);
    animations.push(["swap", max, auxiliaryArray[i]]);
    swap(auxiliaryArray, i, max);
    heapRoot(auxiliaryArray, max);
  }
}

function swap(auxiliaryArray, index1, index2) {
  let temp = auxiliaryArray[index1];
  auxiliaryArray[index1] = auxiliaryArray[index2];
  auxiliaryArray[index2] = temp;
}
