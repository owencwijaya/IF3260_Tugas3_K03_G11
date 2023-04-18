/**
 * @class Cube
 * @classdesc base cube biasa, dipake untuk ngebangun articulated model
 * @param {string} name nama dari kubus, PASTIKAN UNIK per objek
 * @param {number[]} middle titik tengah dari kubus
 * @param {number[]} pivot titik pivot dari kubus
 * @param {number[]} length ekspektasi panjang
 * @param {string} texturePath path dari gambar yang mau dijadiin texture
 * @param {*} config konfigurasi translasi / rotasi / scaling dari setiap kubus
 */

class Cube {
  //prettier-ignore
  constructor(
    name = "", middle = [0, 0, 0], pivot = [0, 0, 0], length = [1, 1, 1], texturePath = "",
    config = {
      translation: {x: 0, y: 0, z: 0},
      rotation: {x: 0, y: 0, z: 0},
      scale: {x: 1000, y: 1000, z: 1000},
    }
  ) {
    this.name = name;
    this.middle = middle;
    this.length = length;
    this.pivot = pivot;
    this.texturePath = texturePath;
    this.config = config;
  }
}

const createConfig = (translateArr, rotateArr, scaleArr) => {
  return {
    translation: {
      x: translateArr[0],
      y: translateArr[1],
      z: translateArr[2],
    },
    rotation: {
      x: rotateArr[0],
      y: rotateArr[1],
      z: rotateArr[2],
    },
    scale: {
      x: scaleArr[0],
      y: scaleArr[1],
      z: scaleArr[2],
    },
  };
};
