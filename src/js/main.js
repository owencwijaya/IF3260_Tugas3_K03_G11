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
  },
};

let model = new Steve();
// let model = new Spider();
// let model = new Chicken();

let normalTexture = loadTexture(gl, "js/model/texture/bump/bump_normal.png");
let diffuseTexture = loadTexture(gl, "js/model/texture/bump/bump_diffuse.png");
let depthTexture = loadTexture(gl, "js/model/texture/bump/bump_depth.png");

gl.useProgram(programInfo.program);
gl.activeTexture(gl.TEXTURE1);
gl.bindTexture(gl.TEXTURE_2D, normalTexture);
gl.uniform1i(programInfo.uniformLocations.uNormalTex, 1);
gl.activeTexture(gl.TEXTURE2);
gl.bindTexture(gl.TEXTURE_2D, diffuseTexture);
gl.uniform1i(programInfo.uniformLocations.uDiffuseTex, 2);
gl.activeTexture(gl.TEXTURE3);
gl.bindTexture(gl.TEXTURE_2D, depthTexture);
gl.uniform1i(programInfo.uniformLocations.uDepthTex, 3);

normalTexture = loadTexture(
  componentGl,
  "js/model/texture/bump/bump_normal.png"
);
diffuseTexture = loadTexture(
  componentGl,
  "js/model/texture/bump/bump_diffuse.png"
);
depthTexture = loadTexture(componentGl, "js/model/texture/bump/bump_depth.png");

componentGl.useProgram(componentProgramInfo.program);
componentGl.activeTexture(componentGl.TEXTURE1);
componentGl.bindTexture(componentGl.TEXTURE_2D, normalTexture);
componentGl.uniform1i(componentProgramInfo.uniformLocations.uNormalTex, 1);
componentGl.activeTexture(componentGl.TEXTURE2);
componentGl.bindTexture(componentGl.TEXTURE_2D, diffuseTexture);
componentGl.uniform1i(componentProgramInfo.uniformLocations.uDiffuseTex, 2);
componentGl.activeTexture(componentGl.TEXTURE3);
componentGl.bindTexture(componentGl.TEXTURE_2D, depthTexture);
componentGl.uniform1i(componentProgramInfo.uniformLocations.uDepthTex, 3);

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
