
export async function* selectionSort(arr) {
    var n = arr.length-1;
    var i, j, min_idx;
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            yield await highlightComparison(j, min_idx);
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        // Swap the found minimum element with the first element
        yield await highlightSwap(arr,min_idx, i);

        highlightCompleted(i);
        yield;
    }
}
 
export const mergeSort = (arr, l=0, r=null) => {
    if (r === null) r = arr.length-1;
    if (l < r)
    {
        // Same as (l + r) / 2, but avoids overflow
        // for large l and r
        let m = l + Math.floor((r - l) / 2);
 
        // Sort first and second halves
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
 
        merge(arr, l, m, r);
    }
}

function merge(arr, start, mid, end) {
    let start2 = mid + 1;
 
    // If the direct merge is already sorted
    if (arr[mid] <= arr[start2])
    {
        return;
    }
    // Two pointers to maintain start
    // of both arrays to merge
    while (start <= mid && start2 <= end)
    {    
        // If element 1 is in right place
        if (arr[start] <= arr[start2])
        {
            start++;
        }
        else
        {
            let value = arr[start2];
            let index = start2;
 
            // Shift all the elements between element 1
            // element 2, right by 1.
            while (index !== start)
            {
                arr[index] = arr[index - 1];
                index--;
            }
            arr[start] = value;
 
            // Update all the pointers
            start++;
            mid++;
            start2++;
        }
    }
}