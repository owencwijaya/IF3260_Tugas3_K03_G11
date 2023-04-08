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

const Draw = {
  WHOLE: 0,
  COMPONENT: 1,
  ANIMATION: 2,
};

const draw = (gl, programInfo, obj, texture, drawMode, animationFrame = 0) => {
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
  let distance, horizontalAngle, verticalAngle;
  let shaderOn;

  if (drawMode == Draw.COMPONENT) {
    projection = componentProjectionSelect.value;
    angle = componentFovSlider.value;

    if (
      (obj.name == currentComponent ||
        model.findChildren(currentComponent).includes(obj)) &&
      currentComponent != model.mainObject
    ) {
      // if (currentComponent != model.mainObject) {
      obj.config.translation.x = parseInt(componentXTranslateSlider.value);
      obj.config.translation.y = parseInt(componentYTranslateSlider.value);
      obj.config.translation.z = parseInt(componentZTranslateSlider.value);
      obj.config.rotation.x = parseInt(componentXRotateSlider.value);
      obj.config.rotation.y = parseInt(componentYRotateSlider.value);
      obj.config.rotation.z = parseInt(componentZRotateSlider.value);
      obj.config.scale.x = parseFloat(componentXScaleSlider.value);
      obj.config.scale.y = parseFloat(componentYScaleSlider.value);
      obj.config.scale.z = parseFloat(componentZScaleSlider.value);
    }

    if (obj.name == model.mainObject && currentComponent == obj.name) {
      globalConfig.translation.x = parseInt(componentXTranslateSlider.value);
      globalConfig.translation.y = parseInt(componentYTranslateSlider.value);
      globalConfig.translation.z = parseInt(componentZTranslateSlider.value);
      globalConfig.rotation.x = parseInt(componentXRotateSlider.value);
      globalConfig.rotation.y = parseInt(componentYRotateSlider.value);
      globalConfig.rotation.z = parseInt(componentZRotateSlider.value);
      globalConfig.scale.x = parseFloat(componentXScaleSlider.value);
      globalConfig.scale.y = parseFloat(componentYScaleSlider.value);
      globalConfig.scale.z = parseFloat(componentZScaleSlider.value);
      console.log(globalConfig.translation.x);
    }

    translateX = (globalConfig.translation.x + obj.config.translation.x) / 1000;
    translateY = (globalConfig.translation.y + obj.config.translation.y) / 1000;
    translateZ = (globalConfig.translation.z + obj.config.translation.z) / 1000;
    console.log(obj.name, translateX, obj.config.translation.x);
    rotateX = obj.config.rotation.x;
    rotateY = obj.config.rotation.y;
    rotateZ = obj.config.rotation.z;

    scaleX = obj.config.scale.x;
    scaleY = obj.config.scale.y;
    scaleZ = obj.config.scale.z;

    distance =
      (parseInt(componentDistanceSlider.min) +
        parseInt(componentDistanceSlider.max) -
        componentDistanceSlider.value +
        2000) /
      1000;

    horizontalAngle =
      (parseInt(componentHorizontalSlider.value) * Math.PI) / 180;
    verticalAngle = (parseInt(componentVerticalSlider.value) * Math.PI) / 180;
    shaderOn = componentShaderCheckbox.checked;
  } else if (
    drawMode == Draw.WHOLE ||
    (drawMode == Draw.ANIMATION && !model.animation.has(obj.name))
  ) {
    projection = projectionSelect.value;
    angle = fovSlider.value;

    translateX =
      (globalConfig.translation.x +
        obj.config.translation.x +
        parseInt(xTranslateSlider.value)) /
      1000;

    translateY =
      (globalConfig.translation.y +
        obj.config.translation.y +
        parseInt(yTranslateSlider.value)) /
      1000;

    translateZ =
      (globalConfig.translation.z +
        obj.config.translation.z +
        parseInt(zTranslateSlider.value)) /
      1000;

    rotateX = obj.config.rotation.x + parseInt(xRotateSlider.value);
    rotateY = obj.config.rotation.y + parseInt(yRotateSlider.value);
    rotateZ = obj.config.rotation.z + parseInt(zRotateSlider.value);

    scaleX = obj.config.scale.x + parseFloat(xScaleSlider.value) - 1000;
    scaleY = obj.config.scale.y + parseFloat(yScaleSlider.value) - 1000;
    scaleZ = obj.config.scale.z + parseFloat(zScaleSlider.value) - 1000;

    distance =
      (parseInt(distanceSlider.min) +
        parseInt(distanceSlider.max) -
        distanceSlider.value) /
      1000;

    horizontalAngle = (parseInt(horizontalSlider.value) * Math.PI) / 180;
    verticalAngle = (parseInt(verticalSlider.value) * Math.PI) / 180;
    shaderOn = shaderCheckbox.checked;
  } else if (drawMode == Draw.ANIMATION) {
    projection = projectionSelect.value;
    angle = fovSlider.value;

    if (model.animation.has(obj.name)) {
      const frames = model.animation.get(obj.name);
      const frame = frames[animationFrame % frames.length];
      translateX = frame.translation.x;
      translateY = frame.translation.y;
      translateZ = frame.translation.z;
      rotateX = frame.rotation.x;
      rotateY = frame.rotation.y;
      rotateZ = frame.rotation.z;
      scaleX = frame.scale.x;
      scaleY = frame.scale.y;
      scaleZ = frame.scale.z;

      distance =
        (parseInt(distanceSlider.min) +
          parseInt(distanceSlider.max) -
          distanceSlider.value) /
        1000;

      horizontalAngle = (parseInt(horizontalSlider.value) * Math.PI) / 180;
      verticalAngle = (parseInt(verticalSlider.value) * Math.PI) / 180;
      shaderOn = shaderCheckbox.checked;
    }
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

  if (
    drawMode == Draw.COMPONENT &&
    (obj.name == currentComponent ||
      (currentComponent != model.mainObject &&
        model.relationship.get(currentComponent).includes(obj.name)))
  ) {
    modelViewMatrix = translate(
      modelViewMatrix,
      -obj.x_middle,
      0,
      -obj.z_middle
    );
  }

  modelViewMatrix = translate(
    modelViewMatrix,
    translateX,
    translateY,
    translateZ
  );

  let parentObject =
    model.cubeList[model.getObjectIdxFromName(currentComponent)];

  if (drawMode == Draw.ANIMATION) {
    const mainObjectName = model.mainObject;

    if (model.animation.has(obj.name)) {
      parentObject = model.cubeList[model.getObjectIdxFromName(obj.name)];
    }

    const parentName = model.findParent(obj.name);

    if (
      parentName != null &&
      parentName != mainObjectName &&
      model.animation.has(parentName)
    ) {
      parentObject = model.cubeList[model.getObjectIdxFromName(parentName)];
    }

    const parentFrames = model.animation.get(mainObjectName);
    const frame = parentFrames[animationFrame % parentFrames.length];
    if (obj.name != mainObjectName) {
      modelViewMatrix = rotate(
        modelViewMatrix,
        frame.rotation.x,
        frame.rotation.y,
        frame.rotation.z
      );
    }
  }

  modelViewMatrix = rotateWithPivot(
    modelViewMatrix,
    rotateX,
    rotateY,
    rotateZ,
    parentObject.pivot
  );

  if (currentComponent == model.mainObject || drawMode == Draw.WHOLE) {
    modelViewMatrix = scale(modelViewMatrix, obj, scaleX, scaleY, scaleZ);
  } else {
    modelViewMatrix = scaleWithPivot(
      modelViewMatrix,
      obj,
      scaleX,
      scaleY,
      scaleZ
    );
  }

  let normalMatrix = invert(modelViewMatrix);
  normalMatrix = transpose(normalMatrix);

  // set indices buffer dan position / texture attribute
  const indexBuffer = initIndexBuffer(gl, obj.indices);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  setPositionAttribute(gl, programInfo, obj.vertices);
  setTextureAttribute(gl, programInfo, obj.textureCoordinates);

  gl.useProgram(programInfo.program);

  let dirVec = [
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
