class Spider {
  constructor() {
    const obj1 = new Cube(
      "Body",
      [0, 0.4, 0],
      [0.7, 0.6, 0.7],
      "js/model/texture/pochita.jpg"
    );

    const obj2 = new Cube(
      "Neck",
      [0, 0.4, 0.5],
      [0.35, 0.35, 0.4],
      "js/model/texture/amogus.jpg"
    );

    const obj3 = new Cube(
      "Head",
      [0, 0.4, 0.8],
      [0.48, 0.48, 0.4],
      "js/model/texture/amogus.jpg"
    );

    const obj4 = new Cube(
      "Leg1",
      [0.21, 0.45, 0.38],
      [0.7, 0.1, 0.1],
      "js/model/texture/amogus.jpg",
      {
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 15, z: -25 },
        scale: { x: 1000, y: 1000, z: 1000 },
      }
    );
    const obj5 = new Cube(
      "Leg2",
      [0.26, 0.45, 0.45],
      [0.7, 0.1, 0.1],
      "js/model/texture/amogus.jpg",
      {
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 5, z: -25 },
        scale: { x: 1000, y: 1000, z: 1000 },
      }
    );
    const obj6 = new Cube(
      "Leg3",
      [0.35, 0.45, 0.53],
      [0.7, 0.1, 0.1],
      "js/model/texture/amogus.jpg",
      {
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: -5, z: -25 },
        scale: { x: 1000, y: 1000, z: 1000 },
      }
    );
    const obj7 = new Cube(
      "Leg4",
      [0.45, 0.45, 0.59],
      [0.7, 0.1, 0.1],
      "js/model/texture/amogus.jpg",
      {
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: -15, z: -25 },
        scale: { x: 1000, y: 1000, z: 1000 },
      }
    );
    const obj8 = new Cube(
      "Leg5",
      [-0.2, 0.45, 0.38],
      [0.7, 0.1, 0.1],
      "js/model/texture/amogus.jpg",
      {
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: -15, z: 25 },
        scale: { x: 1000, y: 1000, z: 1000 },
      }
    );
    const obj9 = new Cube(
      "Leg6",
      [-0.27, 0.45, 0.45],
      [0.7, 0.1, 0.1],
      "js/model/texture/amogus.jpg",
      {
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: -5, z: 25 },
        scale: { x: 1000, y: 1000, z: 1000 },
      }
    );
    const obj10 = new Cube(
      "Leg7",
      [-0.35, 0.45, 0.53],
      [0.7, 0.1, 0.1],
      "js/model/texture/amogus.jpg",
      {
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 5, z: 25 },
        scale: { x: 1000, y: 1000, z: 1000 },
      }
    );
    const obj11 = new Cube(
      "Leg8",
      [-0.46, 0.45, 0.59],
      [0.7, 0.1, 0.1],
      "js/model/texture/amogus.jpg",
      {
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 15, z: 25 },
        scale: { x: 1000, y: 1000, z: 1000 },
      }
    );

    this.cubeList = [
      obj1,
      obj2,
      obj3,
      obj4,
      obj5,
      obj6,
      obj7,
      obj8,
      obj9,
      obj10,
      obj11,
    ];
    this.textureList = [];
    this.componentTextureList = [];
    this.names = [];

    this.cubeList.forEach((obj) => {
      this.textureList.push(loadTexture(gl, obj.texturePath));
      this.componentTextureList.push(loadTexture(componentGl, obj.texturePath));
      this.names.push(obj.name);
    });
  }
}
