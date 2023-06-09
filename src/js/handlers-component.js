const componentProjectionSelect = document.getElementById(
  "component-projection-select"
);
componentProjectionSelect.addEventListener("change", () => {
  componentFovSlider.disabled =
    componentProjectionSelect.value == "orthographic";
  componentDistanceSlider.disabled =
    componentProjectionSelect.value != "perspective";

  requestAnimationFrame(render);
});

const componentTree = document.getElementById("component-tree");

let currentComponent = "";

const createTreeButton = (name, margin) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = name;
  buttonElement.style.display = "block";
  buttonElement.style.marginLeft = margin;
  buttonElement.addEventListener("click", () => {
    currentComponent = component.name;
    requestAnimationFrame(render);
  });

  componentTree.appendChild(buttonElement);
};

const componentXTranslateSlider = document.getElementById(
  "component-x-translate-slider"
);
componentXTranslateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentYTranslateSlider = document.getElementById(
  "component-y-translate-slider"
);
componentYTranslateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentZTranslateSlider = document.getElementById(
  "component-z-translate-slider"
);
componentZTranslateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentXRotateSlider = document.getElementById(
  "component-x-rotate-slider"
);
componentXRotateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentYRotateSlider = document.getElementById(
  "component-y-rotate-slider"
);
componentYRotateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentZRotateSlider = document.getElementById(
  "component-z-rotate-slider"
);
componentZRotateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentXScaleSlider = document.getElementById(
  "component-x-scaling-slider"
);
componentXScaleSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentYScaleSlider = document.getElementById(
  "component-y-scaling-slider"
);
componentYScaleSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentZScaleSlider = document.getElementById(
  "component-z-scaling-slider"
);
componentZScaleSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const resetComponentSelect = (obj) => {
  componentTree.innerHTML = "";
  currentComponent = obj.mainObject;
  configMap = new Map();
  obj.cubeList.forEach((component) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = component.name;
    buttonElement.style.display = "block";
    buttonElement.style.marginLeft = obj.getDepth(component.name) * 10 + "px";

    configMap.set(component.name, JSON.parse(JSON.stringify(component.config)));

    buttonElement.addEventListener("click", () => {
      currentComponent = component.name;

      model.cubeList.forEach((obj) => {
        configMap.set(obj.name, JSON.parse(JSON.stringify(obj.config)));
      });
      const componentIdx = model.getObjectIdxFromName(component.name);
      const comp = model.cubeList[componentIdx];

      if (component.name == obj.mainObject) {
        componentXTranslateSlider.value = model.globalConfig.translation.x;
        componentYTranslateSlider.value = model.globalConfig.translation.y;
        componentZTranslateSlider.value = model.globalConfig.translation.z;
        componentXRotateSlider.value = model.globalConfig.rotation.x;
        componentYRotateSlider.value = model.globalConfig.rotation.y;
        componentZRotateSlider.value = model.globalConfig.rotation.z;
        componentXScaleSlider.value = model.globalConfig.scale.x;
        componentYScaleSlider.value = model.globalConfig.scale.y;
        componentZScaleSlider.value = model.globalConfig.scale.z;
      } else {
        componentXTranslateSlider.value = comp.config.translation.x;
        componentYTranslateSlider.value = comp.config.translation.y;
        componentZTranslateSlider.value = comp.config.translation.z;
        componentXRotateSlider.value = comp.config.rotation.x;
        componentYRotateSlider.value = comp.config.rotation.y;
        componentZRotateSlider.value = comp.config.rotation.z;
        componentXScaleSlider.value = comp.config.scale.x;
        componentYScaleSlider.value = comp.config.scale.y;
        componentZScaleSlider.value = comp.config.scale.z;
      }

      document.getElementById("component_xtranslation").value = (
        componentXTranslateSlider.value / 1000
      ).toFixed(2);
      document.getElementById("component_ytranslation").value = (
        componentYTranslateSlider.value / 1000
      ).toFixed(2);
      document.getElementById("component_ztranslation").value = (
        componentZTranslateSlider.value / 1000
      ).toFixed(2);

      document.getElementById("component_xrotation").value =
        componentXRotateSlider.value;
      document.getElementById("component_yrotation").value =
        componentYRotateSlider.value;
      document.getElementById("component_zrotation").value =
        componentZRotateSlider.value;

      document.getElementById("component_xscale").value = (
        componentXScaleSlider.value / 1000
      ).toFixed(2);
      document.getElementById("component_yscale").value = (
        componentYScaleSlider.value / 1000
      ).toFixed(2);
      document.getElementById("component_zscale").value = (
        componentZScaleSlider.value / 1000
      ).toFixed(2);
      requestAnimationFrame(render);
    });

    componentTree.appendChild(buttonElement);
  });
};

