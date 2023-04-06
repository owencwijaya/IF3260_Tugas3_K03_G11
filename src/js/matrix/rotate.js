const rotateXMatrix = (angle) => {
  return new Float32Array([
    1,
    0,
    0,
    0,
    0,
    Math.cos(angle),
    -Math.sin(angle),
    0,
    0,
    Math.sin(angle),
    Math.cos(angle),
    0,
    0,
    0,
    0,
    1,
  ]);
};

const rotateYMatrix = (angle) => {
  return new Float32Array([
    Math.cos(angle),
    0,
    Math.sin(angle),
    0,
    0,
    1,
    0,
    0,
    -Math.sin(angle),
    0,
    Math.cos(angle),
    0,
    0,
    0,
    0,
    1,
  ]);
};

const rotateZMatrix = (angle) => {
  return new Float32Array([
    Math.cos(angle),
    -Math.sin(angle),
    0,
    0,
    Math.sin(angle),
    Math.cos(angle),
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
  ]);
};

const rotateX = (modelViewMatrix, degs) => {
  modelViewMatrix = multiply(
    rotateXMatrix(degreesToRadians(degs)),
    modelViewMatrix
  );

  return modelViewMatrix;
};

const rotateY = (modelViewMatrix, degs) => {
  modelViewMatrix = multiply(
    rotateYMatrix(degreesToRadians(degs)),
    modelViewMatrix
  );

  return modelViewMatrix;
};

const rotateZ = (modelViewMatrix, degs) => {
  modelViewMatrix = multiply(
    rotateZMatrix(degreesToRadians(degs)),
    modelViewMatrix
  );

  return modelViewMatrix;
};

const rotate = (modelViewMatrix, rotateX, rotateY, rotateZ) => {
  const factor = projectionSelect.value == "perspective" ? -1 : 1;
  modelViewMatrix = multiply(
    rotateZMatrix(factor * degreesToRadians(rotateX)),
    modelViewMatrix
  );
  modelViewMatrix = multiply(
    rotateYMatrix(factor * degreesToRadians(rotateY)),
    modelViewMatrix
  );
  modelViewMatrix = multiply(
    rotateXMatrix(factor * degreesToRadians(rotateZ)),
    modelViewMatrix
  );

  return modelViewMatrix;
};

const rotateWithPivot = (modelViewMatrix, obj) => {
  // modelViewMatrix = translate(
  //   modelViewMatrix,
  //   -obj.pivot[0],
  //   -obj.pivot[1],
  //   -obj.pivot[2]
  // );

  modelViewMatrix = translate(
    modelViewMatrix,
    obj.pivot[0],
    obj.pivot[1],
    obj.pivot[2]
  );

  modelViewMatrix = rotate(modelViewMatrix, obj);

  modelViewMatrix = translate(
    modelViewMatrix,
    -obj.pivot[0],
    -obj.pivot[1],
    -obj.pivot[2]
  );
  return modelViewMatrix;
};

const autoRotate = (
  modelViewMatrix,
  cubeRotation,
  rotateXChecked,
  rotateYChecked,
  rotateZChecked
) => {
  if (rotateXChecked) {
    modelViewMatrix = rotateZ(modelViewMatrix, (cubeRotation * 180) / Math.PI);
  }
  if (rotateYChecked) {
    modelViewMatrix = rotateY(modelViewMatrix, (cubeRotation * 180) / Math.PI);
  }
  if (rotateZChecked) {
    modelViewMatrix = rotateX(modelViewMatrix, (cubeRotation * 180) / Math.PI);
  }

  return modelViewMatrix;
};

const autoRotateWithPivot = (modelViewMatrix, cubeRotation, obj) => {
  modelViewMatrix = translate(
    modelViewMatrix,
    obj.pivot[0],
    obj.pivot[1],
    obj.pivot[2]
  );

  modelViewMatrix = autoRotate(modelViewMatrix, cubeRotation);

  modelViewMatrix = translate(
    modelViewMatrix,
    -obj.pivot[0],
    -obj.pivot[1],
    -obj.pivot[2]
  );
  return modelViewMatrix;
};
