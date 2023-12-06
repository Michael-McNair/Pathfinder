export default interface Box {
  x: number;
  y: number;
  gCost: number;
  hCost: number;
  fCost: number;
  parent?: any;
}
