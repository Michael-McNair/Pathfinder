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

const calculateHCost = (x: number, y: number, b: { x: number; y: number }) => {
  const vertical = Math.abs(b.y - y);

  const horizontal = Math.abs(b.x - x);

  return (
    Math.min(horizontal, vertical) * 14 + Math.abs(horizontal - vertical) * 10
  );
};

export { diagonal, calculateHCost };
