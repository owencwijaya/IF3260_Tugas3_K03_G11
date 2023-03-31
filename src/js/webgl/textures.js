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

  const image = new Image();
  image.onload = () => {
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
  };

  image.src = url;

  return texture;
};
