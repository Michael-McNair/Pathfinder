function Maze(
  map: {
    box: string;
    gCost: number;
    hCost: number;
    fCost: number;
    direction: string;
  }[][],
  finish: any
) {
  let newMap = map.map((row) =>
    row.map((box) => {
      return { box: 'w', gCost: 0, hCost: 0, fCost: 0, direction: '' };
    })
  );
  let current = { x: 1, y: 1 };
  const size = map.length;

  const turned: { x: number; y: number }[] = [];

  return () => {
    newMap[current.y][current.x].box = '#';
    newMap = [...newMap];

    const movable = [
      { x: current.x, y: current.y - 2 },
      { x: current.x, y: current.y + 2 },
      { x: current.x - 2, y: current.y },
      { x: current.x + 2, y: current.y },
    ].filter((box) => {
      if (box.x <= 0 || box.y <= 0 || box.x >= size - 1 || box.y >= size - 1) {
        return false;
      } else if (newMap[box.y][box.x].box === '#') {
        return false;
      }
      return true;
    });
    const pathChosen = movable[Math.floor(Math.random() * movable.length)];

    if (pathChosen) {
      turned.push(current);
      newMap[pathChosen.y][pathChosen.x].box = '#';
      let between = { ...current };
      if (current.x === pathChosen.x) {
        between.y = (current.y + pathChosen.y) / 2;
      }
      if (current.y === pathChosen.y) {
        between.x = (current.x + pathChosen.x) / 2;
      }

      newMap[between.y][between.x].box = '#';

      current = { ...pathChosen };
    } else {
      const a = turned.filter((box) => {
        if (
          (box.y - 2 >= 0 && newMap[box.y - 2][box.x].box === 'w') ||
          (box.y + 2 < newMap.length && newMap[box.y + 2][box.x].box === 'w') ||
          (box.x - 2 >= 0 && newMap[box.y][box.x - 2].box === 'w') ||
          (box.x + 2 < newMap[box.y].length &&
            newMap[box.y][box.x + 2].box === 'w')
        ) {
          return true;
        }
        return false;
      });
      if (a.length > 0) {
        current = a[0];
      } else {
        finish();
      }
    }

    return newMap;
  };
}

export function createMaze(
  map: {
    box: string;
    gCost: number;
    hCost: number;
    fCost: number;
    direction: string;
  }[][],
  finish: any,
  updateMap: any
) {
  let mazeState: any;
  let mazeInterval: any;

  const initializeMaze = () => {
    mazeState = Maze(map, finish);
  };

  const tick = () => {
    if (mazeState) {
      updateMap(mazeState());
    }
  };

  const pauseMaze = () => {
    clearInterval(mazeInterval);
  };

  return {
    initializeMaze,
    tick,
    pauseMaze,
  };
}