const componentShaderCheckbox = document.getElementById(
  "component-shader-checkbox"
);
componentShaderCheckbox.addEventListener("change", () => {
  requestAnimationFrame(render);
});

const componentDistanceSlider = document.getElementById(
  "component-distance-slider"
);
componentDistanceSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentVerticalSlider = document.getElementById(
  "component-vertical-slider"
);
componentVerticalSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentHorizontalSlider = document.getElementById(
  "component-horizontal-slider"
);
componentHorizontalSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentReset = () => {
  componentXTranslateSlider.value = 0;
  componentYTranslateSlider.value = 0;
  componentZTranslateSlider.value = 0;
  componentXRotateSlider.value = 0;
  componentYRotateSlider.value = 0;
  componentZRotateSlider.value = 0;
  componentXScaleSlider.value = 1000;
  componentYScaleSlider.value = 1000;
  componentZScaleSlider.value = 1000;
  componentDistanceSlider.value =
    (parseInt(componentDistanceSlider.max) +
      parseInt(componentDistanceSlider.min)) /
    2;
  componentHorizontalSlider.value = 0;
  componentVerticalSlider.value = 90;
  componentFovSlider.value = 45;

  document.getElementById("component_xtranslation").value = 0;
  document.getElementById("component_ytranslation").value = 0;
  document.getElementById("component_ztranslation").value = 0;

  document.getElementById("component_xrotation").value = 0;
  document.getElementById("component_yrotation").value = 0;
  document.getElementById("component_zrotation").value = 0;

  document.getElementById("component_xscale").value = 1.0;
  document.getElementById("component_yscale").value = 1.0;
  document.getElementById("component_zscale").value = 1.0;

  model.cubeList.forEach((obj) => {
    obj.config.translation.x = 0;
    obj.config.translation.y = 0;
    obj.config.translation.z = 0;
    obj.config.rotation.x = 0;
    obj.config.rotation.y = 0;
    obj.config.rotation.z = 0;
    obj.config.scale.x = 1000;
    obj.config.scale.y = 1000;
    obj.config.scale.z = 1000;
  });
  requestAnimationFrame(render);
};

const componentFovSlider = document.getElementById("component-fov-slider");
componentFovSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const customTextureButtonSubtree = document.getElementById(
  "custom-texture-button-subtree"
);
customTextureButtonSubtree.addEventListener("change", () => {
  const image = customTextureButtonSubtree.files[0];
  const path = URL.createObjectURL(image);

  const children = model.findChildren(currentComponent);

  let childrenNames = [];

  children.forEach((obj) => {
    childrenNames.push(obj.name);
  });

  childrenNames.push(currentComponent);

  model.cubeList.forEach((obj) => {
    if (childrenNames.includes(obj.name)) {
      obj.texturePath = path;
    }
  });

  model.createComponentTextures();
});

const componentTextureSelect = document.getElementById(
  "component-texture-select"
);
componentTextureSelect.addEventListener("change", () => {
  customTextureButtonSubtree.disabled = componentTextureSelect.value != "0";
  requestAnimationFrame(render);
});

const componentResetButton = document.getElementById("component-reset-button");
componentResetButton.addEventListener("click", componentReset);
