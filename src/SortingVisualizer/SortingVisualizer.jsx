import './SortingVisualizer.css';
import * as sortingAlgorithms from '../SortingAlgorithms/sortingAlgorithms.js'
import React from 'react';
import ArrayBar from '../Components/ArrayBar.js';
import { DEFAULT_COLOR, COMPARISON_COLOR, SWAP_COLOR, COMPLETE_COLOR, 
    COMPARE_VAL, SWAP_VAL, COMPLETE_VAL } from '../Constants/constants';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            array: [],  // stores each bar in the array
            disabled: false,  // button disabled
        }
    }

    componentDidMount() {  // when we load the app for the first time
        this.createRandomArray();
    }

    createRandomArray = (size = 20) => {  // create a random array
        const array = [];
        for (let i = 0; i < size; i++) {
            var value = randomIntFromInterval(1,50);
            array.push(new ArrayBar(value, DEFAULT_COLOR));
        }
        this.setState({array});
    }

    highlight = (indexList = [], color = COMPARISON_COLOR) => {
        const { array } = this.state;
        for (let index = 0; index < indexList.length; index++) {
            const elem = indexList[index];
            array[elem].color = color;
        }
        this.setState({ array });
    }

    mergeSort = async () => {
        if (this.state.disabled) return; // if button is disabled, then don't run sort
        this.setState({ disabled: true }); // prevent button from being pressed again
        this.highlight(Array.from({length: this.state.array.length}, (_, index) => index), DEFAULT_COLOR); // removes any previous highlighting
        const sortAlgorithm = sortingAlgorithms.mergeSort;
        if (!testSort(this.state.array, sortAlgorithm)) { 
            this.setState({ disabled: false });
            return;
        }
        let sortAlgo = sortAlgorithm(this.state.array);
        for (var step of sortAlgo) { 
            const arrayOperation = step[0]; // = COMPARE_VAL, SWAP_VAL, or COMPLETE_VAL
            const highlightColor = [COMPARISON_COLOR, SWAP_COLOR, COMPLETE_COLOR][arrayOperation]
            const barIndices = step.slice(1);  // = bars to highlight 
            this.highlight(barIndices, highlightColor);
            await delay(100);
            switch(arrayOperation) {  // We want to unhighlight the bars we colored in if the bar is not COMPLETE
                case COMPARE_VAL:
                case SWAP_VAL:
                    this.highlight(barIndices, DEFAULT_COLOR);
                    break;
                default:
            }

        }
        this.setState({ disabled: false }); // enable button after sort is done
    }

    selectionSort = async () => {
        if (this.state.disabled) return; // if button is disabled, then don't run sort
        this.setState({ disabled: true }); // prevent button from being pressed again
        this.highlight(Array.from({length: this.state.array.length}, (_, index) => index), DEFAULT_COLOR);
        const sortAlgorithm = sortingAlgorithms.selectionSort;
        if (!testSort(this.state.array, sortAlgorithm)) { 
            this.setState({ disabled: false });
            return;
        }
        let sortAlgo = sortAlgorithm(this.state.array);
        for (var step of sortAlgo) { 
            const arrayOperation = step[0]; // = COMPARE_VAL, SWAP_VAL, or COMPLETE_VAL
            const highlightColor = [COMPARISON_COLOR, SWAP_COLOR, COMPLETE_COLOR][arrayOperation]
            const barIndices = step.slice(1);  // = bars to highlight 
            this.highlight(barIndices, highlightColor);
            await delay(100);
            switch(arrayOperation) {  // We want to unhighlight the bars we colored in if the bar is not COMPLETE
                case COMPARE_VAL:
                case SWAP_VAL:
                    this.highlight(barIndices, DEFAULT_COLOR);
                    break;
                default:
            }

        }
        this.setState({ disabled: false }); // enable button after sort is done
    }

    bubbleSort = async () => {
        if (this.state.disabled) return; // if button is disabled, then don't run sort
        this.setState({ disabled: true }); // prevent button from being pressed again
        this.highlight(Array.from({length: this.state.array.length}, (_, index) => index), DEFAULT_COLOR);
        const sortAlgorithm = sortingAlgorithms.bubbleSort;
        if (!testSort(this.state.array, sortAlgorithm)) { 
            this.setState({ disabled: false });
            return;
        }
        let sortAlgo = sortAlgorithm(this.state.array);
        for (var step of sortAlgo) { 
            const arrayOperation = step[0]; // = COMPARE_VAL, SWAP_VAL, or COMPLETE_VAL
            const highlightColor = [COMPARISON_COLOR, SWAP_COLOR, COMPLETE_COLOR][arrayOperation]
            const barIndices = step.slice(1);  // = bars to highlight 
            this.highlight(barIndices, highlightColor);
            await delay(100);
            switch(arrayOperation) {  // We want to unhighlight the bars we colored in if the bar is not COMPLETE
                case COMPARE_VAL:
                case SWAP_VAL:
                    this.highlight(barIndices, DEFAULT_COLOR);
                    break;
                default:
            }

        }
        this.setState({ disabled: false }); // enable button after sort is done
    }



    render() {
        const { array } = this.state;
        return (
            <>
                <button 
                    onClick={ () => this.createRandomArray() }
                    disabled={ this.state.disabled }> Create Random Array 
                </button>
                <button 
                    onClick={() => this.selectionSort() }
                    disabled={ this.state.disabled }> Selection Sort 
                </button>
                <button 
                    onClick={() => this.bubbleSort() }
                    disabled={ this.state.disabled }> Bubble Sort 
                </button>
                <button 
                    onClick={() => this.mergeSort() }
                    disabled={ this.state.disabled }> Merge Sort 
                </button>
                <div className="array-container">
                    {array.map((bar, index) => (
                        <div className="array-bar" 
                        key={index}
                        style={
                            {height: `${bar.value*5}px`, 
                            width:'20px',
                            backgroundColor: bar.color}}>
                            <b>{bar.value}</b>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isArraySorted(arr) {
    for (let i = 0; i < arr.length-1; i++) {
        if (arr[i].value > arr[i+1].value) {
            return false;
        }
    }
    return true;
}

function testSort(arr, sortFunc) {
    const dummy = arr.slice();
    const sortGenerator = sortFunc(dummy);
    while (!(sortGenerator.next()).done); // go through generator
    if (!isArraySorted(dummy)) { 
        console.log(dummy);
        console.log("Sort algorithm is wrongly implemented!");
        return false;
    }
    console.log(dummy);
    console.log("Sort algorithm is correctly implemented!");
    return true;
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }