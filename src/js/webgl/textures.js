// inisiasi tekstur dan load image, nanti image nya di-copy ke texture
const isPowerOf2 = (value) => {
  return (value & (value - 1)) === 0;
};

const loadTexture = (gl, url) => {
  // bikin texture terus bind ke gl context
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // nanti gambarnya di-download dulu, kalo udah ada pixel pertama, bakal masuk ke texture
  // seiring masuknya pixel lain, texture bakal di-update sampe semua pixel di-load

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);

  // sementara upload dulu 1 pixel biru  supaya bisa dipake dulu
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel
  );

  let image = new Image();
  image.src = url;
  image.addEventListener("load", () => {
    // bind texture, terus ubah texture jadi gambar
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      srcFormat,
      srcType,
      image
    );

    // kalo di webgl, ada kebutuhan khusus untuk dimensi gambar
    // kalo tinggi dan lebarnya kelipatan 2, kita bisa generate mipmap (biar aliasing lebih bagus)
    // kalo bukan, kita set wrapping to clamp to edge
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      );
    } else {
      // set parameter gl.TEXTURE_2D untuk wrap_s dan wrap_t (x dan y),
      // mau clamp to edge (bar ngga wrapping)
      // texture_min_filter ke linear (bisa nearest, bisa linear)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  });

  return texture;
};

const generateBumpTextures = (gl, programInfo) => {
  let normalTexture = loadTexture(gl, "js/model/texture/bump/bump_normal.png");
  let diffuseTexture = loadTexture(
    gl,
    "js/model/texture/bump/bump_diffuse.png"
  );
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
};

const generateReflectionTextures = (gl, programInfo) => {
  gl.useProgram(programInfo.program);
  gl.activeTexture(gl.TEXTURE0);
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

  const faceInfos = [
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      url: "js/model/texture/reflection/pos-x.jpg",
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      url: "js/model/texture/reflection/neg-x.jpg",
    },
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      url: "js/model/texture/reflection/pos-y.jpg",
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      url: "js/model/texture/reflection/neg-y.jpg",
    },
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      url: "js/model/texture/reflection/pos-z.jpg",
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
      url: "js/model/texture/reflection/neg-z.jpg",
    },
  ];

  faceInfos.forEach((faceInfo) => {
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 512;
    const height = 512;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;

    // prettier-ignore
    gl.texImage2D(faceInfo.target, level, internalFormat, width, height, 0, format, type, null);

    const image = new Image();
    image.src = faceInfo.url;
    image.addEventListener("load", function () {
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      gl.texImage2D(
        faceInfo.target,
        level,
        internalFormat,
        format,
        type,
        image
      );
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    });
  });

  gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
  gl.texParameteri(
    gl.TEXTURE_CUBE_MAP,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_LINEAR
  );

  gl.uniform1i(programInfo.uniformLocations.cubeTexture, 0);
};
