import "./App.css";
import React from "react";
import styled from "styled-components";

// components
import Board from "./Components/Board";

const MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: gainsboro;
`;

const BoardDiv = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Heading = styled.h1`
  font-weight: 500;
  text-align: center;
  margin-bottom: 30px;
`;

const List = styled.li`
  width: 100%;
  font-size: 22px;
  margin-bottom: 10px;
`;

const MoveBtn = styled.button`
  font-size: 22px;
  background-color: gainsboro;
  outline: none;
  border:none;
  cursor:pointer;

  &:hover{
    color: gray;
  }
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    console.log(current);
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <List key={move}>
          <MoveBtn onClick={() => this.jumpTo(move)}>{desc}</MoveBtn>
        </List>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <MainDiv>
        <BoardDiv>
          <Heading>{status}</Heading>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </BoardDiv>
        <Details>
          <List>HISTORY</List>
          <ol>{moves}</ol>
        </Details>
      </MainDiv>
    );
  }
}

export default App;

// Helper Function
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
