import Box from '../sharedTypes';
import { calculateGCost, calculateHCost } from '../utils';

export default function AStar(map: string[][], aStarInterval: any) {
  const a: any = {};
  const b: any = {};

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map[i][j] === 'a') {
        a.x = j;
        a.y = i;
      }
      if (map[i][j] === 'b') {
        b.x = j;
        b.y = i;
      }
    }
  }

  let open: Box[] = [];
  let closed: Box[] = [];
  let path: Box[] = [];

  const gCost = calculateGCost(a.x, a.y, a);
  const hCost = calculateHCost(a.x, a.y, b);
  const fCost = gCost + hCost;
  open.push({
    x: a.x,
    y: a.y,
    gCost: gCost,
    hCost: hCost,
    fCost: fCost,
  });

  return () => {
    const current = open.reduce((min, current) => {
      if (current.fCost === min.fCost) {
        return current.hCost <= min.hCost ? current : min;
      }
      return current.fCost <= min.fCost ? current : min;
    }, open[0]);

    open = open.filter((box: Box) => box !== current);
    closed.push(current);

    if (current.x === b.x && current.y === b.y) {
      clearInterval(aStarInterval);

      let temp = current;
      while (temp) {
        path.unshift(temp); // Add to the beginning of the array
        temp = temp.parent!; // Traverse back using parent pointers
      }
    }

    const neighbour: { x: number; y: number }[] = [];

    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        if (x !== 0 || y !== 0) {
          neighbour.push({ x: current.x + x, y: current.y + y });
        }
      }
    }

    neighbour.forEach((box: any) => {
      if (map[box.y] && map[box.y][box.x] && map[box.y][box.x] !== 'w') {
        if (
          !closed.some(
            (closedBox: Box) => closedBox.x === box.x && closedBox.y === box.y
          )
        ) {
          const gCost = calculateGCost(box.x, box.y, a);
          const hCost = calculateHCost(box.x, box.y, b);
          const fCost = gCost + hCost;
          const existingOpenBox = open.find(
            (openBox: any) => openBox.x === box.x && openBox.y === box.y
          );

          if (existingOpenBox) {
            if (fCost < existingOpenBox.fCost) {
              existingOpenBox.gCost = gCost;
              existingOpenBox.hCost = hCost;
              existingOpenBox.fCost = fCost;
              existingOpenBox.parent = current;
            }
          } else {
            open.push({
              x: box.x,
              y: box.y,
              gCost: gCost,
              hCost: hCost,
              fCost: fCost,
              parent: current,
            });
            console.log(current);
          }
        }
      }
    });
    const visualizationArray = map.map((row: any, y: number) => {
      return row.map((box: any, x: number) => {
        if (box === 'a' || box === 'b') return box;
        if (path.some((pathBox: any) => pathBox.x === x && pathBox.y === y)) {
          return 'p';
        }
        if (open.some((openBox: any) => openBox.x === x && openBox.y === y)) {
          return 'o';
        }
        if (
          closed.some(
            (closedBox: any) => closedBox.x === x && closedBox.y === y
          )
        ) {
          return 'c';
        }

        return box;
      });
    });
    return visualizationArray;
  };
}