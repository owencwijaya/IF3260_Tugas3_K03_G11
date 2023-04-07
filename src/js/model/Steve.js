class Steve {
  constructor() {
    const body = new Cube(
      "Body",
      [0, 0.4, 0],
      [0, 0, 0],
      [0.4, 0.8, 0.2],
      "js/model/texture/steve/steve_body.png"
    );
    const head = new Cube(
      "Head",
      [0, 1.0, 0],
      [0, 1.0, 0],
      [0.4, 0.4, 0.4],
      "js/model/texture/steve/steve_head.png"
    );

    const upperRightArm = new Cube(
      "Upper Right Arm",
      [0.3, 0.7, 0],
      [0.3, 0.7, 0],
      [0.2, 0.2, 0.2],
      "js/model/texture/steve/steve_upper_arm.png"
    );

    const lowerRightArm = new Cube(
      "Lower Right Arm",
      [0.3, 0.3, 0],
      [0.3, 0.5, 0],
      [0.2, 0.6, 0.2],
      "js/model/texture/steve/steve_lower_arm.png"
    );

    const upperLeftArm = new Cube(
      "Upper Left Arm",
      [-0.3, 0.7, 0],
      [-0.3, 0.7, 0],
      [0.2, 0.2, 0.2],
      "js/model/texture/steve/steve_upper_arm.png"
    );

    const lowerLeftArm = new Cube(
      "Lower Left Arm",
      [-0.3, 0.3, 0],
      [-0.3, 0.5, 0],
      [0.2, 0.6, 0.2],
      "js/model/texture/steve/steve_lower_arm.png"
    );

    const rightLeg = new Cube(
      "Right Leg",
      [0.1, -0.4, 0],
      [0, 0, 0],
      [0.2, 0.8, 0.2],
      "js/model/texture/steve/steve_leg.png"
    );

    const leftLeg = new Cube(
      "Left Leg",
      [-0.1, -0.4, 0],
      [0, 0, 0],
      [0.2, 0.8, 0.2],
      "js/model/texture/steve/steve_leg.png"
    );

    this.cubeList = [
      body,
      head,
      upperRightArm,
      lowerRightArm,
      upperLeftArm,
      lowerLeftArm,
      rightLeg,
      leftLeg,
    ];

    this.textureList = [];
    this.componentTextureList = [];
    this.names = [];
    this.mainObject = "Body";

    this.cubeList.forEach((obj) => {
      this.textureList.push(loadTexture(gl, obj.texturePath));
      this.componentTextureList.push(loadTexture(componentGl, obj.texturePath));
      this.names.push(obj.name);
    });

    // prettier-ignore
    this.relationship = this.createRelationship();
    this.animation = this.createAnimation();
  }

  createRelationship() {
    let relationships = new Map();
    relationships.set("Body", [
      "Head",
      "Upper Right Arm",
      "Upper Left Arm",
      "Right Leg",
      "Left Leg",
    ]);
    relationships.set("Upper Left Arm", ["Lower Left Arm"]);
    relationships.set("Upper Right Arm", ["Lower Right Arm"]);

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
    let upperLeftArm = [];
    let lowerLeftArm = [];
    let upperRightArm = [];
    let lowerRightArm = [];
    let leftLeg = [];
    let rightLeg = [];

    for (let i = -60; i <= 60; i += 10) {
      body.push(createConfig([0, 0, 0], [0, i / 6, 0], [1000, 1000, 1000]));
      head.push(createConfig([0, 0, 0], [0, i / 3, 0], [1000, 1000, 1000]));
      upperLeftArm.push(
        createConfig([0, 0, 0], [i, i / 6, 0], [1000, 1000, 1000])
      );
      lowerLeftArm.push(
        createConfig([0, 0, 0], [i * 1.5, i / 6, 0], [1000, 1000, 1000])
      );
      upperRightArm.push(
        createConfig([0, 0, 0], [-i, i / 6, -i / 10], [1000, 1000, 1000])
      );
      lowerRightArm.push(
        createConfig([0, 0, 0], [-i * 1.5, i / 6, -i / 10], [1000, 1000, 1000])
      );
      leftLeg.push(createConfig([0, 0, 0], [i / 3, 0, 0], [1000, 1000, 1000]));
      rightLeg.push(
        createConfig([0, 0, 0], [-i / 3, 0, 0], [1000, 1000, 1000])
      );
    }

    body.push(...body.slice().reverse());
    head.push(...head.slice().reverse());
    upperLeftArm.push(...upperLeftArm.slice().reverse());
    lowerLeftArm.push(...lowerLeftArm.slice().reverse());
    upperRightArm.push(...upperRightArm.slice().reverse());
    lowerRightArm.push(...lowerRightArm.slice().reverse());
    leftLeg.push(...leftLeg.slice().reverse());
    rightLeg.push(...rightLeg.slice().reverse());

    animation.set("Body", body);
    animation.set("Head", head);
    animation.set("Upper Left Arm", upperLeftArm);
    animation.set("Lower Left Arm", lowerLeftArm);
    animation.set("Upper Right Arm", upperRightArm);
    animation.set("Lower Right Arm", lowerRightArm);
    animation.set("Left Leg", leftLeg);
    animation.set("Right Leg", rightLeg);
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
