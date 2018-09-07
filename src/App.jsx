import React, { Component } from "react";
import Minesweeper from "components/Minesweeper";

// Emoji SVG.
import grinning from "assets/grinning.svg";
import open_mouth from "assets/open_mouth.svg";
import dizzy_face from "assets/dizzy_face.svg";
import wrench from "assets/wrench.svg";
import bomb from "assets/bomb.svg";
import triangular_flag_on_post from "assets/triangular_flag_on_post.svg";
import boom from "assets/boom.svg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      xs: 10,
      ys: 10,
      bombs: 10,
      minesGrid: [],
      bombsPosition: [],
      showSettings: false,
      clicking: false,
      gameEnd: false
    };
    this.rewrite = this.rewrite.bind(this);
  }
  componentWillMount() {
    this.rewrite();
  }
  componentWillUpdate() {
    this.rewrite();
  }
  render() {
    const MinesGrid = () =>
      this.state.minesGrid.map((xs, x) => {
        const row = xs.map((ys, y) => (
          <Minesweeper.Game.MinesGrid.Cell key={`${x},${y}`} />
        ));
        return (
          <Minesweeper.Game.MinesGrid.Row key={`row-${x}`}>
            {row}
          </Minesweeper.Game.MinesGrid.Row>
        );
      });
    return (
      <Minesweeper>
        <Minesweeper.ToggleButton>
          <img
            style={{ display: !this.state.showSettings ? "block" : "none" }}
            src={wrench}
            alt="wrench"
          />
          <img
            style={{ display: this.state.showSettings ? "block" : "none" }}
            src={triangular_flag_on_post}
            alt="triangular_flag_on_post"
          />
        </Minesweeper.ToggleButton>
        <Minesweeper.Game>
          <Minesweeper.Game.RestartButton>
            <img
              style={{
                display:
                  !this.state.gameEnd && !this.state.clicking ? "block" : "none"
              }}
              src={grinning}
              alt="grinning"
            />
            <img
              style={{
                display:
                  !this.state.gameEnd && this.state.clicking ? "block" : "none"
              }}
              src={open_mouth}
              alt="open_mouth"
            />
            <img
              style={{ display: this.state.gameEnd ? "block" : "none" }}
              src={dizzy_face}
              alt="dizzy_face"
            />
          </Minesweeper.Game.RestartButton>
          <Minesweeper.Game.MinesGrid>
            <MinesGrid />
          </Minesweeper.Game.MinesGrid>
        </Minesweeper.Game>
        <Minesweeper.Settings />
        <Minesweeper.Statistics>
          <Minesweeper.Statistics.Field />
        </Minesweeper.Statistics>
      </Minesweeper>
    );
  }
  rewrite() {
    const { xs, ys } = this.state;
    this.setState({
      minesGrid: new Array(xs).fill(new Array(ys).fill(0))
    });
  }
}

export default App;
