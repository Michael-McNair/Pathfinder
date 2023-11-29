const calculateGCost = (x: number, y: number, a: { x: number; y: number }) => {
  const vertical = Math.abs(a.y - y);

  const horizontal = Math.abs(a.x - x);

  return (
    Math.min(horizontal, vertical) * 14 + Math.abs(horizontal - vertical) * 10
  );
};

const calculateHCost = (x: number, y: number, b: { x: number; y: number }) => {
  const vertical = Math.abs(b.y - y);

  const horizontal = Math.abs(b.x - x);

  return (
    Math.min(horizontal, vertical) * 14 + Math.abs(horizontal - vertical) * 10
  );
};

export { calculateGCost, calculateHCost };
