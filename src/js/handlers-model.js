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

// const colorPicker = document.getElementById("color-picker");
// colorPicker.addEventListener("input", () => {
//   requestAnimationFrame(render);
// });

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
  const content = JSON.stringify(model, replacer, "\t");

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
    if (content.name == "Steve") {
      model = new Steve();
    } else if (content.name == "Spider") {
      model = new Spider();
    } else if (content.name == "Chicken") {
      model = new Chicken();
    }

    model.createTextures();
    model.createComponentTextures();
    resetComponentSelect(model);
    reset();
  };

  alert("Successfully loaded file!");
  reset();
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

steveButton.addEventListener("click", () => {
  model = new Steve();
  model.createTextures();
  model.createComponentTextures();
  reset();
  resetComponentSelect(model);
  requestAnimationFrame(render);
});

spiderButton.addEventListener("click", () => {
  model = new Spider();
  model.createTextures();
  model.createComponentTextures();
  reset();
  resetComponentSelect(model);
  requestAnimationFrame(render);
});

chickenButton.addEventListener("click", () => {
  model = new Chicken();
  model.createTextures();
  model.createComponentTextures();
  reset();
  resetComponentSelect(model);
  requestAnimationFrame(render);
});
