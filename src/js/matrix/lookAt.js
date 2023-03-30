const lookAt = (eye, at, up) => {
  const zAxis = normalize(subtractVectors(eye, at));
  const xAxis = normalize(cross(up, zAxis));
  const yAxis = cross(zAxis, xAxis);

  const matrix = new Float32Array([
    xAxis[0],
    xAxis[1],
    xAxis[2],
    0,
    yAxis[0],
    yAxis[1],
    yAxis[2],
    0,
    zAxis[0],
    zAxis[1],
    zAxis[2],
    0,
    -dot(xAxis, eye),
    -dot(yAxis, eye),
    -dot(zAxis, eye),
    1,
  ]);

  return matrix;
};

const getLookAt = () => {
  const factor = projectionSelect.value == "perspective" ? -1 : 1;
  const distance =
    (factor *
      (parseInt(distanceSlider.min) +
        parseInt(distanceSlider.max) -
        distanceSlider.value)) /
    1000;

  const horizontalAngle = (parseInt(horizontalSlider.value) * Math.PI) / 180;
  const verticalAngle = (parseInt(verticalSlider.value) * Math.PI) / 180;

  const eye = [
    factor * Math.sin(horizontalAngle) * Math.sin(verticalAngle) * distance,
    Math.cos(verticalAngle) * distance,
    Math.cos(horizontalAngle) * Math.sin(verticalAngle) * distance,
  ];

  const at = [0, 0, factor];

  return lookAt(eye, at, [0, 1, 0]);
};
