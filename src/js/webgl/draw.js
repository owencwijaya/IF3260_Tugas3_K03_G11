let normalized = false; // gaperlu dinormalisasi
let stride = 0; // berapa banyak byte dari 1 set of values, kalo 0 berarti ngikutin numComponents dan Type
let offset = 0; // offset untuk buffer

const setPositionAttribute = (gl, programInfo, vertices) => {
  const numComponents = 3; // keluarin 3 value per iterasi
  const type = gl.FLOAT;

  const positionBuffer = initPositionBuffer(gl, vertices);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalized,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
};

const setNormalAttribute = (gl, programInfo, normals) => {
  const numComponents = 3;
  const type = gl.FLOAT;

  const normalBuffer = initNormalBuffer(gl, normals);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexNormal,
    numComponents,
    type,
    normalized,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
};

const setTextureAttribute = (gl, programInfo, textures) => {
  const numComponents = 2;
  const type = gl.FLOAT;

  const textureBuffer = initTextureBuffer(gl, textures);
  gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);

  gl.vertexAttribPointer(
    programInfo.attribLocations.textureCoord,
    numComponents,
    type,
    normalized,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
};

/**
 *
 * @param {*} gl context gl
 * @param {*} obj objek yang mau di-render
 * @param {*} texture gambar texture
 */
