const scaleMatrix = () => {
  let xScale = 0;
  let yScale = 0;
  let zScale = 0;

  if (loaded) {
    xScale = Math.max(10, xScalingSlider.value - 1000);
    yScale = Math.max(10, yScalingSlider.value - 1000);
    zScale = Math.max(10, zScalingSlider.value - 1000);
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

const scale = (modelViewMatrix) => {
  modelViewMatrix = multiply(transpose(scaleMatrix()), modelViewMatrix);

  return modelViewMatrix;
};
