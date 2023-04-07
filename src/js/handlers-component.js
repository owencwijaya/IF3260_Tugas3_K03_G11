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

const componentSelect = document.getElementById("component-select");
componentSelect.addEventListener("load", () => {
  requestAnimationFrame(render);
});

componentSelect.addEventListener("change", () => {
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

const resetComponentSelect = (obj) => {
  componentTree.innerHTML = "";
  currentComponent = obj.mainObject;

  obj.cubeList.forEach((component) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = component.name;
    buttonElement.style.display = "block";
    buttonElement.style.marginLeft = obj.getDepth(component.name) * 10 + "px";
    console.log(obj.getDepth(component.name));
    console.log(obj.findChildren(component.name));
    buttonElement.addEventListener("click", () => {
      currentComponent = component.name;
      requestAnimationFrame(render);
    });

    componentTree.appendChild(buttonElement);
  });
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

const componentXRotateCheckbox = document.getElementById(
  "component-x-rotate-checkbox"
);
componentXRotateCheckbox.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentYRotateCheckbox = document.getElementById(
  "component-y-rotate-checkbox"
);
componentYRotateCheckbox.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentZRotateCheckbox = document.getElementById(
  "component-z-rotate-checkbox"
);
componentZRotateCheckbox.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentXScalingSlider = document.getElementById(
  "component-x-scaling-slider"
);
componentXScalingSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentYScalingSlider = document.getElementById(
  "component-y-scaling-slider"
);
componentYScalingSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

const componentZScalingSlider = document.getElementById(
  "component-z-scaling-slider"
);
componentZScalingSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});

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
  componentXScalingSlider.value = 1000;
  componentYScalingSlider.value = 1000;
  componentZScalingSlider.value = 1000;
  componentDistanceSlider.value =
    (parseInt(componentDistanceSlider.max) +
      parseInt(componentDistanceSlider.min)) /
    2;
  componentHorizontalSlider.value = 0;
  componentVerticalSlider.value = 90;
  componentFovSlider.value = 45;

  document.getElementById("component-xtranslation").value = 0;
  document.getElementById("component-ytranslation").value = 0;
  document.getElementById("component-ztranslation").value = 0;

  document.getElementById("component-xrotation").value = 0;
  document.getElementById("component-yrotation").value = 0;
  document.getElementById("component-zrotation").value = 0;

  document.getElementById("component-xscale").value = 1.0;
  document.getElementById("component-yscale").value = 1.0;
  document.getElementById("component-zscale").value = 1.0;
  requestAnimationFrame(render);
};

const componentFovSlider = document.getElementById("component-fov-slider");
componentFovSlider.addEventListener("input", () => {
  requestAnimationFrame(render);
});
