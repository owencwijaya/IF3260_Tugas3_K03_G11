const projectionSelect = document.getElementById("projection-select");
projectionSelect.addEventListener("change", () => {
  fovSlider.disabled = projectionSelect.value == "orthographic";
  distanceSlider.disabled = projectionSelect.value != "perspective";

  requestAnimationFrame(render);
});

const textureSelect = document.getElementById("texture-select");
textureSelect.addEventListener("change", () => {
  customTextureButton.disabled = textureSelect.value != "0";
  requestAnimationFrame(render);
});

const xTranslateSlider = document.getElementById("x-translate-slider");
xTranslateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const yTranslateSlider = document.getElementById("y-translate-slider");
yTranslateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const zTranslateSlider = document.getElementById("z-translate-slider");
zTranslateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const xRotateSlider = document.getElementById("x-rotate-slider");
xRotateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const yRotateSlider = document.getElementById("y-rotate-slider");
yRotateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const zRotateSlider = document.getElementById("z-rotate-slider");
zRotateSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const xScaleSlider = document.getElementById("x-scaling-slider");
xScaleSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const yScaleSlider = document.getElementById("y-scaling-slider");
yScaleSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const zScaleSlider = document.getElementById("z-scaling-slider");
zScaleSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const shaderCheckbox = document.getElementById("shader-checkbox");
shaderCheckbox.addEventListener("change", () => {
  requestAnimationFrame(render);
});

const animationCheckbox = document.getElementById("animation-checkbox");
animationCheckbox.addEventListener("change", () => {
  requestAnimationFrame(render);
});

const distanceSlider = document.getElementById("distance-slider");
distanceSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const verticalSlider = document.getElementById("vertical-slider");
verticalSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const horizontalSlider = document.getElementById("horizontal-slider");
horizontalSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});
const reset = () => {
  xTranslateSlider.value = 0;
  yTranslateSlider.value = 0;
  zTranslateSlider.value = 0;
  xRotateSlider.value = 0;
  yRotateSlider.value = 0;
  zRotateSlider.value = 0;
  xScaleSlider.value = 1000;
  yScaleSlider.value = 1000;
  zScaleSlider.value = 1000;
  distanceSlider.value =
    (parseInt(distanceSlider.max) + parseInt(distanceSlider.min)) / 2;
  horizontalSlider.value = 0;
  verticalSlider.value = 90;
  fovSlider.value = 45;

  document.getElementById("xtranslation").value = 0;
  document.getElementById("ytranslation").value = 0;
  document.getElementById("ztranslation").value = 0;

  document.getElementById("xrotation").value = 0;
  document.getElementById("yrotation").value = 0;
  document.getElementById("zrotation").value = 0;

  document.getElementById("xscale").value = 1.0;
  document.getElementById("yscale").value = 1.0;
  document.getElementById("zscale").value = 1.0;
  requestAnimationFrame(render);
};

const fovSlider = document.getElementById("fov-slider");
fovSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", reset);

const replacer = (key, value) => {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
};

const reviver = (key, value) => {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
};

