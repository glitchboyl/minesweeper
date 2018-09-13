import React, { Component } from "react";
import Minesweeper from "components/Minesweeper";

// Emoji SVG.
import grinning from "assets/grinning.svg";
import open_mouth from "assets/open_mouth.svg";
import sunglasses from "assets/sunglasses.svg";
import dizzy_face from "assets/dizzy_face.svg";
import wrench from "assets/wrench.svg";
import bomb from "assets/bomb.svg";
import triangular_flag_on_post from "assets/triangular_flag_on_post.svg";
import boom from "assets/boom.svg";
import one from "assets/one.svg";
import two from "assets/two.svg";
import three from "assets/three.svg";
import four from "assets/four.svg";
import five from "assets/five.svg";
import six from "assets/six.svg";
import seven from "assets/seven.svg";
import eight from "assets/eight.svg";

let MinesGrid = null;
let timer = null;
let bombsPosition = [];
let flaggingBombs = [];

const STATE = {
  UNKNOWN: 0,
  HAS_ONE: 1,
  HAS_TWO: 2,
  HAS_THREE: 3,
  HAS_FOUR: 4,
  HAS_FIVE: 5,
  HAS_SIX: 6,
  HAS_SEVEN: 7,
  HAS_EIGHT: 8,
  BOMB: 9,
  SAFE: 10,
  BOOM: 99
};
const GAME = {
  INIT: 0,
  PROGRESSING: 1,
  WIN: 2,
  LOST: 3
};

function randomNumber(m) {
  return parseInt(Math.random() * m, 10);
}

function graphically(state) {
  switch (state) {
    case STATE.HAS_ONE:
      return <img src={one} alt="one" />;
    case STATE.HAS_TWO:
      return <img src={two} alt="two" />;
    case STATE.HAS_THREE:
      return <img src={three} alt="three" />;
    case STATE.HAS_FOUR:
      return <img src={four} alt="four" />;
    case STATE.HAS_FIVE:
      return <img src={five} alt="five" />;
    case STATE.HAS_SIX:
      return <img src={six} alt="six" />;
    case STATE.HAS_SEVEN:
      return <img src={seven} alt="seven" />;
    case STATE.HAS_EIGHT:
      return <img src={eight} alt="eight" />;
    case STATE.BOMB:
      return (
        <img
          style={{
            width: "90%",
            margin: "5%"
          }}
          src={bomb}
          alt="bomb"
        />
      );
    case STATE.BOOM:
      return <img src={boom} alt="boom" />;
    case STATE.SAFE:
      return <Minesweeper.Game.MinesGrid.Cell.Safe />;
    case STATE.UNKNOWN:
    default:
      return "";
  }
}

