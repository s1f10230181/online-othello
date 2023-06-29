export type Methods = {
  post: {
    reqBody: { x: number; y: number };
    resBody: number[][];
  };
  get: {
    resBody: number[][];
  };
};
