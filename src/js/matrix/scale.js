const scaleMatrix = (obj) => {
  let xScale = 0;
  let yScale = 0;
  let zScale = 0;

  if (loaded) {
    xScale = Math.max(10, obj.config.scaling.x + (xScalingSlider.value - 1000));
    yScale = Math.max(10, obj.config.scaling.y + (yScalingSlider.value - 1000));
    zScale = Math.max(10, obj.config.scaling.z + (zScalingSlider.value - 1000));
  } else {
    xScale = xScalingSlider.value;
    yScale = yScalingSlider.value;
    zScale = zScalingSlider.value;
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

const scale = (modelViewMatrix, obj) => {
  modelViewMatrix = multiply(transpose(scaleMatrix(obj)), modelViewMatrix);

  return modelViewMatrix;
};