const draw = (gl, programInfo, obj, texture, drawComponent) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // set warna background
  gl.clearDepth(1.0); //clear everything
  gl.enable(gl.DEPTH_TEST); // enable depth testing
  gl.depthFunc(gl.LEQUAL); // barang" yang dekat akan menutupi barang" yang jauh

  gl.canvas.width = innerHeight;
  gl.canvas.height = innerHeight;

  let projection;
  let angle;
  let translateX, translateY, translateZ;
  let rotateX, rotateY, rotateZ;
  let scaleX, scaleY, scaleZ;
  let rotateXChecked, rotateYChecked, rotateZChecked;
  let distance, horizontalAngle, verticalAngle;
  let shaderOn;

  if (drawComponent) {
    projection = componentProjectionSelect.value;
    angle = componentFovSlider.value;

    translateX =
      (obj.config.translation.x + parseInt(componentXTranslateSlider.value)) /
      1000;
    translateY =
      (obj.config.translation.y + parseInt(componentYTranslateSlider.value)) /
      1000;
    translateZ =
      (obj.config.translation.z + parseInt(componentZTranslateSlider.value)) /
      1000;

    rotateX = obj.config.translation.x + parseInt(componentXRotateSlider.value);
    rotateY = obj.config.translation.y + parseInt(componentYRotateSlider.value);
    rotateZ = obj.config.translation.z + parseInt(componentZRotateSlider.value);

    rotateXChecked = componentXRotateCheckbox.checked;
    rotateYChecked = componentYRotateCheckbox.checked;
    rotateZChecked = componentZRotateCheckbox.checked;

    scaleX = componentXScalingSlider.value;
    scaleY = componentYScalingSlider.value;
    scaleZ = componentZScalingSlider.value;

    distance =
      (parseInt(componentDistanceSlider.min) +
        parseInt(componentDistanceSlider.max) -
        componentDistanceSlider.value) /
      1000;

    horizontalAngle =
      (parseInt(componentHorizontalSlider.value) * Math.PI) / 180;
    verticalAngle = (parseInt(componentVerticalSlider.value) * Math.PI) / 180;
    shaderOn = componentShaderCheckbox.checked;
  } else {
    projection = projectionSelect.value;
    angle = fovSlider.value;

    translateX =
      (obj.config.translation.x + parseInt(xTranslateSlider.value)) / 1000;
    translateY =
      (obj.config.translation.y + parseInt(yTranslateSlider.value)) / 1000;
    translateZ =
      (obj.config.translation.z + parseInt(zTranslateSlider.value)) / 1000;

    rotateX = obj.config.translation.x + parseInt(xRotateSlider.value);
    rotateY = obj.config.translation.y + parseInt(yRotateSlider.value);
    rotateZ = obj.config.translation.z + parseInt(zRotateSlider.value);

    rotateXChecked = xRotateCheckbox.checked;
    rotateYChecked = yRotateCheckbox.checked;
    rotateZChecked = zRotateCheckbox.checked;

    scaleX = xScalingSlider.value;
    scaleY = yScalingSlider.value;
    scaleZ = zScalingSlider.value;

    distance =
      (parseInt(distanceSlider.min) +
        parseInt(distanceSlider.max) -
        distanceSlider.value) /
      1000;

    horizontalAngle = (parseInt(horizontalSlider.value) * Math.PI) / 180;
    verticalAngle = (parseInt(verticalSlider.value) * Math.PI) / 180;
    shaderOn = shaderCheckbox.checked;
  }

  let modelViewMatrix = null;
  let projectionMatrix = null;
  let lookAtMatrix = null;

  // setup variabel untuk projection
  const fov = (angle * Math.PI) / 180;
  const zNear = 0.1;
  const zFar = 10;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

  // dapatkan lokasi projection dan modelview (dari shader)
  const projectionMatrixLoc = programInfo.uniformLocations.projectionMatrix;
  const modelViewMatrixLoc = programInfo.uniformLocations.modelViewMatrix;
  const normalMatrixLoc = programInfo.uniformLocations.normalMatrix;

  const factor = projection == "perspective" ? -1 : 1;

  const eye = [
    Math.sin(horizontalAngle) * Math.sin(verticalAngle) * distance,
    Math.cos(verticalAngle) * distance,
    Math.cos(horizontalAngle) * Math.sin(verticalAngle) * distance * factor,
  ];

  const at = [0, 0, factor];

  // inisialisasi model view matrix
  lookAtMatrix = lookAt(eye, at, [0, 1, 0]);
  modelViewMatrix = lookAtMatrix;

  // setup projection matrix
  if (projection == "perspective") {
    projectionMatrix = transpose(perspective(fov, aspect, 0.1, 100.0));
  } else if (projection == "oblique") {
    const orthoMatrix = ortho(-2.0, 2.0, -2.0, 2.0, zNear, zFar);
    const obliqueMatrix = oblique(-angle, -angle);
    projectionMatrix = transpose(multiply(obliqueMatrix, orthoMatrix));
  } else {
    projectionMatrix = transpose(ortho(-2.0, 2.0, -2.0, 2.0, zNear, zFar));
  }

  modelViewMatrix = translate(
    modelViewMatrix,
    translateX,
    translateY,
    translateZ
  );

  // transformasi untuk model view matrix
  if (rotateXChecked || rotateYChecked || rotateZChecked) {
    modelViewMatrix = autoRotate(
      modelViewMatrix,
      cubeRotation,
      rotateXChecked,
      rotateYChecked,
      rotateZChecked
    );
  } else {
    modelViewMatrix = rotate(modelViewMatrix, rotateX, rotateY, rotateZ);
  }

  modelViewMatrix = scale(modelViewMatrix, obj, scaleX, scaleY, scaleZ);

  let normalMatrix = invert(modelViewMatrix);
  normalMatrix = transpose(normalMatrix);

  // set indices buffer dan position / texture attribute
  const indexBuffer = initIndexBuffer(gl, obj.indices);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  setPositionAttribute(gl, programInfo, obj.vertices);
  setTextureAttribute(gl, programInfo, obj.textureCoordinates);

  gl.useProgram(programInfo.program);

  let dirVec = [
    // projectionSelect.value == "perspective" ? 0.3 : -0.3,
    0.3,
    0.4,
    projectionSelect.value == "perspective" ? 0.4 : -0.4,
    1,
  ];
  dirVec = multiplyMatVec(invert(lookAtMatrix), dirVec);
  gl.uniform3fv(
    programInfo.uniformLocations.directionalVector,
    dirVec.slice(0, 3)
  );

  // enable / disable normal attribute
  if (shaderOn) {
    setNormalAttribute(gl, programInfo, obj.normalVertices);
    gl.uniform3fv(programInfo.uniformLocations.ambientLight, [0.4, 0.4, 0.4]);
  } else {
    gl.disableVertexAttribArray(programInfo.attribLocations.vertexNormal);
    gl.uniform3fv(programInfo.uniformLocations.ambientLight, [1.0, 1.0, 1.0]);
  }

  gl.uniformMatrix4fv(projectionMatrixLoc, gl.FALSE, projectionMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, gl.FALSE, modelViewMatrix);
  gl.uniformMatrix4fv(normalMatrixLoc, gl.FALSE, normalMatrix);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // minta map si texture
  gl.activeTexture(gl.TEXTURE0);

  // bind texture ke texture baru
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // kasitau shader kita ada bind texture
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
    const vertexCount = obj.indices.length;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
};
