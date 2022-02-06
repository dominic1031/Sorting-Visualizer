import './SortingVisualizer.css';
import * as sortingAlgorithms from '../SortingAlgorithms/sortingAlgorithms.js'
import React from 'react';
import ArrayBar from '../Components/ArrayBar.js';
import { DEFAULT_COLOR, COMPARISON_COLOR, SWAP_COLOR, COMPLETE_COLOR, 
    COMPARE_VAL, SWAP_VAL, COMPLETE_VAL } from '../Constants/constants';
import { Slider, Typography } from '@mui/material';


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            array: [],  // stores each bar in the array
            disabled: false,  // button disabled
            arraySize: 20,  // size of array
            delayTime: 100
        }
    }

    componentDidMount() {  // when we load the app for the first time
        this.createRandomArray();
    }

    createRandomArray = () => {  // create a random array
        const array = [];
        for (let i = 0; i < this.state.arraySize; i++) {
            var value = randomIntFromInterval(1,100);
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
            await delay(this.state.delayTime);
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
            await delay(this.state.delayTime);
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
            await delay(this.state.delayTime);
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
        const buttons = [[this.createRandomArray, "Generate Array"],
                         [this.bubbleSort, "Bubble Sort"],
                         [this.selectionSort, "Selection Sort"],
                         [this.mergeSort, "Merge Sort"],];

        return (
            <>
                <div class="title-bar">
                    <h1>Sorting Visualizer</h1>
                </div>
                <div className="buttons-container">
                    {buttons.map((el, i) => (
                        <button
                            className="button-9"
                            onClick={() => el[0]() }
                            disabled={ this.state.disabled }
                            key={i}> {el[1]}
                        </button>
                    ))}
                </div>
                <div className="slider-container">
                   <Slider 
                    defaultValue={this.state.arraySize} 
                    aria-label="Array Size" 
                    valueLabelDisplay="auto"
                    min={5}
                    max={100}
                    step={1}
                    onChange={ (e, val) => { if (this.state.arraySize !== val) { this.setState({arraySize: val}); this.createRandomArray();} }}
                    disabled={ this.state.disabled }/>
                    <Slider 
                    defaultValue={100} 
                    aria-label="Animation Speed" 
                    valueLabelDisplay="auto"
                    min={10}
                    max={500}
                    step={10}
                    onChange={ (e, val) => { this.setState({delayTime: val})}}/>
                </div>
                <div className="array-container">
                    {array.map((bar, index) => (
                        <div className="array-bar" 
                        key={index}
                        style={
                            {height: `${bar.value}%`, 
                            marginTop: `${0}%`,
                            width:`${80/this.state.arraySize}%`,
                            backgroundColor: bar.color,
                            fontSize: `${15*(this.state.arraySize<=20)}`}}>
                            <b>{bar.value}</b>
                        </div>
                    ))}
                </div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
                <a href="https://github.com/dominic1031/Sorting-Visualizer" 
                class="fa fa-github fa-3x" target="_blank" rel="noopener noreferrer"></a>
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