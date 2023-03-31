const translateMatrix = (obj) => {
  const factor = projectionSelect.value == "perspective" ? -1 : 1;
  return new Float32Array([
    1,
    0,
    0,
    (obj.config.translation.x + parseInt(xTranslateSlider.value)) / 1000,
    0,
    1,
    0,
    (obj.config.translation.y + parseInt(yTranslateSlider.value)) / 1000,
    0,
    0,
    1,
    (factor * (obj.config.translation.z + parseInt(zTranslateSlider.value))) /
      1000,
    0,
    0,
    0,
    1,
  ]);
};

const translate = (modelViewMatrix, obj) => {
  modelViewMatrix = multiply(transpose(translateMatrix(obj)), modelViewMatrix);
  return modelViewMatrix;
};
