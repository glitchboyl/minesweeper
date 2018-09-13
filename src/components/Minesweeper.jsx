import React from "react";
import Styled from "styled-components";

const Minesweeper = Styled.div`
    top: 10%;
    border-radius: 10px;
    border: 5px solid #F4F4F4;
    display: inline-block;
    position: relative;

    img {
        width: 20px;
        display: block;
    }
`;

Minesweeper.ToggleButton = Styled.button`
    top: -20px;
    right: -20px;
    padding: 5px;
    background-color: #F4F4F4;
    border: 5px solid #FFFFFF;
    border-radius: 100%;
    position: absolute;
    cursor: pointer;
    z-index: 10;
`;

Minesweeper.Game = children => <div {...children} />;

Minesweeper.Game.Container = Styled.div`
    padding: 20px 12.5px 15px;
    background-color: #FFFFFF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

Minesweeper.Game.RestartButton = Styled.button`
    width: 100%;
    padding: 10px 0;
    background-color: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .3s;

    &:hover {
        cursor: pointer;
        background-color: #F4F4F4;
    }
`;

Minesweeper.Game.MinesGrid = Styled.div`
    margin: 15px 0 -5px;
`;

Minesweeper.Game.MinesGrid.Row = Styled.div`
    margin: 0 -2.5px 5px;
    line-height: 0;
`;

Minesweeper.Game.MinesGrid.Cell = Styled.div`
    width: 25px;
    height: 25px;
    margin: 0 2.5px;
    display: inline-block;
    position: relative;

    img {
        width: 100%;
    }
`;

Minesweeper.Game.MinesGrid.Cell.Mask = Styled.span`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #E6E7E8;
    border-radius: 2px;
    position: absolute;
`;

Minesweeper.Game.MinesGrid.Cell.Safe = Styled.span`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #FFFFFF;
    border: 1px solid #E6E7E8;
    border-radius: 2px;
    position: absolute;
`;

Minesweeper.Game.Statistics = Styled.div`
    padding: 10px 25px 5px;
    background-color: #F4F4F4;
    display: flex;
    justify-content: space-between;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    p {
        margin: 0;
        padding: 0;

        &:first-child {
            margin-bottom: 2.5px;
            font-size: 15px;
        }

        &:last-child {
            margin-bottom: 2.5px;
            color: #999999;
            font-size: 14px;
        }
    }
`;

Minesweeper.Game.Statistics.Field = ({ title, value }) => {
  return (
    <div>
      <p>{value}</p>
      <p>{title}</p>
    </div>
  );
};

Minesweeper.Settings = Styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #FFFFFF;
    display: none;
    position: absolute;
`;

// Minesweeper.Settings.asd = Styled.input`
//         border: 1px solid #e0e0e0;
// `;

export default Minesweeper;
