import { useState, useEffect } from 'react';

function Hello() {
    // function hiFn() {
    //     console.log('Created!');
    //     return byFn;
    // }
    // function byFn() {
    //     console.log('Destroyed!');
    // }

    useEffect(() => {
        console.log('Created!');

        return () => console.log('Destroyed!');
    }, []);
    return <h1>Hello</h1>;
}

function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [showing, setShowing] = useState(false);
    const onClick = () => setValue((prev) => prev + 1);
    const onClick2 = () => setShowing((prev) => !prev);
    const onChange = (event) => setKeyword(event.target.value);
    useEffect(() => {
        console.log('CALL THE API...');
    }, []);

    useEffect(() => {
        if (keyword !== '' && keyword.length > 5) {
            console.log('I run when "keyword" changes.');
        }
    }, [keyword]);

    useEffect(() => {
        console.log('I run when "counter" changes.');
    }, [counter]);

    useEffect(() => {
        console.log('I run when keyword & counter changes.');
    }, [counter, keyword]);

    return (
        <div>
            <input
                value={keyword}
                onChange={onChange}
                type="text"
                placeholder="Search here..."
            ></input>
            <h1>{counter}</h1>
            <button onClick={onClick}>click me</button>
            {showing ? <Hello /> : null}
            <button onClick={onClick2}>{showing ? 'Hide' : 'Show'}</button>
        </div>
    );
}

export default App;
