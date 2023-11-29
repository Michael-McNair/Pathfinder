import { useState, useEffect, useRef } from 'react';
import AStar from './algorithms/AStar.tsx';

function App() {
  const [size, setSize] = useState(10);
  const [minScreen, setMinScreen] = useState(0);
  const [map, setMap] = useState([
    ['#', '#', '#', 'w', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', 'w', '#', '#', '#', '#'],
    ['#', 'w', 'w', 'w', 'w', 'w', 'w', '#', 'w', 'w'],
    ['#', '#', '#', 'w', 'b', '#', '#', '#', 'w', 'a'],
    ['w', 'w', '#', 'w', 'w', 'w', 'w', 'w', 'w', '#'],
    ['#', '#', '#', '#', '#', '#', 'w', '#', 'w', '#'],
    ['w', 'w', 'w', '#', 'w', '#', 'w', '#', 'w', '#'],
    ['#', '#', '#', '#', 'w', '#', '#', '#', 'w', '#'],
    ['#', '#', '#', '#', 'w', '#', 'w', '#', 'w', '#'],
    ['#', '#', '#', '#', '#', '#', 'w', '#', '#', '#'],
  ]);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // a* stuff
    const aStarInterval = setInterval(() => {
      setMap(aStarTick());
    }, 200);

    const aStarTick = AStar(map, aStarInterval);

    // ui
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

  return (
    <div className="w-screen h-screen flex flex-col bg-background overflow-hidden">
      <nav className="w-full flex justify-between px-8 border-b border-text border-opacity-50">
        <h1 className="text-4xl font-title text-text">Pathfinder</h1>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
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
                        className={`${colorVariants[box]} bg-green rounded w-full h-full border-background flex items-center justify-center text-text text-4xl`}
                        style={{ borderWidth: `${size > 8 ? '1' : '2'}px` }}
                      >
                        {box === 'a' && 'A'}
                        {box === 'b' && 'B'}
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
