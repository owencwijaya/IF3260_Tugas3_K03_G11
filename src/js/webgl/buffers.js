const initPositionBuffer = (gl, middle, length) => {
  const x_middle = middle[0];
  const y_middle = middle[1];
  const z_middle = middle[2];

  const x_length = length[0];
  const y_length = length[1];
  const z_length = length[2];

  const x_left = x_middle - x_length / 2;
  const x_right = x_middle + x_length / 2;
  const y_up = y_middle + y_length / 2;
  const y_down = y_middle - y_length / 2;
  const z_front = z_middle + z_length / 2;
  const z_back = z_middle - z_length / 2;

  // prettier-ignore
  const positions = [
    x_left, y_down, z_front, x_right, y_down, z_front, x_right, y_up, z_front, x_left, y_up, z_front, 
    x_left, y_down, z_back, x_right, y_down, z_back, x_right, y_up, z_back, x_left, y_up, z_back, 
    x_left, y_up, z_back, x_left, y_up, z_front, x_right, y_up, z_front, x_right, y_up, z_back, 
    x_left, y_down, z_back, x_left, y_down, z_front, x_right, y_down, z_front, x_right, y_down, z_back, 
    x_right, y_down, z_back, x_right, y_up, z_back, x_right, y_up, z_front, x_right, y_down, z_front, 
    x_left, y_down, z_back, x_left, y_up, z_back, x_left, y_up, z_front, x_left, y_down, z_front, 
    
];

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return positionBuffer;
};

const initTextureBuffer = (gl) => {
  const coords = [
    // depan
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // belakang
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // atas
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // bawah
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // kanan
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // kiri
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
  ];
  const textureBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);

  return textureBuffer;
};

const initIndexBuffer = (gl) => {
  // prettier-ignore
  const indices = [
    0, 1, 2, 0, 2, 3, // depan
    4, 5, 6, 4, 6, 7, // belakang
    8, 9, 10, 8, 10, 11, // atas
    12, 13, 14, 12, 14, 15, // bawah
    16, 17, 18, 16, 18, 19, // kanan
    20, 21, 22, 20, 22, 23, // kiri
  ];
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );
  return indexBuffer;
};

const initNormalBuffer = (gl) => {
  const normals = [
    // depan
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    // belakang
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
    // atas
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    // bawah
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
    // kanan
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    // kiri
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
  ];
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

  return normalBuffer;
};

const initTangentBuffer = (gl) => {
  const tangents = [
    // depan
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    // belakang
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    // atas
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    // bawah
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    // kanan
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    // kiri
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  ];
  const tangentBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tangentBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tangents), gl.STATIC_DRAW);

  return tangentBuffer;
};

const initBitangentBuffer = (gl) => {
  const bitangents = [
    // depan
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
    // belakang
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
    // atas
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // bawah
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    // kanan
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
    // kiri
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
  ];

  const bitangentBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bitangentBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bitangents), gl.STATIC_DRAW);

  return bitangentBuffer;
};

const initUVBuffer = (gl) => {
  const uvs = [
    // depan
    0, 1, 1, 0, 0, 0, 1, 1,
    // belakang
    1, 1, 0, 0, 1, 0, 0, 1,
    // atas
    0, 0, 1, 1, 0, 1, 1, 0,
    // bawah
    0, 1, 1, 0, 0, 0, 1, 1,
    // kanan
    1, 1, 0, 0, 0, 1, 1, 0,
    // kiri
    0, 1, 1, 0, 1, 1, 0, 0,
  ];
  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);

  return uvBuffer;
};
