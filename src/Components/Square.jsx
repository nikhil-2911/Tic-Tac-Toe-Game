import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  width: 120px;
  height:120px;
  font-size: 20px;
  cursor:pointer;
  margin: 1px;
`

class Square extends React.Component{
  render(){
    return(
      <Button
        className="square" 
        onClick={() => this.props.onClick()}>
        {this.props.value === null ? "Click Me" : this.props.value}
      </Button>
    )
  }
}

export default Square;