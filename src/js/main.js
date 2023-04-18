let cubeRotation = 0;
let deltaTime = 0;
let then = 0;

let loaded = false;

let globalConfig = {
  translation: {
    x: 0,
    y: 0,
    z: 0,
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
  scale: {
    x: 1000,
    y: 1000,
    z: 1000,
  },
};

const gl_canvas = document.getElementById("gl-canvas");
const component_canvas = document.getElementById("component-canvas");

const gl =
  gl_canvas.getContext("webgl") || gl_canvas.getContext("experimental-webgl");
const componentGl =
  component_canvas.getContext("webgl") ||
  component_canvas.getContext("experimental-webgl");

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.enable(gl.DEPTH_TEST);
gl.canvas.width = innerHeight;
gl.canvas.height = innerHeight;

componentGl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
componentGl.enable(gl.DEPTH_TEST);
componentGl.canvas.width = componentGl.canvas.height;

const shaderProgram = initShaders(gl);
const componentShaderProgram = initShaders(componentGl);

const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
    textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
    vertexTangent: gl.getAttribLocation(shaderProgram, "aVertexTangent"),
    vertexBitangent: gl.getAttribLocation(shaderProgram, "aVertexBitangent"),
    vertexUV: gl.getAttribLocation(shaderProgram, "aVertexUV"),
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
    modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
    uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
    ambientLight: gl.getUniformLocation(shaderProgram, "uAmbientLight"),
    directionalVector: gl.getUniformLocation(
      shaderProgram,
      "uDirectionalVector"
    ),
    type: gl.getUniformLocation(shaderProgram, "type"),
    uNormalTex: gl.getUniformLocation(shaderProgram, "uNormalTex"),
    uDiffuseTex: gl.getUniformLocation(shaderProgram, "uDiffuseTex"),
    uDepthTex: gl.getUniformLocation(shaderProgram, "uDepthTex"),
    worldMatrix: gl.getUniformLocation(shaderProgram, "uWorldMatrix"),
    cameraPosition: gl.getUniformLocation(shaderProgram, "uCameraPosition"),
    cubeTexture: gl.getUniformLocation(shaderProgram, "uCubeTexture"),
  },
};

const componentProgramInfo = {
  program: componentShaderProgram,
  attribLocations: {
    vertexPosition: componentGl.getAttribLocation(
      componentShaderProgram,
      "aVertexPosition"
    ),
    vertexNormal: componentGl.getAttribLocation(
      componentShaderProgram,
      "aVertexNormal"
    ),
    textureCoord: componentGl.getAttribLocation(
      componentShaderProgram,
      "aTextureCoord"
    ),
    vertexTangent: componentGl.getAttribLocation(
      componentShaderProgram,
      "aVertexTangent"
    ),
    vertexBitangent: componentGl.getAttribLocation(
      componentShaderProgram,
      "aVertexBitangent"
    ),
    vertexUV: componentGl.getAttribLocation(
      componentShaderProgram,
      "aVertexUV"
    ),
  },
  uniformLocations: {
    projectionMatrix: componentGl.getUniformLocation(
      componentShaderProgram,
      "uProjectionMatrix"
    ),
    modelViewMatrix: componentGl.getUniformLocation(
      componentShaderProgram,
      "uModelViewMatrix"
    ),
    normalMatrix: componentGl.getUniformLocation(
      componentShaderProgram,
      "uNormalMatrix"
    ),
    uSampler: componentGl.getUniformLocation(
      componentShaderProgram,
      "uSampler"
    ),
    uNormalTex: componentGl.getUniformLocation(
      componentShaderProgram,
      "uNormalTex"
    ),
    uDiffuseTex: componentGl.getUniformLocation(
      componentShaderProgram,
      "uDiffuseTex"
    ),
    uDepthTex: componentGl.getUniformLocation(
      componentShaderProgram,
      "uDepthTex"
    ),
    ambientLight: componentGl.getUniformLocation(
      componentShaderProgram,
      "uAmbientLight"
    ),
    directionalVector: componentGl.getUniformLocation(
      componentShaderProgram,
      "uDirectionalVector"
    ),
    type: componentGl.getUniformLocation(componentShaderProgram, "type"),
    worldMatrix: componentGl.getUniformLocation(
      componentShaderProgram,
      "uWorldMatrix"
    ),
    cameraPosition: componentGl.getUniformLocation(
      componentShaderProgram,
      "uCameraPosition"
    ),
    cubeTexture: componentGl.getUniformLocation(
      componentShaderProgram,
      "uCubeTexture"
    ),
  },
};

let model = new Steve();

generateBumpTextures(gl, programInfo);
generateBumpTextures(componentGl, componentProgramInfo);

generateReflectionTextures(gl, programInfo);
generateReflectionTextures(componentGl, componentProgramInfo);

resetComponentSelect(model);

gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
componentGl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

const render = (now) => {
  now *= 0.001;
  deltaTime = now - then;
  then = now;

  const parentIdx = model.getObjectIdxFromName(currentComponent);
  const parentObject = model.cubeList[parentIdx];

  // console.log(parentObject.name);
  // console.log(parentObject.config);

  draw(
    componentGl,
    componentProgramInfo,
    parentObject,
    model.componentTextureList[parentIdx],
    Draw.COMPONENT
  );
  let childrenObjs = model.findChildren(parentObject.name);
  childrenObjs.forEach((element) => {
    draw(
      componentGl,
      componentProgramInfo,
      element,
      model.componentTextureList[model.getObjectIdxFromName(element.name)],
      Draw.COMPONENT
    );
  });

  if (animationCheckbox.checked) {
    for (let i = 0; i < model.names.length; i++) {
      draw(
        gl,
        programInfo,
        model.cubeList[i],
        model.textureList[i],
        Draw.ANIMATION,
        parseInt(now * 10)
      );
    }
    requestAnimationFrame(render);
  } else {
    for (let i = 0; i < model.names.length; i++) {
      draw(
        gl,
        programInfo,
        model.cubeList[i],
        model.textureList[i],
        Draw.WHOLE
      );
    }
  }

  cubeRotation += deltaTime;
};

requestAnimationFrame(render);
