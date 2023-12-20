import { useState, useEffect, useRef } from 'react';
import AStar from './algorithms/AStar.tsx';
import runImg from './img/run.svg';
import wallImg from './img/wall.svg';
import selectedWall from './img/selected-wall.svg';
import MazeGenerator from './algorithms/MazeGenerator.tsx';

function App() {
  const [size, setSize] = useState(11);
  const [speed, setSpeed] = useState(100);
  const [minScreen, setMinScreen] = useState(0);
  const [fontSize, setFontSize] = useState(minScreen / size - 3);
  const [map, setMap] = useState([
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ]);
  const [brush, setBrush] = useState('w');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseButton, setMouseButton] = useState(0);
  const [running, setRunning] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const run = () => {
    setRunning(true);

    const aStarInterval = setInterval(() => {
      setMap(aStarTick());
    }, speed);

    const aStarTick = AStar(map, aStarInterval, setRunning);
  };

  const generateMaze = () => {
    setRunning(true);

    const mazeInterval = setInterval(() => {
      setMap(mazeTick());
    }, speed);

    const mazeTick = MazeGenerator(map, mazeInterval, setRunning);
  };

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

  const handleBoxClick = (x: any, y: any, e: any) => {
    setMap((prevMap) => {
      const updatedMap = [...prevMap];
      updatedMap[y] = [...prevMap[y]];

      // Check if the current brush is 'a' or 'b' and update the map accordingly
      if (e.button === 0 && mouseButton === 0) {
        if (
          (brush === 'a' && !updatedMap.flat().includes('a')) ||
          (brush === 'b' && !updatedMap.flat().includes('b')) ||
          brush === 'w'
        ) {
          updatedMap[y][x] = brush;
        }
      } else if (e.button === 2 || mouseButton === 2) {
        updatedMap[y][x] = '#';
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

  useEffect(() => {
    setFontSize(minScreen / size - 3);
  }, [minScreen, size]);

  return (
    <div className="w-screen h-screen flex flex-col bg-background overflow-hidden">
      <nav className="w-full h-14 flex justify-between items-center px-8 border-b border-text border-opacity-50">
        <div className="flex items-center h-full gap-3">
          <h1 className="text-4xl font-title text-text">Pathfinder</h1>
        </div>
        <div className="h-full py-1 flex items-center gap-2">
          <div className="flex items-center gap-1 h-full">
            <img
              src={brush === 'w' ? selectedWall : wallImg}
              alt="wall"
              className="h-full p-2 aspect-square  hover:bg-opacity-40 hover:bg-black cursor-pointer duration-200 rounded-lg"
              onClick={() => setBrush('w')}
            />
            <div
              className="h-full flex justify-center items-center p-1 aspect-square hover:bg-opacity-40 hover:bg-black cursor-pointer duration-200 rounded-lg"
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
              min={30}
              max={2000}
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
                if (!running) {
                  setSize(Number(e.target.value));

                  setMap(() => {
                    let newMap = [];
                    for (let i = 0; i < Number(e.target.value); i++) {
                      const row = [];

                      for (let j = 0; j < Number(e.target.value); j++) {
                        row.push('#');
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
                if (!running) {
                  generateMaze();
                }
              }}
            >
              <div className="w-0 h-full absolute top-0 bg-secondary group-hover:w-full duration-300 z-10"></div>
              <h3 className="relative text-xl text-text px-2 z-30">
                random maze
              </h3>
            </button>
          </div>

          <div className="py-1 h-full">
            <button
              className={`group rounded-md h-full text-text text-lg box-border aspect-square relative z-20 bg-primary overflow-hidden`}
              onClick={() => {
                if (!running) {
                  run();
                }
              }}
            >
              <div className="w-0 h-full absolute top-0 bg-secondary group-hover:w-full duration-300 z-10"></div>
              <img
                src={runImg}
                alt="run"
                className="relative h-full w-full p-1 z-30"
              />
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
                        className={`${colorVariants[box]} ${
                          box === 'w' && 'border-text'
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
                        <h3 style={{ fontSize: fontSize + 'px' }}>
                          {box === 'a' && 'A'}
                          {box === 'b' && 'B'}
                        </h3>
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
