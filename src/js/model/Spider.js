class Spider {
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
      [0, 0.4, 0],
      [0, 0.4, 0],
      [0.7, 0.6, 0.7],
      "js/model/texture/spider/spider-body.png"
    );

    const neck = new Cube(
      "Neck",
      [0, 0.4, -0.53],
      [0, 0.4, -0.53],
      [0.35, 0.35, 0.35],
      "js/model/texture/spider/spider-neck.png"
    );

    const head = new Cube(
      "Head",
      [0, 0.4, -0.9],
      [0, 0.4, -0.9],
      [0.48, 0.48, 0.4],
      "js/model/texture/spider/spider-head.jpg"
    );

    const leg1 = new Cube(
      "Leg1",
      [0.45, 0.45, -0.38],
      [0.15, 0.45, -0.38],
      [0.7, 0.1, 0.1],
      "js/model/texture/spider/spider-leg.png"
    );
    const leg2 = new Cube(
      "Leg2",
      [0.45, 0.45, -0.47],
      [0.15, 0.45, -0.47],
      [0.7, 0.1, 0.1],
      "js/model/texture/spider/spider-leg.png"
    );
    const leg3 = new Cube(
      "Leg3",
      [0.45, 0.45, -0.57],
      [0.15, 0.45, -0.57],
      [0.7, 0.1, 0.1],
      "js/model/texture/spider/spider-leg.png"
    );
    const leg4 = new Cube(
      "Leg4",
      [0.45, 0.45, -0.65],
      [0.15, 0.45, -0.65],
      [0.7, 0.1, 0.1],
      "js/model/texture/spider/spider-leg.png"
    );
    const leg5 = new Cube(
      "Leg5",
      [-0.45, 0.45, -0.38],
      [-0.15, 0.45, -0.38],
      [0.7, 0.1, 0.1],
      "js/model/texture/spider/spider-leg.png"
    );
    const leg6 = new Cube(
      "Leg6",
      [-0.45, 0.45, -0.47],
      [-0.15, 0.45, -0.47],
      [0.7, 0.1, 0.1],
      "js/model/texture/spider/spider-leg.png"
    );
    const leg7 = new Cube(
      "Leg7",
      [-0.45, 0.45, -0.57],
      [-0.15, 0.45, -0.57],
      [0.7, 0.1, 0.1],
      "js/model/texture/spider/spider-leg.png"
    );
    const leg8 = new Cube(
      "Leg8",
      [-0.45, 0.45, -0.65],
      [-0.15, 0.45, -0.65],
      [0.7, 0.1, 0.1],
      "js/model/texture/spider/spider-leg.png"
    );

    this.cubeList = [
      body,
      head,
      neck,
      leg1,
      leg2,
      leg3,
      leg4,
      leg5,
      leg6,
      leg7,
      leg8,
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

    this.relationship = this.createRelationship();
    this.animation = this.createAnimation();
    this.name = "Spider";
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
    relationships.set("Body", ["Head", "Neck"]);
    relationships.set("Neck", [
      "Leg1",
      "Leg2",
      "Leg3",
      "Leg4",
      "Leg5",
      "Leg6",
      "Leg7",
      "Leg8",
    ]);
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
    let neck = [];
    let leg1 = [];
    let leg2 = [];
    let leg3 = [];
    let leg4 = [];
    let leg5 = [];
    let leg6 = [];
    let leg7 = [];
    let leg8 = [];
    
    body.push(createConfig([0, 0, 0], [0, 26, 0], [1000, 1000, 1000]));
    
    for (let i = -24; i <= 24; i += 3) { 
      head.push(createConfig([0, 0, 0], [0, i, 0], [1000, 1000, 1000]));
      neck.push(createConfig([0, 0, 0], [0, 0, 0], [1000, 1000, 1000]));
    }

    for (let i = 6; i <= 24; i += 2) {
      leg5.push(createConfig([0, 0, 0], [0, i*0.2, -i ], [1000, 1000, 1000]));
      leg1.push(createConfig([0, 0, 0], [0, i*0.2, i ], [1000, 1000, 1000]));
    }
    
    for (let i = 6; i <= 24; i += 3) {
      leg6.push(createConfig([0, 0, 0], [0, i*0.2, -i ], [1000, 1000, 1000]));
      leg2.push(createConfig([0, 0, 0], [0, i*0.2, i ], [1000, 1000, 1000]));
    }

    for (let i = 6; i <= 24; i += 4) {
      leg7.push(createConfig([0, 0, 0], [0, i*0.2, -i ], [1000, 1000, 1000]));
      leg3.push(createConfig([0, 0, 0], [0, i*0.2, i ], [1000, 1000, 1000]));
    }

    for (let i = 6; i <= 24; i += 6) {
      leg8.push(createConfig([0, 0, 0], [0, i*0.2, -i ], [1000, 1000, 1000]));
      leg4.push(createConfig([0, 0, 0], [0, i*0.2, i ], [1000, 1000, 1000]));
    }

    body.push(...body.slice().reverse());
    head.push(...head.slice().reverse());
    leg1.push(...leg1.slice().reverse());
    leg2.push(...leg2.slice().reverse());
    leg3.push(...leg3.slice().reverse());
    leg4.push(...leg4.slice().reverse());
    leg5.push(...leg5.slice().reverse());
    leg6.push(...leg6.slice().reverse());
    leg7.push(...leg7.slice().reverse());
    leg8.push(...leg8.slice().reverse());

    animation.set("Body", body);
    animation.set("Head", head);
    animation.set("Neck", neck);
    animation.set("Leg1", leg1);
    animation.set("Leg2", leg2);
    animation.set("Leg3", leg3);
    animation.set("Leg4", leg4);
    animation.set("Leg5", leg5);
    animation.set("Leg6", leg6);
    animation.set("Leg7", leg7);
    animation.set("Leg8", leg8);
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
