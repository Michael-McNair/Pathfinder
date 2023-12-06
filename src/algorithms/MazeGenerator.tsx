export default function MazeGenerator(
  map: string[][],
  mazeInterval: any,
  setRunning: any
) {
  let newMap = map.map((row) => row.map(() => 'w'));
  let current = { x: 1, y: 1 };
  const size = map.length;

  const turned: { x: number; y: number }[] = [];

  return () => {
    newMap[current.y][current.x] = '#';
    newMap = [...newMap];

    const movable = [
      { x: current.x, y: current.y - 2 },
      { x: current.x, y: current.y + 2 },
      { x: current.x - 2, y: current.y },
      { x: current.x + 2, y: current.y },
    ].filter((box) => {
      if (box.x <= 0 || box.y <= 0 || box.x >= size - 1 || box.y >= size - 1) {
        return false;
      } else if (newMap[box.y][box.x] === '#') {
        return false;
      }
      return true;
    });
    const pathChosen = movable[Math.floor(Math.random() * movable.length)];

    if (pathChosen) {
      turned.push(current);
      newMap[pathChosen.y][pathChosen.x] = '#';
      let between = { ...current };
      if (current.x === pathChosen.x) {
        between.y = (current.y + pathChosen.y) / 2;
      }
      if (current.y === pathChosen.y) {
        between.x = (current.x + pathChosen.x) / 2;
      }

      newMap[between.y][between.x] = '#';

      current = { ...pathChosen };
    } else {
      const a = turned.filter((box) => {
        if (
          (box.y - 2 >= 0 && newMap[box.y - 2][box.x] === 'w') ||
          (box.y + 2 < newMap.length && newMap[box.y + 2][box.x] === 'w') ||
          (box.x - 2 >= 0 && newMap[box.y][box.x - 2] === 'w') ||
          (box.x + 2 < newMap[box.y].length && newMap[box.y][box.x + 2] === 'w')
        ) {
          return true;
        }
        return false;
      });
      if (a.length > 0) {
        current = a[0];
      } else {
        clearInterval(mazeInterval);
        setRunning(false);
      }
    }

    return newMap;
  };
}
