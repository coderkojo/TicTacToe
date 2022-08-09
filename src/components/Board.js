import React from 'react';
import '../App.css'
import {useState} from 'react';


const Board = () => {
    //The hook below allows for different players or turns, by default the first player is X
    // Filling the cells with an empty string
    const [turn, setTurn] = useState('X');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();


    // A function that checks for the winner
    const checkForWinner = (squares) => {
        let winningCombos = {
            across:[
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],

            down:[
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],

            diagnol:[
                [0, 4, 8],
                [2, 4, 6],
            ]

        };

        for(let combo in winningCombos)
        {
            winningCombos[combo].forEach((pattern) =>{
               //to check if we have items in the indexes
                if(
                    squares[pattern[0]]  === '' ||
                    squares[pattern[1]]  === '' ||
                    squares[pattern[2]]  === ''     
                )
                { 
                    //do nothing
                }
                else if (
                    // Checking if three cells are equal
                    squares[pattern[0]]  === squares[pattern[1]] &&
                    squares[pattern[1]]  === squares[pattern[2]]
                )
                {
                    // This will set the winner to the letter that is present in the winning combo
                    setWinner(squares[pattern[0]]);
                }
            })
        }

    }


   // A function that handles a click
    const handleClick = (index) =>{
        if (cells[index] !== '')return;
        // We are copying the array into squares
        let squares = [...cells];

        if (turn === 'X'){
            squares[index] = 'X';
            setTurn('O');
        }
        else{
            squares[index] = 'O';
            setTurn('X');
        }
        checkForWinner(squares);
        setCells(squares);
    }
    const retartGame = () =>{
        setWinner(null);
        setCells(Array(9).fill(''));
    }

    const Cells = ({index}) =>
    {
        return <td onClick={() => handleClick(index)}>{cells[index]}</td>
    }
// We pass a prob to each cell to track which one is clicked
    return(    
        <div className='container'>
            <h2>Current Player: {turn}</h2>
        <table>
            <tbody>

                <tr>
                    
                    <Cells index={0} /> 
                    <Cells index={1} />
                    <Cells index={2} />
                </tr>
                <tr>
                    <Cells index={3} />
                    <Cells index={4} />
                    <Cells index={5} />
                </tr>
                <tr>
                    <Cells index={6} />
                    <Cells index={7} />
                    <Cells index={8} />
                </tr>
            </tbody>
        </table>
        
        {winner &&(
            <>
            <h2>The Winner is: {winner}</h2>
            <button className = 'button' onClick={() => retartGame()}>Play Again</button>
            </>
        )}

        </div>
    );

};

export default Board;