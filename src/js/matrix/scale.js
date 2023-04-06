const scaleMatrix = (obj, xValue, yValue, zValue) => {
  let xScale = 0;
  let yScale = 0;
  let zScale = 0;

  if (loaded) {
    xScale = Math.max(10, obj.config.scaling.x + (xValue - 1000));
    yScale = Math.max(10, obj.config.scaling.y + (yValue - 1000));
    zScale = Math.max(10, obj.config.scaling.z + (zValue - 1000));
  } else {
    xScale = xValue;
    yScale = yValue;
    zScale = zValue;
  }

  return new Float32Array([
    xScale / 1000,
    0,
    0,
    0,

    0,
    yScale / 1000,
    0,
    0,

    0,
    0,
    zScale / 1000,
    0,

    0,
    0,
    0,
    1,
  ]);
};

const scale = (modelViewMatrix, obj, xValue, yValue, zValue) => {
  modelViewMatrix = multiply(
    transpose(scaleMatrix(obj, xValue, yValue, zValue)),
    modelViewMatrix
  );

  return modelViewMatrix;
};
