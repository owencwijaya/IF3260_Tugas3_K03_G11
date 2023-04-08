const projectionSelect = document.getElementById("projection-select");
projectionSelect.addEventListener("change", () => {
  fovSlider.disabled = projectionSelect.value == "orthographic";
  distanceSlider.disabled = projectionSelect.value != "perspective";

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

const saveModelButton = document.getElementById("save-model-button");
saveModelButton.addEventListener("click", () => {
  // let xScale = 0;
  // let yScale = 0;
  // let zScale = 0;

  // if (loaded) {
  //   xScale = Math.max(10,(xScaleSlider.value - 1000));
  //   yScale = Math.max(10, obj.config.scaling.y + (yScaleSlider.value - 1000));
  //   zScale = Math.max(10, obj.config.scaling.z + (zScaleSlider.value - 1000));
  // } else {
  //   xScale = xScaleSlider.value;
  //   yScale = yScaleSlider.value;
  //   zScale = zScaleSlider.value;
  // }

  // // update config
  // const newConfig = {
  //   translation: {
  //     x: obj.config.translation.x + parseInt(xTranslateSlider.value),
  //     y: obj.config.translation.y + parseInt(yTranslateSlider.value),
  //     z: obj.config.translation.z + parseInt(zTranslateSlider.value),
  //   },
  //   rotation: {
  //     x: obj.config.rotation.x + parseInt(xRotateSlider.value),
  //     y: obj.config.rotation.y + parseInt(yRotateSlider.value),
  //     z: obj.config.rotation.z + parseInt(zRotateSlider.value),
  //   },
  //   scaling: {
  //     x: parseInt(xScale),
  //     y: parseInt(yScale),
  //     z: parseInt(zScale),
  //   },
  // };
  // if (obj instanceof HollowCube) {
  //   savedObj = new HollowCube(obj.color, newConfig);
  // } else if (obj instanceof HollowTrianglePrism) {
  //   savedObj = new HollowTrianglePrism(obj.color, newConfig);
  // } else if (obj instanceof HollowDiamond) {
  //   savedObj = new HollowDiamond(obj.color, newConfig);
  // }

  const filename = document.getElementById("filename").value;
  if (filename == "") {
    alert("Please input the output file name!");
    return;
  }

  const content = JSON.stringify(savedObj);

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
    const content = JSON.parse(evt.target.result);

    reset();
  };

  alert("Successfully loaded file!");
  reset();
  loadModelButton.value = "";
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
