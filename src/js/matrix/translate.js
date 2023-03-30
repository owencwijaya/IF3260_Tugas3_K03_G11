const translateMatrix = () => {
  const factor = projectionSelect.value == "perspective" ? -1 : 1;
  return new Float32Array([
    1,
    0,
    0,
    parseInt(xTranslateSlider.value) / 1000,
    0,
    1,
    0,
    parseInt(yTranslateSlider.value) / 1000,
    0,
    0,
    1,
    (factor * parseInt(zTranslateSlider.value)) / 1000,
    0,
    0,
    0,
    1,
  ]);
};

const translate = (modelViewMatrix) => {
  modelViewMatrix = multiply(transpose(translateMatrix()), modelViewMatrix);
  return modelViewMatrix;
};
