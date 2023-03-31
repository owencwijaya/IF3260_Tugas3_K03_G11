class Steve {
  constructor() {
    const obj = new Cube(
      "Body",
      [0, 0.4, 0],
      [0.4, 0.8, 0.2],
      "js/model/texture/pochita.jpg"
    );
    const obj2 = new Cube(
      "Head",
      [0, 1.0, 0],
      [0.4, 0.4, 0.4],
      "js/model/texture/amogus.jpg"
    );

    const obj3 = new Cube(
      "Right Arm",
      [0.3, 0.4, 0],
      [0.2, 0.8, 0.2],
      "js/model/texture/amogus.jpg"
    );

    const obj4 = new Cube(
      "Left Arm",
      [-0.3, 0.4, 0],
      [0.2, 0.8, 0.2],
      "js/model/texture/amogus.jpg"
    );

    const obj5 = new Cube(
      "Right Leg",
      [0.1, -0.4, 0],
      [0.2, 0.8, 0.2],
      "js/model/texture/amogus.jpg"
    );

    const obj6 = new Cube(
      "Left Leg",
      [-0.1, -0.4, 0],
      [0.2, 0.8, 0.2],
      "js/model/texture/amogus.jpg"
    );
    this.cubeList = [obj, obj2, obj3, obj4, obj5, obj6];
    this.textureList = [];
    this.names = [];

    this.cubeList.forEach((obj) => {
      this.textureList.push(loadTexture(gl, obj.texturePath));
      this.names.push(obj.name);
    });
  }
}
