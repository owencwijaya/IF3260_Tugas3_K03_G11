class Chicken {
  constructor() {
    this.globalConfig = {
      translation: {
        x: 0,
        y: 0,
        z: 0,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      scale: {
        x: 1000,
        y: 1000,
        z: 1000,
      },
    };
    const body = new Cube(
      "Body", // name
      [0, 0, 0], // middle
      [0, 0, 0], // pivot
      [1, 0.75, 0.75], // length
      "js/model/texture/chicken/chicken-body.jpg" // texture path
    );

    const leftWing = new Cube(
      "Left Wing",
      [0, 0.05, 0.415],
      // [0, 0.65, 0.34],
      [0, 0.2, 0.45],
      [0.8, 0.6, 0.075],
      "js/model/texture/chicken/chicken-body.jpg"
    );

    const rightWing = new Cube(
      "Right Wing",
      [0, 0.05, -0.415],
      [0, 0.2, -0.45],
      [0.8, 0.6, 0.075],
      "js/model/texture/chicken/chicken-body.jpg"
    );

    const leftLeg = new Cube(
      "Left Leg",
      [0, -0.65, 0.175],
      [0, -0.05, 0.175],
      [0.1, 0.6, 0.15],
      "js/model/texture/chicken/chicken-legs.jpg"
    );

    const leftToe = new Cube(
      "Left Toe",
      [-0.1, -0.9, 0.175],
      [0, 0, 0],
      [0.2, 0.1, 0.25],
      "js/model/texture/chicken/chicken-legs.jpg"
    );

    const rightLeg = new Cube(
      "Right Leg",
      [0, -0.65, -0.175],
      [0, -0.05, -0.175],
      [0.1, 0.6, 0.15],
      "js/model/texture/chicken/chicken-legs.jpg"
    );

    const rightToe = new Cube(
      "Right Toe",
      [-0.1, -0.9, -0.175],
      [0, 0, 0],
      [0.2, 0.1, 0.25],
      "js/model/texture/chicken/chicken-legs.jpg"
    );

    const head = new Cube(
      "Head",
      [-0.5, 0.4, 0],
      [-0.5, 0.4, 0],
      [0.3, 0.65, 0.4],
      "js/model/texture/chicken/chicken-body.jpg"
    );

    const beakTop = new Cube(
      "Beak Top",
      [-0.7525, 0.4, 0],
      [0, 0, 0],
      [0.2, 0.1, 0.4],
      "js/model/texture/chicken/chicken-beak-top.jpg"
    );

    const beakBottom = new Cube(
      "Beak Bottom",
      [-0.7525, 0.3, 0],
      [0, 0, 0],
      [0.2, 0.1, 0.4],
      "js/model/texture/chicken/chicken-beak-bottom.jpg"
    );

    const wattles = new Cube(
      "Wattles",
      [-0.7, 0.2, 0],
      [0, 0, 0],
      [0.1, 0.25, 0.2],
      "js/model/texture/chicken/chicken-wattles.jpg"
    );

    const leftEye = new Cube(
      "Left Eye",
      [-0.65, 0.55, 0.125],
      [0, 0, 0],
      [0.01, 0.125, 0.125],
      "js/model/texture/chicken/chicken-eyes.jpg"
    );

    const rightEye = new Cube(
      "Right Eye",
      [-0.65, 0.55, -0.125],
      [0, 0, 0],
      [0.01, 0.125, 0.125],
      "js/model/texture/chicken/chicken-eyes.jpg"
    );

    this.cubeList = [
      body,
      leftWing,
      rightWing,
      leftLeg,
      leftToe,
      rightLeg,
      rightToe,
      head,
      beakTop,
      beakBottom,
      wattles,
      leftEye,
      rightEye,
    ];

    this.textureList = [];
    this.componentTextureList = [];
    this.names = [];
    this.movedMap = new Map();
    this.mainObject = "Body";

    this.createTextures();
    this.createComponentTextures();

    this.cubeList.forEach((obj) => {
      this.names.push(obj.name);
      this.movedMap.set(obj.name, false);
    });
    // prettier-ignore
    this.relationship = this.createRelationship();
    this.animation = this.createAnimation();
    this.name = "Chicken";
  }

  createTextures() {
    this.textureList = [];
    this.cubeList.forEach((obj) => {
      this.textureList.push(loadTexture(gl, obj.texturePath));
    });
  }

  createComponentTextures() {
    this.componentTextureList = [];
    this.cubeList.forEach((obj) => {
      this.componentTextureList.push(loadTexture(componentGl, obj.texturePath));
    });
  }

  createRelationship() {
    let relationships = new Map();
    relationships.set("Body", [
      "Head",
      "Left Wing",
      "Right Wing",
      "Left Leg",
      "Right Leg",
    ]);

    relationships.set("Head", [
      "Beak Top",
      "Beak Bottom",
      "Wattles",
      "Left Eye",
      "Right Eye",
    ]);

    relationships.set("Left Leg", ["Left Toe"]);
    relationships.set("Right Leg", ["Right Toe"]);

    return relationships;
  }

  getDepth(componentName) {
    let depth = 0;
    let currentComponent = componentName;
    while (currentComponent != this.mainObject) {
      currentComponent = this.findParent(currentComponent);
      depth++;
    }
    return depth;
  }

  createAnimation() {
    let animation = new Map();
    let body = [];
    let leftWing = [];
    let rightWing = [];
    let leftLeg = [];
    let rightLeg = [];
    let leftToe = [];
    let rightToe = [];
    let head = [];
    let beakTop = [];
    let beakBottom = [];
    let wattles = [];
    let leftEye = [];
    let rightEye = [];

    for (let i = -90; i <= 0; i += 15) {
      body.push(
        createConfig([0, 0.0005 * i, 0], [0, 45, 0], [1000, 1000, 1000])
      );
      leftWing.push(
        createConfig(
          [-0.0015 * i, 0.0005 * i, -0.0015 * i],
          [-i / 3, 0, 0],
          [1000, 1000, 1000]
        )
      );
      rightWing.push(
        createConfig(
          [-0.0015 * i, 0.0005 * i, -0.0015 * i],
          [i / 3, 0, 0],
          [1000, 1000, 1000]
        )
      );
      head.push(
        createConfig(
          [0.0005 * i, 0.0005 * i, 0.0005 * i],
          [(i + 45) / 12, 0, 0],
          [1000, 1000, 1000]
        )
      );
      beakTop.push(
        createConfig(
          [0.0005 * i, 0.0005 * i, 0.0005 * i],
          [(i + 45) / 12, 0, 0],
          [1000, 1000, 1000]
        )
      );
      beakBottom.push(
        createConfig(
          [0.0005 * i, 0.0005 * i, 0.0005 * i],
          [(i + 45) / 12, 0, 0],
          [1000, 1000, 1000]
        )
      );
      wattles.push(
        createConfig(
          [0.0005 * i, 0.0005 * i, 0.0005 * i],
          [(i + 45) / 12, 0, 0],
          [1000, 1000, 1000]
        )
      );
      leftEye.push(
        createConfig(
          [0.0005 * i, 0.0005 * i, 0.0005 * i],
          [(i + 45) / 12, 0, 0],
          [1000, 1000, 1000]
        )
      );
      rightEye.push(
        createConfig(
          [0.0005 * i, 0.0005 * i, 0.0005 * i],
          [(i + 45) / 12, 0, 0],
          [1000, 1000, 1000]
        )
      );
      leftLeg.push(
        createConfig(
          [0, 0.0005 * i, 0],
          [0, 0, (i + 30) / 2],
          [1000, 1000, 1000]
        )
      );
      rightLeg.push(
        createConfig(
          [0, 0.0005 * i, 0],
          [0, 0, -(i + 30) / 2],
          [1000, 1000, 1000]
        )
      );
      leftToe.push(
        createConfig(
          [0, 0.0005 * i, 0],
          [0, 0, (i + 30) / 2],
          [1000, 1000, 1000]
        )
      );
      rightToe.push(
        createConfig(
          [0, 0.0005 * i, 0],
          [0, 0, -(i + 30) / 2],
          [1000, 1000, 1000]
        )
      );
    }

    body.push(...body.slice().reverse());
    head.push(...head.slice().reverse());
    leftWing.push(...leftWing.slice().reverse());
    rightWing.push(...rightWing.slice().reverse());
    leftLeg.push(...leftLeg.slice().reverse());
    rightLeg.push(...rightLeg.slice().reverse());
    leftToe.push(...leftToe.slice().reverse());
    rightToe.push(...rightToe.slice().reverse());
    beakTop.push(...beakTop.slice().reverse());
    beakBottom.push(...beakBottom.slice().reverse());
    wattles.push(...wattles.slice().reverse());
    leftEye.push(...leftEye.slice().reverse());
    rightEye.push(...rightEye.slice().reverse());

    animation.set("Body", body);
    animation.set("Head", head);
    animation.set("Left Wing", leftWing);
    animation.set("Right Wing", rightWing);
    animation.set("Left Leg", leftLeg);
    animation.set("Right Leg", rightLeg);
    animation.set("Left Toe", leftToe);
    animation.set("Right Toe", rightToe);
    animation.set("Beak Top", beakTop);
    animation.set("Beak Bottom", beakBottom);
    animation.set("Wattles", wattles);
    animation.set("Left Eye", leftEye);
    animation.set("Right Eye", rightEye);
    return animation;
  }

  getObjectIdxFromName(cubeName) {
    for (let i = 0; i < this.cubeList.length; i++) {
      if (this.cubeList[i].name == cubeName) {
        return i;
      }
    }
  }

  findChildren(cubeName) {
    let children = new Array();

    for (let [key, value] of this.relationship.entries()) {
      if (key == cubeName || children.includes(key)) {
        children.push(value);
        children = children.flat();
      }
    }

    children = children.flat();

    let childrenObjects = new Array();
    for (let i = 0; i < children.length; i++) {
      childrenObjects.push(
        this.cubeList[this.getObjectIdxFromName(children[i])]
      );
    }

    return childrenObjects;
  }

  findParent(cubeName) {
    for (let [key, value] of this.relationship.entries()) {
      if (value.includes(cubeName)) {
        return key;
      }
    }
    return null;
  }
}
