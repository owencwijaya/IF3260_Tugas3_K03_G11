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
const draw = (gl, programInfo, obj, texture) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // set warna background
  gl.clearDepth(1.0); //clear everything
  gl.enable(gl.DEPTH_TEST); // enable depth testing
  gl.depthFunc(gl.LEQUAL); // barang" yang dekat akan menutupi barang" yang jauh

  gl.canvas.width = innerHeight;
  gl.canvas.height = innerHeight;

  let modelViewMatrix = null;
  let projectionMatrix = null;
  let lookAtMatrix = null;

  // setup variabel untuk projection
  const angle = fovSlider.value;
  const fov = (angle * Math.PI) / 180;
  const zNear = 0.1;
  const zFar = 10;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

  // dapatkan lokasi projection dan modelview (dari shader)
  const projectionMatrixLoc = programInfo.uniformLocations.projectionMatrix;
  const modelViewMatrixLoc = programInfo.uniformLocations.modelViewMatrix;
  const normalMatrixLoc = programInfo.uniformLocations.normalMatrix;

  // inisialisasi model view matrix
  lookAtMatrix = getLookAt();
  modelViewMatrix = lookAtMatrix;

  // setup projection matrix
  if (projectionSelect.value == "perspective") {
    projectionMatrix = transpose(perspective(fov, aspect, 0.1, 100.0));
  } else if (projectionSelect.value == "oblique") {
    const orthoMatrix = ortho(-2.0, 2.0, -2.0, 2.0, zNear, zFar);
    const obliqueMatrix = oblique(-angle, -angle);
    projectionMatrix = transpose(multiply(obliqueMatrix, orthoMatrix));
  } else {
    projectionMatrix = transpose(ortho(-2.0, 2.0, -2.0, 2.0, zNear, zFar));
  }

  // transformasi apabila:
  // 1. yang dipilih = "all"
  // 2. object yang lagi di-render namanya sama dengan yang mau ditransform

  if (componentSelect.value == "all" || obj.name == componentSelect.value) {
    // transformasi untuk model view matrix
    modelViewMatrix = translate(
      modelViewMatrix,
      (obj.config.translation.x + parseInt(xTranslateSlider.value)) / 1000,
      (obj.config.translation.y + parseInt(yTranslateSlider.value)) / 1000,
      (obj.config.translation.z + parseInt(zTranslateSlider.value)) / 1000
    );

    if (componentSelect.value == "all") {
      if (
        rotationAnimationCheckbox.checked ||
        xRotateCheckbox.checked ||
        yRotateCheckbox.checked ||
        zRotateCheckbox.checked
      ) {
        modelViewMatrix = autoRotate(modelViewMatrix, cubeRotation);
      } else {
        modelViewMatrix = rotate(modelViewMatrix, obj);
      }
    } else if (obj.name == componentSelect.value) {
      if (
        rotationAnimationCheckbox.checked ||
        xRotateCheckbox.checked ||
        yRotateCheckbox.checked ||
        zRotateCheckbox.checked
      ) {
        modelViewMatrix = autoRotateWithPivot(
          modelViewMatrix,
          cubeRotation,
          obj
        );
      } else {
        modelViewMatrix = rotateWithPivot(modelViewMatrix, obj);
      }
    }

    modelViewMatrix = scale(modelViewMatrix, obj);
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
  if (shaderCheckbox.checked) {
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
