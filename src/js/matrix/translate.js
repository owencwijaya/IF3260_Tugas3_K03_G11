const translateMatrix = (xValue, yValue, zValue) => {
  return new Float32Array([
    1,
    0,
    0,
    xValue,
    0,
    1,
    0,
    yValue,
    0,
    0,
    1,
    zValue,
    0,
    0,
    0,
    1,
  ]);
};

const translate = (modelViewMatrix, xValue, yValue, zValue) => {
  modelViewMatrix = multiply(
    transpose(translateMatrix(xValue, yValue, zValue)),
    modelViewMatrix
  );
  return modelViewMatrix;
};
