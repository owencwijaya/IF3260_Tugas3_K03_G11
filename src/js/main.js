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

let obj = new Cube([0, 0, 0], [1, 1, 1]);
let obj2 = new Cube([0, 1.5, 0], [1, 1, 1]);
const imageUrl = "js/model/texture/pochita.jpg";
const imageUrl2 = "js/model/texture/amogus.jpg";
const texture = loadTexture(gl, imageUrl);
const texture2 = loadTexture(gl, imageUrl2);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

const render = (now) => {
  now *= 0.001;
  deltaTime = now - then;
  then = now;

  draw(gl, programInfo, obj, texture);
  draw(gl, programInfo, obj2, texture2);
  cubeRotation += deltaTime;

  requestAnimationFrame(render);
};

requestAnimationFrame(render);
