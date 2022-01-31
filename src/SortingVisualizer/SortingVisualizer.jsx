import './SortingVisualizer.css';
import * as sortingAlgorithms from '../SortingAlgorithms/sortingAlgorithms.js'
import React from 'react';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            array: [],
        }
    }
    componentDidMount() {  // when we load the app for the first time
        this.createRandomArray();
    }

    createRandomArray = () => {  // create a random array
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(1,100));
        }
        this.setState({array});
    }

    mergeSort = () => {
        testSort(this.state.array, sortingAlgorithms.mergeSort);
        sortingAlgorithms.mergeSort(this.state.array);
    }

    selectionSort = () => {
        testSort(this.state.array, sortingAlgorithms.selectionSort);
        const animations = sortingAlgorithms.selectionSort(this.state.array.slice());
        for (let i = 0; i < animations.length; i++) {
            const {comparison, swap} = animations[i];
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                // Have two comparisons change color
                arrayBars[comparison[1]].style.backgroundColor = 'blue';
                arrayBars[comparison[0]].style.backgroundColor = 'blue';
                setTimeout(() => {
                    arrayBars[comparison[1]].style.backgroundColor = 'turquoise';
                    arrayBars[comparison[0]].style.backgroundColor = 'turquoise';
                }, (i + 1) * 10);
            }, i * 10)
        }
    }

    render() {
        const { array } = this.state;
        return (
            <div className="array-container">
                {array.map((value, index) => (
                    <div className="array-bar" 
                    key={index}
                    style={{height: `${value}px`}}>
                    </div>
                ))}
                <button onClick={() => this.createRandomArray()}> Create Random Array </button>
                <button onClick={() => this.mergeSort()}> Merge Sort </button>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isArraySorted(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i+1]) {
            return false;
        }
    }
    return true;
}

function testSort(arr, sortFunc) {
    var dummy = arr.slice();
    sortFunc(dummy);
    if (!isArraySorted(dummy)) { 
        console.log("Sort algorithm is wrongly implemented!");
        return false;
    }
    console.log("Sort algorithm is correctly implemented!");
    return true;
}