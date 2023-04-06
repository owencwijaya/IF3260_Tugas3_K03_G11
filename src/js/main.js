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
    ambientLight: componentGl.getUniformLocation(
      componentShaderProgram,
      "uAmbientLight"
    ),
    directionalVector: componentGl.getUniformLocation(
      componentShaderProgram,
      "uDirectionalVector"
    ),
  },
};
let obj = new Steve();
// let obj = new Spider();
// let obj = new Chicken();

resetComponentSelect(obj);

gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
componentGl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

const render = (now) => {
  now *= 0.001;
  deltaTime = now - then;
  then = now;

  for (let i = 0; i < obj.names.length; i++) {
    if (obj.cubeList[i].name == componentSelect.value) {
      draw(
        componentGl,
        componentProgramInfo,
        obj.cubeList[i],
        obj.componentTextureList[i],
        true
      );
      let childrenObjects = obj.findChildren(obj.cubeList[i].name);
      childrenObjects.forEach((element) => {
        draw(
          componentGl,
          componentProgramInfo,
          element,
          obj.componentTextureList[obj.getObjectIdxFromName(element.name)],
          true
        );
      });
    }
    draw(gl, programInfo, obj.cubeList[i], obj.textureList[i], false);
  }

  cubeRotation += deltaTime;

  // requestAnimationFrame(render);
};

requestAnimationFrame(render);
