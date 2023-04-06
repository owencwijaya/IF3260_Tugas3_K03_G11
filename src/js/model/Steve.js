class Steve {
  constructor() {
    const obj = new Cube(
      "Body",
      [0, 0.4, 0],
      [0, 0, 0],
      [0.4, 0.8, 0.2],
      "js/model/texture/steve/steve_body.png"
    );
    const obj2 = new Cube(
      "Head",
      [0, 1.0, 0],
      [0, 1.0, 0],
      [0.4, 0.4, 0.4],
      "js/model/texture/steve/steve_head.png"
    );

    console.log(obj2);

    const obj3 = new Cube(
      "Upper Right Arm",
      [0.3, 0.7, 0],
      [0.3, 0.7, 0],
      [0.2, 0.2, 0.2],
      "js/model/texture/steve/steve_upper_arm.png"
    );

    const obj4 = new Cube(
      "Lower Right Arm",
      [0.3, 0.3, 0],
      [0.3, 0.5, 0],
      [0.2, 0.6, 0.2],
      "js/model/texture/steve/steve_lower_arm.png"
    );

    const obj5 = new Cube(
      "Upper Left Arm",
      [-0.3, 0.7, 0],
      [-0.3, 0.7, 0],
      [0.2, 0.2, 0.2],
      "js/model/texture/steve/steve_upper_arm.png"
    );

    const obj6 = new Cube(
      "Lower Left Arm",
      [-0.3, 0.3, 0],
      [-0.3, 0.5, 0],
      [0.2, 0.6, 0.2],
      "js/model/texture/steve/steve_lower_arm.png"
    );

    const obj7 = new Cube(
      "Right Leg",
      [0.1, -0.4, 0],
      [0, 0, 0],
      [0.2, 0.8, 0.2],
      "js/model/texture/steve/steve_leg.png"
    );

    const obj8 = new Cube(
      "Left Leg",
      [-0.1, -0.4, 0],
      [0, 0, 0],
      [0.2, 0.8, 0.2],
      "js/model/texture/steve/steve_leg.png"
    );

    this.cubeList = [obj, obj2, obj3, obj4, obj5, obj6, obj7, obj8];
    this.textureList = [];
    this.textureList = [];
    this.componentTextureList = [];
    this.names = [];

    this.cubeList.forEach((obj) => {
      this.textureList.push(loadTexture(gl, obj.texturePath));
      this.componentTextureList.push(loadTexture(componentGl, obj.texturePath));
      this.names.push(obj.name);
    });

    // prettier-ignore
    this.relationship = new Map()
    this.relationship.set("Body", [
      "Head",
      "Upper Right Arm",
      "Upper Left Arm",
      "Right Leg",
      "Left Leg",
    ]);
    this.relationship.set("Upper Left Arm", ["Lower Left Arm"]);
    this.relationship.set("Upper Right Arm", ["Lower Right Arm"]);
    // {
    //   "Body": [
    //     "Head",
    //     "Upper Right Arm",
    //     "Upper Left Arm",
    //     "Right Leg",
    //     "Left Leg",
    //   ],
    //   "Upper Left Arm": ["Lower Left Arm"],
    //   "Upper Right Arm": ["Lower Right Arm"],
    // };
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
        console.log(value);
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
}
