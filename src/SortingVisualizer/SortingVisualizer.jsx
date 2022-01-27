import './SortingVisualizer.css';
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

    createRandomArray () {  // create a random array
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(1,100));
        }
        this.setState({array});
    }

    render() {
        const { array } = this.state;
        return (
            <>
                {array.map((value, index) => (
                    <div className="array-bars" key={index}>
                        {value}
                    </div>
                ))}
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

