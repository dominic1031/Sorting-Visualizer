import { COMPARE_VAL, SWAP_VAL, COMPLETE_VAL } from '../Constants/constants';

const swap = (arr, a, b) => {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

export function* bubbleSort(arr) {
    var i, j;
    let n = arr.length;
    for (i = 0; i < n; i++) {
        for (j = 0; j < n-i-1; j++)
        {
            yield [COMPARE_VAL, j, j+1];
            if (arr[j].value > arr[j+1].value)
            {
                yield [SWAP_VAL, j, j+1];
                swap(arr,j,j+1);
            }
        }
        yield [COMPLETE_VAL, n-i-1];
    }
}

export function* selectionSort(arr) {
    var n = arr.length;
    var i, j, min_idx;
    
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            // yield await highlight(arr, [j, min_idx], COMPARISON_COLOR); 
            yield [COMPARE_VAL, j, min_idx];
            if (arr[j].value < arr[min_idx].value) {
                min_idx = j;
            }
        }
        // Swap the found minimum element with the first element
        //yield await highlight([min_idx, i], SWAP_COLOR);
        yield [SWAP_VAL, min_idx, i];
        swap(arr, min_idx, i);
        yield [COMPLETE_VAL, i];
    }
}
 
export function* mergeSort(arr, l=0, r=null) {
    if (r === null) r = arr.length-1;
    if (l < r)
    {
        // Same as (l + r) / 2, but avoids overflow
        // for large l and r
        let m = l + Math.floor((r - l) / 2);
 
        // Sort first and second halves
        for (let step of mergeSort(arr, l, m)) {
            yield step;
        }
        for (let step of mergeSort(arr, m + 1, r)) {
            yield step;
        }
 
        for (let step of merge(arr, l, m, r)) {
            yield step;
        }
    }
}

function* merge(arr, start, mid, end) {
    let start1 = start
    let start2 = mid + 1;
 
    // If the direct merge is already sorted
    yield [COMPARE_VAL, mid, start2];
    if (arr[mid].value <= arr[start2].value)
    {
        if (start === 0 && end === arr.length-1) {
            yield [COMPLETE_VAL, ...Array.from({length: end - start + 1}, (_, index) => index)]
        }
        return;
    }
    // Two pointers to maintain start
    // of both arrays to merge
    while (start1 <= mid && start2 <= end)
    {    
        // If element 1 is in right place
        yield [COMPARE_VAL, start1, start2];
        if (arr[start1].value <= arr[start2].value)
        {
            if (start === 0 && end === arr.length-1) {
                yield [COMPLETE_VAL, start1];
            }
            start1++;
        }
        else
        {
            let index = start2;
 
            // Shift all the elements between element 1
            // element 2, right by 1.
            yield [COMPARE_VAL, index, start1]
            while (index !== start1)
            {
                yield [SWAP_VAL, index, index - 1];
                swap(arr, index, index-1);
                index--;
            }
            if (start === 0 && end === arr.length-1) {
                yield [COMPLETE_VAL, start1];
            }
            // Update all the pointers
            start1++;
            mid++;
            start2++;
        }
    }
    if (start === 0 && end === arr.length-1) {
        while (start1 <= mid) {
            yield [COMPLETE_VAL, start1];
            start1++;
        }
        while (start2 <= end) {
            yield [COMPLETE_VAL, start1];
            start1++;
            mid++;
            start2++;
        }
    }
}
