class Steve {
  constructor() {
    const obj = new Cube(
      "pochita",
      [0, -0.2, 0],
      [1, 1.8, 0.6],
      "js/model/texture/pochita.jpg"
    );
    const obj2 = new Cube(
      "among us",
      [0, 1.2, 0],
      [1, 1, 1],
      "js/model/texture/amogus.jpg"
    );
    this.cubeList = [obj, obj2];
    this.textureList = [];
    this.names = [];

    this.cubeList.forEach((obj) => {
      this.textureList.push(loadTexture(gl, obj.texturePath));
      this.names.push(obj.name);
    });
  }
}
