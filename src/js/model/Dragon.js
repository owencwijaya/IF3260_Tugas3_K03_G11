class Dragon {
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
      "Body",
      [0, 0, 0.6],
      [0, 0, 0],
      [0.6, 0.6, 1.2],
      "js/model/texture/dragon/dragon_color.png"
    );

    const neck = new Cube(
      "Neck",
      [0, 0, -0.2],
      [0, 0, -0.2],
      [0.2, 0.2, 0.4],
      "js/model/texture/dragon/dragon_skin.png"
    );

    const head = new Cube(
      "Head",
      [0, 0, -0.6],
      [0, 0, -0.2],
      [0.4, 0.4, 0.4],
      "js/model/texture/dragon/dragon_head.png"
    );

    const frontTail = new Cube(
      "Front Tail",
      [0, 0.15, 1.35],
      [0, 0.15, 1.35],
      [0.3, 0.3, 0.3],
      "js/model/texture/dragon/dragon_skin.png"
    );

    const backTail = new Cube(
      "Back Tail",
      [0, 0.2, 1.95],
      [0, 0.2, 1.35],
      [0.2, 0.2, 1.2],
      "js/model/texture/dragon/dragon_color.png"
    );

    const topBeak = new Cube(
      "Top Beak",
      [0, -0.05, -0.95],
      [0, -0.05, -0.2],
      [0.3, 0.1, 0.3],
      "js/model/texture/dragon/dragon_color.png"
    );

    const bottomBeak = new Cube(
      "Bottom Beak",
      [0, -0.15, -0.95],
      [0, -0.15, -0.2],
      [0.3, 0.1, 0.3],
      "js/model/texture/dragon/dragon_color.png"
    );

    const leftInnerWing = new Cube(
      "Left Inner Wing",
      [0.4, 0.15, 0.4],
      [0.4, 0.15, 0.4],
      [0.2, 0.1, 0.4],
      "js/model/texture/dragon/dragon_skin.png"
    );

    const leftOuterWing = new Cube(
      "Left Outer Wing",
      [0.75, 0.15, 0.8],
      [0.4, 0.15, 0.4],
      [0.5, 0.1, 1.4],
      "js/model/texture/dragon/dragon_color.png"
    );

    const rightInnerWing = new Cube(
      "Right Inner Wing",
      [-0.4, 0.15, 0.4],
      [-0.4, 0.15, 0.4],
      [-0.2, 0.1, 0.4],
      "js/model/texture/dragon/dragon_skin.png"
    );

    const rightOuterWing = new Cube(
      "Right Outer Wing",
      [-0.75, 0.15, 0.8],
      [-0.4, 0.15, 0.4],
      [-0.5, 0.1, 1.4],
      "js/model/texture/dragon/dragon_color.png"
    );

    const rightFrontUpperLeg = new Cube(
      "Right Front Upper Leg",
      [-0.3, -0.3, 0.1],
      [-0.3, -0.3, 0.1],
      [-0.15, 0.15, 0.15],
      "js/model/texture/dragon/dragon_skin.png"
    );

    const rightFrontLowerLeg = new Cube(
      "Right Front Lower Leg",
      [-0.3, -0.525, 0.1],
      [-0.3, -0.3, 0.1],
      [-0.15, 0.3, 0.15],
      "js/model/texture/dragon/dragon_color.png"
    );

    const leftFrontUpperLeg = new Cube(
      "Left Front Upper Leg",
      [0.3, -0.3, 0.1],
      [0.3, -0.3, 0.1],
      [0.15, 0.15, 0.15],
      "js/model/texture/dragon/dragon_skin.png"
    );

    const leftFrontLowerLeg = new Cube(
      "Left Front Lower Leg",
      [0.3, -0.525, 0.1],
      [0.3, -0.3, 0.1],
      [0.15, 0.3, 0.15],
      "js/model/texture/dragon/dragon_color.png"
    );

    const rightBackUpperLeg = new Cube(
      "Right Back Upper Leg",
      [-0.3, -0.3, 1.1],
      [-0.3, -0.3, 1.1],
      [-0.25, 0.25, 0.25],
      "js/model/texture/dragon/dragon_skin.png"
    );

    const rightBackLowerLeg = new Cube(
      "Right Back Lower Leg",
      [-0.3, -0.575, 1.1],
      [-0.3, -0.3, 1.1],
      [-0.15, 0.3, 0.15],
      "js/model/texture/dragon/dragon_color.png"
    );

    const leftBackUpperLeg = new Cube(
      "Left Back Upper Leg",
      [0.3, -0.3, 1.1],
      [0.3, -0.3, 1.1],
      [0.25, 0.25, 0.25],
      "js/model/texture/dragon/dragon_skin.png"
    );

    const leftBackLowerLeg = new Cube(
      "Left Back Lower Leg",
      [0.3, -0.575, 1.1],
      [0.3, -0.3, 1.1],
      [0.15, 0.3, 0.15],
      "js/model/texture/dragon/dragon_color.png"
    );

    this.cubeList = [
      body,
      neck,
      head,
      topBeak,
      bottomBeak,
      rightInnerWing,
      rightOuterWing,
      leftInnerWing,
      leftOuterWing,
      frontTail,
      backTail,
      rightFrontUpperLeg,
      rightFrontLowerLeg,
      leftFrontUpperLeg,
      leftFrontLowerLeg,
      rightBackUpperLeg,
      rightBackLowerLeg,
      leftBackUpperLeg,
      leftBackLowerLeg,
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
    this.name = "Dragon";
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
      "Neck",
      "Front Tail",
      "Right Inner Wing",
      "Left Inner Wing",
      "Right Front Upper Leg",
      "Left Front Upper Leg",
      "Right Back Upper Leg",
      "Left Back Upper Leg",
    ]);
    relationships.set("Neck", ["Head"]);
    relationships.set("Head", ["Top Beak", "Bottom Beak"]);
    relationships.set("Front Tail", ["Back Tail"]);
    relationships.set("Right Inner Wing", ["Right Outer Wing"]);
    relationships.set("Left Inner Wing", ["Left Outer Wing"]);
    relationships.set("Right Front Upper Leg", ["Right Front Lower Leg"]);
    relationships.set("Left Front Upper Leg", ["Left Front Lower Leg"]);
    relationships.set("Right Back Upper Leg", ["Right Back Lower Leg"]);
    relationships.set("Left Back Upper Leg", ["Left Back Lower Leg"]);

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
    let head = [];
    let topBeak = [];
    let bottomBeak = [];
    let leg = [];
    let tail = [];
    let rightInnerWing = [];
    let rightOuterWing = [];
    let leftInnerWing = [];
    let leftOuterWing = [];

    for (let i = -30; i <= 60; i += 10) {
      body.push(createConfig([0, 0, 0], [i / 2, -i / 6, 0], [1000, 1000, 1000]));
      head.push(createConfig([0, 0, 0], [0, i / 3, 0], [1000, 1000, 1000]));
      topBeak.push(createConfig([0, 0, 0], [0, i / 3, 0], [1000, 1000, 1000]));
      bottomBeak.push(createConfig([0, 0, 0], [-i / 9, i / 3, 0], [1000, 1000, 1000]));
      leg.push(createConfig([0, 0, 0], [i * 5 / 6, -i / 6, 0], [1000, 1000, 1000]));
      tail.push(createConfig([0, 0, 0], [i * 2 / 3, -i / 6, 0], [1000, 1000, 1000]));
      rightInnerWing.push(createConfig([0, 0, 0], [0, i / 6, i / 9], [1000, 1000, 1000]));
      rightOuterWing.push(createConfig([0, 0, 0], [0, i / 3, i / 3], [1000, 1000, 1000]));
      leftInnerWing.push(createConfig([0, 0, 0], [0, -i / 6, -i / 9], [1000, 1000, 1000]));
      leftOuterWing.push(createConfig([0, 0, 0], [0, -i / 3, -i / 3], [1000, 1000, 1000]));
    }

    body.push(...body.slice().reverse());
    head.push(...head.slice().reverse());
    topBeak.push(...topBeak.slice().reverse());
    bottomBeak.push(...bottomBeak.slice().reverse());
    leg.push(...leg.slice().reverse());
    tail.push(...tail.slice().reverse());
    rightInnerWing.push(...rightInnerWing.slice().reverse());
    rightOuterWing.push(...rightOuterWing.slice().reverse());
    leftInnerWing.push(...leftInnerWing.slice().reverse());
    leftOuterWing.push(...leftOuterWing.slice().reverse());

    animation.set("Body", body);
    animation.set("Head", head);
    animation.set("Top Beak", topBeak);
    animation.set("Bottom Beak", bottomBeak);
    animation.set("Right Front Lower Leg", leg);
    animation.set("Right Back Lower Leg", leg);
    animation.set("Left Front Lower Leg", leg);
    animation.set("Left Back Lower Leg", leg);
    animation.set("Back Tail", tail);
    animation.set("Right Inner Wing", rightInnerWing);
    animation.set("Left Inner Wing", leftInnerWing);
    animation.set("Right Outer Wing", rightOuterWing);
    animation.set("Left Outer Wing", leftOuterWing);

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
