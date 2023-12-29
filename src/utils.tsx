function diagonal(x: number, y: number, a: { x: number; y: number }) {
  // Calculate the horizontal and vertical distance between the two boxes
  const dx = Math.abs(a.x - x);
  const dy = Math.abs(a.y - y);

  // Check if the boxes are diagonal
  if (dx === 1 && dy === 1) {
    // Diagonal distance, add 14 to gCost
    return true;
  } else {
    // Not diagonal, add 10 to gCost
    return false;
  }
}

function direction(current: any, parent: any) {
  // y x
  // 0 0, 0 1, 0 2
  // 1 0, 1 1, 1 2
  // 2 0, 2 1, 2 2
  let result = [];

  if (current.y === parent.y + 1) {
    result.push('up');
  }
  if (current.y === parent.y - 1) {
    result.push('down');
  }
  if (current.x === parent.x + 1) {
    result.push('left');
  }
  if (current.x === parent.x - 1) {
    result.push('right');
  }

  return result.join('-');
}

const calculateHCost = (x: number, y: number, b: { x: number; y: number }) => {
  const vertical = Math.abs(b.y - y);

  const horizontal = Math.abs(b.x - x);

  return (
    Math.min(horizontal, vertical) * 14 + Math.abs(horizontal - vertical) * 10
  );
};

export { diagonal, direction, calculateHCost };
