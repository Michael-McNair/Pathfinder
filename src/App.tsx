import { useState, useEffect, useRef } from 'react';
import { createAStar } from './algorithms/AStar.tsx';
import { createMaze } from './algorithms/MazeGenerator.tsx';
import runImg from './img/run.svg';
import wallImg from './img/wall.svg';
import selectedWall from './img/selected-wall.svg';
import numberImg from './img/number.svg';
import selectedNumberImg from './img/selected-number.svg';
import eyeSlashImg from './img/eye-slash.svg';
import selectedEyeSlashImg from './img/selected-eye-slash.svg';
import arrowImg from './img/arrow.svg';
import selectedArrowImg from './img/selected-arrow.svg';
import whiteArrowImg from './img/white-arrow.svg';

function App() {
  const [size, setSize] = useState(11);
  const [speed, setSpeed] = useState(15);
  const [minScreen, setMinScreen] = useState(0);
  const [map, setMap] = useState([
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'a', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: 'b', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
    [
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
      { box: '#', gCost: 0, hCost: 0, fCost: 0, direction: '' },
    ],
  ]);
  const [brush, setBrush] = useState('w');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseButton, setMouseButton] = useState(0);
  const [running, setRunning] = useState('none');
  const [currentAStar, setCurrentAStar] = useState<any>();
  const [currentMaze, setCurrentMaze] = useState<any>();
  const [boxVisuals, setBoxVisuals] = useState('arrows');

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const element = ref?.current;

    if (!element) return;

    const observer = new ResizeObserver(() => {
      // Do something when the element is resized
      if (ref.current != null) {
        setMinScreen(
          Math.min(ref.current.clientHeight, ref.current.clientWidth)
        );
      }
    });

    observer.observe(element);
    return () => {
      // Cleanup the observer by unobserving all elements
      observer.disconnect();
    };
  }, []);

  const finish = () => {
    setRunning('finished');
    setCurrentAStar(null);
    setCurrentMaze(null);
    clearInterval(aStarInterval);
    clearInterval(mazeInterval);
  };

  // run algorithms
  let aStarInterval: any;
  let mazeInterval: any;
  useEffect(() => {
    let aStarInstance: any;
    if (running === 'aStar') {
      if (!currentAStar) {
        aStarInstance = createAStar(map, finish, setMap);
        aStarInstance.initializeAStar();
        setCurrentAStar(aStarInstance);
      } else {
        aStarInstance = currentAStar;
      }

      aStarInterval = setInterval(() => {
        aStarInstance.tick();
      }, 1000 / speed);
    }

    let mazeInstance: any;
    if (running === 'maze') {
      if (!currentMaze) {
        mazeInstance = createMaze(map, finish, setMap);
        mazeInstance.initializeMaze();
        setCurrentMaze(mazeInstance);
      } else {
        mazeInstance = currentMaze;
      }
      mazeInterval = setInterval(() => {
        mazeInstance.tick();
      }, 1000 / speed);
    }

    return () => {
      clearInterval(aStarInterval);
      clearInterval(mazeInterval);
    };
  }, [running, speed]);

  const handleBoxClick = (x: any, y: any, e: any) => {
    setMap((prevMap) => {
      const updatedMap = [...prevMap];
      updatedMap[y] = [...prevMap[y]];

      // Check if the current brush is 'a' or 'b' and update the map accordingly
      if (e.button === 0 && mouseButton === 0) {
        if (
          (brush === 'a' &&
            !updatedMap.flat().some((box) => box.box === 'a')) ||
          (brush === 'b' &&
            !updatedMap.flat().some((box) => box.box === 'b')) ||
          brush === 'w'
        ) {
          updatedMap[y][x].box = brush;
        }
      } else if (e.button === 2 || mouseButton === 2) {
        updatedMap[y][x].box = '#';
      }

      return updatedMap;
    });
  };

  const handleBoxDrag = (x: any, y: any, e: any) => {
    if (isMouseDown) {
      handleBoxClick(x, y, e);
    }
  };

  const handleMouseDown = (x: number, y: number, e: any) => {
    setMouseButton(e.button);

    handleBoxClick(x, y, e);

    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-background overflow-hidden">
      <nav className="w-full h-14 flex justify-between items-center px-8 border-b border-text border-opacity-50">
        <div className="flex items-center h-full gap-3">
          <h1 className="text-4xl font-title text-text">Pathfinder</h1>
        </div>
        <div className="h-full py-1 flex items-center gap-2">
          <div className="flex items-center gap-1 h-full">
            <div
              className="h-full p-0 aspect-square  hover:bg-opacity-40 hover:bg-black cursor-pointer duration-200 rounded-lg"
              title="Show Arrows"
              onClick={() => setBoxVisuals('arrows')}
            >
              <img
                src={boxVisuals === 'arrows' ? selectedArrowImg : arrowImg}
                alt="arrow"
                className="rotate-45"
              />
            </div>
            <img
              src={boxVisuals === 'costs' ? selectedNumberImg : numberImg}
              alt="Show Costs"
              className="h-full p-2 aspect-square  hover:bg-opacity-40 hover:bg-black cursor-pointer duration-200 rounded-lg"
              title="Show Costs"
              onClick={() => setBoxVisuals('costs')}
            />
            <img
              src={boxVisuals === 'hide' ? selectedEyeSlashImg : eyeSlashImg}
              alt="wall"
              className="h-full p-2 aspect-square  hover:bg-opacity-40 hover:bg-black cursor-pointer duration-200 rounded-lg"
              title="No Visuals"
              onClick={() => setBoxVisuals('hide')}
            />
            <div className="w-px bg-primary opacity-50 h-3/4"></div>
            <img
              src={brush === 'w' ? selectedWall : wallImg}
              alt="wall"
              className="h-full p-2 aspect-square  hover:bg-opacity-40 hover:bg-black cursor-pointer duration-200 rounded-lg"
              title="brush type"
              onClick={() => setBrush('w')}
            />
            <div
              className="h-full flex justify-center items-center p-1 aspect-square hover:bg-opacity-40 hover:bg-black cursor-pointer duration-200 rounded-lg"
              title="brush type"
              onClick={() => setBrush('a')}
            >
              <h3
                className={` ${
                  brush === 'a' ? 'text-secondary' : 'text-primary'
                }  text-3xl`}
              >
                A
              </h3>
            </div>
            <div
              className="h-full flex justify-center items-center p-1 aspect-square  hover:bg-opacity-40 hover:bg-black cursor-pointer duration-200 rounded-lg"
              title="brush type"
              onClick={() => setBrush('b')}
            >
              <h3
                className={` ${
                  brush === 'b' ? 'text-secondary' : 'text-primary'
                }  text-3xl`}
              >
                B
              </h3>
            </div>
          </div>

          <div className="flex items-center flex-col">
            <h3 className="text-text">speed: {speed}</h3>
            <input
              type="range"
              value={speed}
              onChange={(e) => {
                setSpeed(Number(e.target.value));
              }}
              className="w-32 h-full"
              min={0.5}
              max={30}
              step={0.5}
            />
          </div>

          <div className="flex items-center flex-col">
            <h3 className="text-text">
              size: {size} x {size}
            </h3>
            <input
              type="range"
              value={size}
              onChange={(e) => {
                if (running === 'none' || running === 'finished') {
                  setSize(Number(e.target.value));

                  setMap(() => {
                    let newMap = [];
                    for (let i = 0; i < Number(e.target.value); i++) {
                      const row = [];

                      for (let j = 0; j < Number(e.target.value); j++) {
                        row.push({
                          box: '#',
                          gCost: 0,
                          hCost: 0,
                          fCost: 0,
                          direction: '',
                        });
                      }

                      newMap.push(row);
                    }
                    return newMap;
                  });
                }
              }}
              className="w-32 h-full"
              min={5}
              max={29}
              step={2}
            />
          </div>

          <div className="py-1 h-full">
            <button
              className={`group rounded-md h-full text-text text-lg box-border relative z-20 bg-primary overflow-hidden`}
              onClick={() => {
                if (running === 'aStar') return;
                if (running === 'maze') return setRunning('pause');
                setRunning('maze');
              }}
            >
              <div className="w-0 h-full absolute top-0 bg-secondary group-hover:w-full duration-300 z-10"></div>
              <h3 className="relative text-xl text-text px-2 z-30">
                Random Maze
              </h3>
            </button>
          </div>

          <div className="py-1 h-full">
            <button
              className={`group rounded-md h-full text-text text-lg box-border relative z-20 bg-primary overflow-hidden`}
              onClick={() => {
                if (running === 'maze') return;
                if (running === 'aStar') return setRunning('pause');
                setRunning('aStar');
              }}
            >
              <div className="w-0 h-full absolute top-0 bg-secondary group-hover:w-full duration-300 z-10"></div>
              <div className="h-full flex items-center">
                <h3 className="relative text-xl text-text pl-2 z-30">Run</h3>
                <img
                  src={runImg}
                  alt="run"
                  className="relative h-full w-full p-1 z-30"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className="h-full w-full p-5">
        <div
          className="h-full w-full flex items-center justify-center"
          ref={ref}
        >
          <div
            className="grid"
            style={{
              gridTemplate: `repeat(${size}, ${
                minScreen / size
              }px) / repeat(${size}, ${minScreen / size}px)`,
            }}
          >
            {map.map((row: any, y) => {
              return (
                <>
                  {row.map((box: any, x: number) => {
                    const colorVariants: any = {
                      '#': 'bg-secondary',
                      a: 'bg-accent',
                      b: 'bg-primary',
                      w: 'bg-background',
                      o: 'bg-green-700',
                      c: 'bg-red-700',
                      p: 'bg-blue-700',
                    };

                    return (
                      <div
                        key={x + y}
                        className={`${colorVariants[box.box]} ${
                          box.box === 'w' && 'border-text'
                        } bg-green rounded w-full h-full border-background flex items-center justify-center text-text text-4xl cursor-crosshair`}
                        style={{
                          borderWidth: `${size > 8 ? '1' : '2'}px`,
                        }}
                        onMouseDown={(e) => handleMouseDown(x, y, e)}
                        onMouseUp={handleMouseUp}
                        onClick={(e) => {
                          handleBoxClick(x, y, e);
                        }}
                        onMouseEnter={(e) => handleBoxDrag(x, y, e)}
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      >
                        <h3
                          style={{ fontSize: minScreen / size - 3 + 'px' }}
                          className="text-text"
                        >
                          {box.box === 'a' && 'A'}
                          {box.box === 'b' && 'B'}
                        </h3>

                        {boxVisuals === 'arrows' &&
                          box.direction !== '' &&
                          box.box !== 'a' &&
                          box.box !== 'b' && (
                            <div>
                              {box.direction === 'up' && (
                                <img src={whiteArrowImg} className="p-1"></img>
                              )}
                              {box.direction === 'up-right' && (
                                <img
                                  src={whiteArrowImg}
                                  className="rotate-45 p-1"
                                ></img>
                              )}
                              {box.direction === 'up-left' && (
                                <img
                                  src={whiteArrowImg}
                                  className="-rotate-45 p-1"
                                ></img>
                              )}
                              {box.direction === 'left' && (
                                <img
                                  src={whiteArrowImg}
                                  className="-rotate-90 p-1"
                                ></img>
                              )}
                              {box.direction === 'right' && (
                                <img
                                  src={whiteArrowImg}
                                  className="rotate-90 p-1"
                                ></img>
                              )}
                              {box.direction === 'down' && (
                                <img
                                  src={whiteArrowImg}
                                  className="rotate-180 p-1"
                                ></img>
                              )}
                              {box.direction === 'down-right' && (
                                <img
                                  src={whiteArrowImg}
                                  className="rotate-135 p-1"
                                ></img>
                              )}
                              {box.direction === 'down-left' && (
                                <img
                                  src={whiteArrowImg}
                                  className="-rotate-135 p-1"
                                ></img>
                              )}
                            </div>
                          )}

                        {boxVisuals === 'costs' &&
                          box.fCost !== 0 &&
                          box.box !== 'a' &&
                          box.box !== 'b' && (
                            <div className="h-full w-full flex flex-col items-center justify-center">
                              <div
                                className={`${
                                  size <= 14 ? 'gap-2 mb-1' : 'gap-1 mb-0'
                                } flex justify-center`}
                              >
                                <h6
                                  style={{
                                    fontSize:
                                      (minScreen / size - 3) * 0.3 + 'px',
                                    lineHeight: 1,
                                  }}
                                  className="m-0 "
                                >
                                  {box.gCost}
                                </h6>
                                <h6
                                  style={{
                                    fontSize:
                                      (minScreen / size - 3) * 0.3 + 'px',
                                    lineHeight: 1,
                                  }}
                                >
                                  {box.hCost}
                                </h6>
                              </div>
                              <h3
                                style={{
                                  fontSize: (minScreen / size - 3) * 0.4 + 'px',
                                  lineHeight: 1,
                                }}
                              >
                                {box.fCost}
                              </h3>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
