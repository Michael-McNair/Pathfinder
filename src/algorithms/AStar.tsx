import Box from '../sharedTypes';
import { diagonal, direction, calculateHCost } from '../utils';

function AStar(
  map: {
    box: string;
    gCost: number;
    hCost: number;
    fCost: number;
    direction: string;
  }[][],
  finish: any
) {
  let newMap: any = map.map((row) =>
    row.map((box) => {
      return {
        box:
          box.box === 'c' || box.box === 'o' || box.box === 'p' ? '#' : box.box,
        gCost: null,
        hCost: null,
        fCost: null,
        direction: null,
      };
    })
  );

  const a: any = {};
  const b: any = {};

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map[i][j].box === 'a') {
        a.x = j;
        a.y = i;
      }
      if (map[i][j].box === 'b') {
        b.x = j;
        b.y = i;
      }
    }
  }

  let open: Box[] = [];
  let closed: Box[] = [];
  let path: Box[] = [];

  const gCost = 0;
  const hCost = calculateHCost(a.x, a.y, b);
  const fCost = hCost + gCost;
  open.push({
    x: a.x,
    y: a.y,
    gCost: gCost,
    hCost: hCost,
    fCost: fCost,
    parent: null,
  });

  return () => {
    const current = open.reduce((min, current) => {
      if (current.fCost === min.fCost) {
        return current.hCost <= min.hCost ? current : min;
      }
      return current.fCost <= min.fCost ? current : min;
    }, open[0]);

    if (current) {
      open = open.filter((box: Box) => box !== current);
      closed.push(current);

      if (current.x === b.x && current.y === b.y) {
        finish();

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
        if (map[box.y] && map[box.y][box.x] && map[box.y][box.x].box !== 'w') {
          if (
            !closed.some(
              (closedBox: Box) => closedBox.x === box.x && closedBox.y === box.y
            )
          ) {
            let currentGCost;

            if (current.parent) {
              if (diagonal(current.parent.x, current.parent.y, current)) {
                currentGCost = current.parent.gCost + 14;
              } else {
                currentGCost = current.parent.gCost + 10;
              }
            } else {
              currentGCost = 0;
            }

            let gCost;
            if (diagonal(box.x, box.y, current)) {
              gCost = currentGCost + 14;
            } else {
              gCost = currentGCost + 10;
            }

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

                newMap[existingOpenBox.y][existingOpenBox.x].gCost = gCost;
                newMap[existingOpenBox.y][existingOpenBox.x].hCost = hCost;
                newMap[existingOpenBox.y][existingOpenBox.x].fCost = fCost;
                newMap[existingOpenBox.y][existingOpenBox.x].direction =
                  direction(existingOpenBox, existingOpenBox.parent);
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
              newMap[box.y][box.x].gCost = gCost;
              newMap[box.y][box.x].hCost = hCost;
              newMap[box.y][box.x].fCost = fCost;
              newMap[box.y][box.x].direction = direction(box, current);
            }
          }
        }
      });
    }

    newMap = newMap.map((row: any, y: number) => {
      return row.map((box: any, x: number) => {
        let type = box.box;
        if (box.box === 'a' || box.box === 'b') return box;
        if (open.some((openBox: any) => openBox.x === x && openBox.y === y)) {
          type = 'o';
        }
        if (
          closed.some(
            (closedBox: any) => closedBox.x === x && closedBox.y === y
          )
        ) {
          type = 'c';
        }
        if (path.some((pathBox: any) => pathBox.x === x && pathBox.y === y)) {
          type = 'p';
        }

        return { ...box, box: type };
      });
    });

    if (!current) {
      finish();
    }

    return newMap;
  };
}

export function createAStar(
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
  let aStarState: any;
  let aStarInterval: any;

  const initializeAStar = () => {
    aStarState = AStar(map, finish);
  };

  const tick = () => {
    if (aStarState) {
      updateMap(aStarState());
    }
  };

  const pauseAStar = () => {
    clearInterval(aStarInterval);
  };

  return {
    initializeAStar,
    tick,
    pauseAStar,
  };
}
