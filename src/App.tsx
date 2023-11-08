import { useState, useEffect, useRef } from 'react';

function App() {
  const [size, setSize] = useState(10);
  const [minScreen, setMinScreen] = useState(0);
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
            {Array.from({ length: size * size }, (_, i) => (
              <div
                key={i}
                className="bg-text w-full h-full border-background"
                style={{ borderWidth: `${size > 8 ? '1' : '2'}px` }}
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
