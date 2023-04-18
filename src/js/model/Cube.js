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

    this.x_middle = middle[0];
    this.y_middle = middle[1];
    this.z_middle = middle[2];

    this.pivot = pivot;

    this.x_length = length[0];
    this.y_length = length[1];
    this.z_length = length[2];
    
    this.texturePath = texturePath;

    this.config = config;

    this.x_left = this.x_middle - this.x_length / 2;
    this.x_right = this.x_middle + this.x_length / 2;
    this.y_up = this.y_middle + this.y_length / 2;
    this.y_down = this.y_middle - this.y_length / 2;
    this.z_front = this.z_middle + this.z_length / 2;
    this.z_back = this.z_middle - this.z_length / 2;

    // prettier-ignore
    this.vertices = [
        this.x_left, this.y_down, this.z_front, this.x_right, this.y_down, this.z_front, this.x_right, this.y_up, this.z_front, this.x_left, this.y_up, this.z_front, 
        this.x_left, this.y_down, this.z_back, this.x_right, this.y_down, this.z_back, this.x_right, this.y_up, this.z_back, this.x_left, this.y_up, this.z_back, 
        this.x_left, this.y_up, this.z_back, this.x_left, this.y_up, this.z_front, this.x_right, this.y_up, this.z_front, this.x_right, this.y_up, this.z_back, 
        this.x_left, this.y_down, this.z_back, this.x_left, this.y_down, this.z_front, this.x_right, this.y_down, this.z_front, this.x_right, this.y_down, this.z_back, 
        this.x_right, this.y_down, this.z_back, this.x_right, this.y_up, this.z_back, this.x_right, this.y_up, this.z_front, this.x_right, this.y_down, this.z_front, 
        this.x_left, this.y_down, this.z_back, this.x_left, this.y_up, this.z_back, this.x_left, this.y_up, this.z_front, this.x_left, this.y_down, this.z_front, 
        
    ];

    // prettier-ignore
    this.indices = [
      0, 1, 2, 0, 2, 3, // depan
      4, 5, 6, 4, 6, 7, // belakang
      8, 9, 10, 8, 10, 11, // atas
      12, 13, 14, 12, 14, 15, // bawah
      16, 17, 18, 16, 18, 19, // kanan
      20, 21, 22, 20, 22, 23, // kiri
    ];

    this.textureCoordinates = [
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

    this.normalVertices = [
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

    this.tangent = [
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
    ]

    this.bitangent = [
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
    ]

    this.uv = [
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
      0, 1, 1, 0, 1, 1, 0, 0
    ]
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
