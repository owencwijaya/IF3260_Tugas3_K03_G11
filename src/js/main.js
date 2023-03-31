let cubeRotation = 0;
let deltaTime = 0;
let then = 0;

let loaded = false;

const gl_canvas = document.getElementById("gl-canvas");

const gl =
  gl_canvas.getContext("webgl") || gl_canvas.getContext("experimental-webgl");

gl.canvas.width = innerHeight;
gl.canvas.height = innerHeight;

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.enable(gl.DEPTH_TEST);

const shaderProgram = initShaders(gl);

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

let obj = new Steve();

resetComponentSelect(obj);

gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

const render = (now) => {
  now *= 0.001;
  deltaTime = now - then;
  then = now;

  for (let i = 0; i < obj.names.length; i++) {
    draw(gl, programInfo, obj.cubeList[i], obj.textureList[i]);
  }

  cubeRotation += deltaTime;

  requestAnimationFrame(render);
};

requestAnimationFrame(render);
