const scaleMatrix = (xValue, yValue, zValue) => {
  // let xScale = 0;
  // let yScale = 0;
  // let zScale = 0;

  // if (loaded) {
  //   xScale = Math.max(10, obj.config.scaling.x + (xValue - 1000));
  //   yScale = Math.max(10, obj.config.scaling.y + (yValue - 1000));
  //   zScale = Math.max(10, obj.config.scaling.z + (zValue - 1000));
  // } else {
  //   xScale = xValue;
  //   yScale = yValue;
  //   zScale = zValue;
  // }

  return new Float32Array([
    xValue / 1000,
    0,
    0,
    0,

    0,
    yValue / 1000,
    0,
    0,

    0,
    0,
    zValue / 1000,
    0,

    0,
    0,
    0,
    1,
  ]);
};

const scale = (modelViewMatrix, xValue, yValue, zValue) => {
  modelViewMatrix = multiply(
    transpose(scaleMatrix(xValue, yValue, zValue)),
    modelViewMatrix
  );

  return modelViewMatrix;
};

const scaleWithPivot = (modelViewMatrix, xValue, yValue, zValue, pivot) => {
  modelViewMatrix = translate(modelViewMatrix, pivot[0], pivot[1], pivot[2]);
  modelViewMatrix = multiply(
    transpose(scaleMatrix(xValue, yValue, zValue)),
    modelViewMatrix
  );
  modelViewMatrix = translate(modelViewMatrix, -pivot[0], -pivot[1], -pivot[2]);
  return modelViewMatrix;
};