const saveModelButton = document.getElementById("save-model-button");
saveModelButton.addEventListener("click", () => {
  const wholeCanvasState = createConfig(
    [
      parseInt(xTranslateSlider.value),
      parseInt(yTranslateSlider.value),
      parseInt(zTranslateSlider.value),
    ],
    [
      parseInt(xRotateSlider.value),
      parseInt(yRotateSlider.value),
      parseInt(zRotateSlider.value),
    ],
    [
      parseInt(xScaleSlider.value),
      parseInt(yScaleSlider.value),
      parseInt(zScaleSlider.value),
    ]
  );
  const content = JSON.stringify([wholeCanvasState, model], replacer, "\t");

  const filename = document.getElementById("filename").value;
  if (filename == "") {
    alert("Please input the output file name!");
    return;
  }

  const file = new Blob([content], {
    type: "json/javascript",
  });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(file);
  link.download = `${filename}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});

const loadModelButton = document.getElementById("load-model-button");
loadModelButton.addEventListener("change", () => {
  const selectedFile = loadModelButton.files[0];

  const reader = new FileReader();

  reader.readAsText(selectedFile, "UTF-8");

  reader.onload = (evt) => {
    const content = JSON.parse(evt.target.result, reviver);
    const wholeCanvasState = content[0];
    const loadedModel = content[1];
    if (loadedModel.name == "Steve") {
      model = new Steve();
    } else if (loadedModel.name == "Spider") {
      model = new Spider();
    } else if (loadedModel.name == "Chicken") {
      model = new Chicken();
    } else if (loadedModel.name == "Dragon") {
      model = new Dragon();
    }

    model.createTextures();
    model.createComponentTextures();

    model.globalConfig = loadedModel.globalConfig;
    model.movedMap = loadedModel.movedMap;

    xTranslateSlider.value = wholeCanvasState.translation.x;
    yTranslateSlider.value = wholeCanvasState.translation.y;
    zTranslateSlider.value = wholeCanvasState.translation.z;
    xRotateSlider.value = wholeCanvasState.rotation.x;
    yRotateSlider.value = wholeCanvasState.rotation.y;
    zRotateSlider.value = wholeCanvasState.rotation.z;
    xScaleSlider.value = wholeCanvasState.scale.x;
    yScaleSlider.value = wholeCanvasState.scale.y;
    zScaleSlider.value = wholeCanvasState.scale.z;

    componentXTranslateSlider.value = loadedModel.globalConfig.translation.x;
    componentYTranslateSlider.value = loadedModel.globalConfig.translation.y;
    componentZTranslateSlider.value = loadedModel.globalConfig.translation.z;
    componentXRotateSlider.value = loadedModel.globalConfig.rotation.x;
    componentYRotateSlider.value = loadedModel.globalConfig.rotation.y;
    componentZRotateSlider.value = loadedModel.globalConfig.rotation.z;
    componentXScaleSlider.value = loadedModel.globalConfig.scale.x;
    componentYScaleSlider.value = loadedModel.globalConfig.scale.y;
    componentZScaleSlider.value = loadedModel.globalConfig.scale.z;

    currentComponent = model.mainObject;
    document.getElementById("xtranslation").value =
      xTranslateSlider.value / 1000;
    document.getElementById("ytranslation").value =
      yTranslateSlider.value / 1000;
    document.getElementById("ztranslation").value =
      zTranslateSlider.value / 1000;

    document.getElementById("xrotation").value = xRotateSlider.value;
    document.getElementById("yrotation").value = yRotateSlider.value;
    document.getElementById("zrotation").value = zRotateSlider.value;

    document.getElementById("xscale").value = xScaleSlider.value / 1000;
    document.getElementById("yscale").value = yScaleSlider.value / 1000;
    document.getElementById("zscale").value = zScaleSlider.value / 1000;

    document.getElementById("component_xtranslation").value =
      componentXTranslateSlider.value / 1000;
    document.getElementById("component_ytranslation").value =
      componentYTranslateSlider.value / 1000;
    document.getElementById("component_ztranslation").value =
      componentZTranslateSlider.value / 1000;

    document.getElementById("component_xrotation").value =
      componentXRotateSlider.value;
    document.getElementById("component_yrotation").value =
      componentYRotateSlider.value;
    document.getElementById("component_zrotation").value =
      componentZRotateSlider.value;

    document.getElementById("component_xscale").value =
      componentXScaleSlider.value / 1000;
    document.getElementById("component_yscale").value =
      componentYScaleSlider.value / 1000;
    document.getElementById("component_zscale").value =
      componentZScaleSlider.value / 1000;

    for (let i = 0; i < loadedModel.cubeList.length; i++) {
      model.cubeList[i] = loadedModel.cubeList[i];
    }

    resetComponentSelect(model);

    requestAnimationFrame(render);
  };

  alert("Successfully loaded file!");
  loadModelButton.value = "";
});

const customTextureButton = document.getElementById("custom-texture-button");
customTextureButton.addEventListener("change", () => {
  const image = customTextureButton.files[0];
  const path = URL.createObjectURL(image);

  model.cubeList.forEach((obj) => {
    obj.texturePath = path;
  });

  model.createTextures();
  model.createComponentTextures();
});

const helpModal = document.getElementById("help-modal");

const helpButton = document.getElementById("help-button");
helpButton.addEventListener("click", () => {
  helpModal.style.display = "block";
});

const closeButton = document.getElementById("close-button");
closeButton.addEventListener("click", () => {
  helpModal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == helpModal) {
    helpModal.style.display = "none";
  }
};

const steveButton = document.getElementById("steve-button");
const spiderButton = document.getElementById("spider-button");
const chickenButton = document.getElementById("chicken-button");
const dragonButton = document.getElementById("dragon-button");

steveButton.addEventListener("click", () => {
  model = new Steve();
  model.createTextures();
  model.createComponentTextures();
  reset();
  componentReset();
  resetComponentSelect(model);
  requestAnimationFrame(render);
});

spiderButton.addEventListener("click", () => {
  model = new Spider();
  model.createTextures();
  model.createComponentTextures();
  reset();
  componentReset();
  resetComponentSelect(model);
  requestAnimationFrame(render);
});

chickenButton.addEventListener("click", () => {
  model = new Chicken();
  model.createTextures();
  model.createComponentTextures();
  reset();
  componentReset();
  resetComponentSelect(model);
  requestAnimationFrame(render);
});

dragonButton.addEventListener("click", () => {
  model = new Dragon();
  model.createTextures();
  model.createComponentTextures();
  reset();
  componentReset();
  resetComponentSelect(model);
  requestAnimationFrame(render);
});
