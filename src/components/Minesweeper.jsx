import Styled from "styled-components";

const Minesweeper = Styled.div`
    top: 100px;
    padding: 5px;
    background-color: #F4F4F4;
    border-radius: 10px;
    display: inline-block;
    position: relative;

    img {
        width: 20px;
    }
`;

Minesweeper.ToggleButton = Styled.button`
    top: -15px;
    right: -15px;
    padding: 5px;
    background-color: #F4F4F4;border: 5px solid #FFFFFF;
    border-radius: 100%;
    position: absolute;
    cursor: pointer;
`;

Minesweeper.Game = Styled.div`
    padding: 20px 10px 10px;
    background-color: #FFFFFF;
    border-radius: 10px;
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
    margin-top: 10px;
`;

Minesweeper.Game.MinesGrid.Row = Styled.p`
    margin: 0;
`;

Minesweeper.Game.MinesGrid.Cell = Styled.span`
    width: 30px;
    height: 30px;
    margin: 0 2px;
    background-color: #E6E7E8;
    display: inline-block;
`;

Minesweeper.Settings = Styled.div`
    background-color: #FFFFFF;
    display: none;
`;

Minesweeper.Statistics = Styled.div`

`;

Minesweeper.Statistics.Field = Styled.div`

`;

export default Minesweeper;