function isEnd(state) {
  switch (state) {
    case GAME.WIN:
    case GAME.LOST:
      return true;
    case GAME.INIT:
    case GAME.PROGRESSING:
    default:
      return false;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      xs: 10,
      ys: 10,
      bombs: 10,
      flags: 10,
      moves: 0,
      time: 0.0,
      minesGrid: [],
      showSettings: false,
      clicking: false,
      gameState: GAME.INIT
    };
    this.restartGame = this.restartGame.bind(this);
  }
  componentWillMount() {
    this.rewriteGrid();
  }
  render() {
    const {
      minesGrid,
      showSettings,
      clicking,
      flags,
      bombs,
      moves,
      time,
      gameState
    } = this.state;
    if (!MinesGrid) {
      MinesGrid = () =>
        minesGrid.map((row, x) => {
          return (
            <Minesweeper.Game.MinesGrid.Row key={`row-${x}`}>
              {row.map((cell, y) => (
                <Minesweeper.Game.MinesGrid.Cell
                  key={`${x},${y}`}
                  onMouseDown={() => this.setState({ clicking: true })}
                  onMouseUp={((x, y) => ({ button }) => {
                    this.setState({ clicking: false });
                    if (button === 0) {
                      return this.handleClick(x, y);
                    } else if (button === 2) {
                      return this.toggleFlag(x, y);
                    }
                  })(x, y)}
                  onContextMenu={e => {
                    e.preventDefault();
                  }}
                >
                  <Minesweeper.Game.MinesGrid.Cell.Mask
                    style={{ display: cell.showMask ? "block" : "none" }}
                  />
                  {graphically(cell.state)}
                  {cell.flagging ? (
                    <img
                      style={{
                        width: "70%",
                        margin: "15%",
                        top: 0,
                        left: 0,
                        position: "absolute"
                      }}
                      src={triangular_flag_on_post}
                      alt="triangular_flag_on_post"
                    />
                  ) : (
                    ""
                  )}
                </Minesweeper.Game.MinesGrid.Cell>
              ))}
            </Minesweeper.Game.MinesGrid.Row>
          );
        });
    }
    return (
      <Minesweeper>
        <Minesweeper.ToggleButton
          onClick={() =>
            this.setState(({ showSettings }) => ({
              showSettings: !showSettings
            }))
          }
        >
          <img
            style={{ display: !showSettings ? "block" : "none" }}
            src={wrench}
            alt="wrench"
          />
          <img
            style={{ display: showSettings ? "block" : "none" }}
            src={triangular_flag_on_post}
            alt="triangular_flag_on_post"
          />
        </Minesweeper.ToggleButton>
        <Minesweeper.Game>
          <Minesweeper.Game.Container>
            <Minesweeper.Game.RestartButton onClick={this.restartGame}>
              <img
                style={{
                  display: !isEnd(gameState) && !clicking ? "block" : "none"
                }}
                src={grinning}
                alt="grinning"
              />
              <img
                style={{
                  display: !isEnd(gameState) && clicking ? "block" : "none"
                }}
                src={open_mouth}
                alt="open_mouth"
              />
              <img
                style={{ display: gameState === GAME.WIN ? "block" : "none" }}
                src={sunglasses}
                alt="sunglasses"
              />
              <img
                style={{ display: gameState === GAME.LOST ? "block" : "none" }}
                src={dizzy_face}
                alt="dizzy_face"
              />
            </Minesweeper.Game.RestartButton>
            <Minesweeper.Game.MinesGrid>
              <MinesGrid />
            </Minesweeper.Game.MinesGrid>
          </Minesweeper.Game.Container>
          <Minesweeper.Game.Statistics>
            <Minesweeper.Game.Statistics.Field
              title="Bombs"
              value={`${flags}/${bombs}`}
            />
            <Minesweeper.Game.Statistics.Field
              title="Moves"
              value={`${moves}`}
            />
            <Minesweeper.Game.Statistics.Field
              title="Time"
              value={`${time.toFixed(1)}`}
            />
          </Minesweeper.Game.Statistics>
        </Minesweeper.Game>
        <Minesweeper.Settings
          style={{ display: showSettings ? "block" : "none" }}
        />
      </Minesweeper>
    );
  }
  restartGame() {
    MinesGrid = null;
    bombsPosition = [];
    flaggingBombs = [];
    this.toggleTimer(false);
    this.setState({
      moves: 0,
      flags: this.state.bombs,
      time: 0.0,
      gameState: GAME.INIT
    });
    this.rewriteGrid();
  }
  rewriteGrid() {
    const { xs, ys, bombs } = this.state;
    const minesGrid = new Array(xs).fill(STATE.UNKNOWN).map(() =>
      new Array(ys).fill(STATE.UNKNOWN).map(() => ({
        state: STATE.UNKNOWN,
        showMask: true,
        flagging: false
      }))
    );
    while (bombsPosition.length < bombs) {
      let x = randomNumber(xs);
      let y = randomNumber(ys);
      let p = `${x},${y}`;
      if (!bombsPosition.includes(p)) {
        bombsPosition.push(p);
        minesGrid[x][y].state = STATE.BOMB;
      } else {
        continue;
      }
    }
    this.setState({ minesGrid });
  }
  handleClick(x, y) {
    const { gameState } = this.state;
    if (!isEnd(gameState)) {
      const { state, showMask, flagging } = this.state.minesGrid[x][y];
      const handleState = {};
      if (showMask && !flagging) {
        let { minesGrid, moves, time } = this.state;
        if (!time) {
          this.toggleTimer(true);
        }
        if (state === STATE.UNKNOWN) {
          handleState.minesGrid = this.checkout(minesGrid, x, y);
        } else if (state === STATE.BOMB) {
          minesGrid[x][y].state = STATE.BOOM;
          bombsPosition.forEach(p => {
            const [px, py] = p.split(",");
            minesGrid[px][py].showMask = false;
            minesGrid[px][py].flagging = false;
          });
          handleState.minesGrid = minesGrid;
          handleState.gameState = GAME.LOST;
          this.toggleTimer(false);
        }
        handleState.moves = ++moves;
      }
      this.setState(handleState);
    }
  }
  checkout(minesGrid, x, y) {
    let bombs = 0;
    const needCheckout = [];
    if (x !== 0) {
      if (
        minesGrid[x - 1][y].state === STATE.UNKNOWN &&
        !minesGrid[x - 1][y].flagging
      ) {
        needCheckout.push([x - 1, y]);
      } else if (minesGrid[x - 1][y].state === STATE.BOMB) {
        bombs += 1;
      }
      if (y !== 0) {
        if (
          minesGrid[x - 1][y - 1].state === STATE.UNKNOWN &&
          minesGrid[x][y - 1].state === STATE.UNKNOWN &&
          minesGrid[x - 1][y].state === STATE.UNKNOWN &&
          !minesGrid[x - 1][y - 1].flagging
        ) {
          needCheckout.push([x - 1, y - 1]);
        } else if (minesGrid[x - 1][y - 1].state === STATE.BOMB) {
          bombs += 1;
        }
      }
      if (y !== this.state.ys - 1) {
        if (
          minesGrid[x - 1][y + 1].state === STATE.UNKNOWN &&
          minesGrid[x][y + 1].state === STATE.UNKNOWN &&
          minesGrid[x - 1][y].state === STATE.UNKNOWN &&
          !minesGrid[x - 1][y + 1].flagging
        ) {
          needCheckout.push([x - 1, y + 1]);
        } else if (minesGrid[x - 1][y + 1].state === STATE.BOMB) {
          bombs += 1;
        }
      }
    }
    if (x !== this.state.xs - 1) {
      if (
        minesGrid[x + 1][y].state === STATE.UNKNOWN &&
        !minesGrid[x + 1][y].flagging
      ) {
        needCheckout.push([x + 1, y]);
      } else if (minesGrid[x + 1][y].state === STATE.BOMB) {
        bombs += 1;
      }
      if (y !== 0) {
        if (
          minesGrid[x + 1][y - 1].state === STATE.UNKNOWN &&
          minesGrid[x][y - 1].state === STATE.UNKNOWN &&
          minesGrid[x + 1][y].state === STATE.UNKNOWN &&
          !minesGrid[x + 1][y - 1].flagging
        ) {
          needCheckout.push([x + 1, y - 1]);
        } else if (minesGrid[x + 1][y - 1].state === STATE.BOMB) {
          bombs += 1;
        }
      }
      if (y !== this.state.ys - 1) {
        if (
          minesGrid[x + 1][y + 1].state === STATE.UNKNOWN &&
          minesGrid[x][y + 1].state === STATE.UNKNOWN &&
          minesGrid[x + 1][y].state === STATE.UNKNOWN &&
          !minesGrid[x + 1][y + 1].flagging
        ) {
          needCheckout.push([x + 1, y + 1]);
        } else if (minesGrid[x + 1][y + 1].state === STATE.BOMB) {
          bombs += 1;
        }
      }
    }
    if (y !== 0) {
      if (
        minesGrid[x][y - 1].state === STATE.UNKNOWN &&
        !minesGrid[x][y - 1].flagging
      ) {
        needCheckout.push([x, y - 1]);
      } else if (minesGrid[x][y - 1].state === STATE.BOMB) {
        bombs += 1;
      }
    }
    if (y !== this.state.ys - 1) {
      if (
        minesGrid[x][y + 1].state === STATE.UNKNOWN &&
        !minesGrid[x][y + 1].flagging
      ) {
        needCheckout.push([x, y + 1]);
      } else if (minesGrid[x][y + 1].state === STATE.BOMB) {
        bombs += 1;
      }
    }
    minesGrid[x][y].state = bombs === 0 ? STATE.SAFE : bombs;
    minesGrid[x][y].showMask = false;
    if (minesGrid[x][y].state === STATE.SAFE && !!needCheckout.length) {
      needCheckout.forEach(c => {
        this.checkout(minesGrid, c[0], c[1]);
      });
    }
    return minesGrid;
  }
  toggleFlag(x, y) {
    const { gameState, time } = this.state;
    if (!isEnd(gameState)) {
      const { showMask, flagging } = this.state.minesGrid[x][y];
      if (showMask) {
        if (!time) {
          this.toggleTimer(true);
        }
        this.setState(({ minesGrid, flags, gameState }) => {
          minesGrid[x][y].flagging = !flagging;
          if (!flagging) {
            flags--;
            if (minesGrid[x][y].state === STATE.BOMB) {
              flaggingBombs.push(`${x},${y}`);
            }
            if (flaggingBombs.length === bombsPosition.length) {
              gameState = GAME.WIN;
              this.toggleTimer(false);
            }
          } else {
            flags++;
            if (minesGrid[x][y].state === STATE.BOMB) {
              flaggingBombs.splice(
                flaggingBombs.findIndex(p => p === `${x},${y}`),
                1
              );
            }
          }
          return {
            minesGrid,
            flags,
            gameState
          };
        });
      }
    }
  }
  toggleTimer(s) {
    if (s) {
      this.setState(({ time }) => ({
        time: time + 0.1
      }));
      timer = setTimeout(() => {
        this.toggleTimer(s);
      }, 50);
    } else {
      clearTimeout(timer);
    }
  }
}

export default App;
