class Chicken {
    constructor() {
      const obj = new Cube(
        "body", // name
        [0, 0, 0], // middle
        [1, 0.75, 0.75], // length
        "js/model/texture/chicken/chicken-body.jpg", // texture path
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      );

      const obj2 = new Cube(
        "left wing",
        [0, 0.05, 0.415],
        [0.8, 0.6, 0.075],
        "js/model/texture/chicken/chicken-body.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      );

      const obj3 = new Cube(
        "right wing",
        [0, 0.05, -0.415],
        [0.8, 0.6, 0.075],
        "js/model/texture/chicken/chicken-body.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      );

      const obj4 = new Cube(
        "left leg",
        [0, -0.65, 0.175],
        [0.1, 0.6, 0.15],
        "js/model/texture/chicken/chicken-legs.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      );

      const obj5 = new Cube(
        "right leg",
        [0, -0.65, -0.175],
        [0.1, 0.6, 0.15],
        "js/model/texture/chicken/chicken-legs.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      )

      const obj6 = new Cube(
        "left toe",
        [-0.1, -0.9, 0.175],
        [0.2, 0.1, 0.25],
        "js/model/texture/chicken/chicken-legs.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      )
      
      const obj7 = new Cube(
        "left toe",
        [-0.1, -0.9, -0.175],
        [0.2, 0.1, 0.25],
        "js/model/texture/chicken/chicken-legs.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      )

      const obj8 = new Cube(
        "head",
        [-0.5, 0.4, 0],
        [0.3, 0.65, 0.4],
        "js/model/texture/chicken/chicken-body.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      )

      const obj9 = new Cube(
        "beak top",
        [-0.7525, 0.4, 0],
        [0.2, 0.1, 0.4],
        "js/model/texture/chicken/chicken-beak-top.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      )

      const obj10 = new Cube(
        "beak top",
        [-0.7525, 0.3, 0],
        [0.2, 0.1, 0.4],
        "js/model/texture/chicken/chicken-beak-bottom.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      )

      const obj11 = new Cube(
        "wattles",
        [-0.7, 0.2, 0],
        [0.1, 0.25, 0.2],
        "js/model/texture/chicken/chicken-wattles.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      )

      const obj12 = new Cube(
        "left eye",
        [-0.65, 0.55, 0.125],
        [0.01, 0.125, 0.125],
        "js/model/texture/chicken/chicken-eyes.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      )

      const obj13 = new Cube(
        "left eye",
        [-0.65, 0.55, -0.125],
        [0.01, 0.125, 0.125],
        "js/model/texture/chicken/chicken-eyes.jpg",
        {
            translation: {x: 0, y: 0, z: 0},
            rotation: {x: 0, y: 45, z: 0},
            scale: {x: 1000, y: 1000, z: 1000},
        }
      )

      this.cubeList = [obj, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10, obj11, obj12, obj13];
      this.textureList = [];
      this.names = [];
  
      this.cubeList.forEach((obj) => {
        this.textureList.push(loadTexture(gl, obj.texturePath));
        this.names.push(obj.name);
      });
    }
  }
  