const normalize = (array) => {
  let sum = 0;

  array.forEach((elmt) => {
    sum += elmt * elmt;
  });

  const magnitude = Math.sqrt(sum);

  for (let i = 0; i < array.length; i++) {
    array[i] /= magnitude;
  }

  return array;
};

const subtractVectors = (a, b) => {
  let result = [];

  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] - b[i];
  }

  return result;
};

const cross = (a, b) => {
  let result = [];

  result[0] = a[1] * b[2] - a[2] * b[1];
  result[1] = a[2] * b[0] - a[0] * b[2];
  result[2] = a[0] * b[1] - a[1] * b[0];

  return result;
};

const dot = (a, b) => {
  let result = 0;

  for (let i = 0; i < a.length; i++) {
    result += a[i] * b[i];
  }

  return result;
};

const multiply = (a, b) => {
  const result = new Float32Array(16).fill(0);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        result[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
      }
    }
  }

  return result;
};

const multiplyMatVec = (a, vec) => {
  const mat = [
    [a[0], a[1], a[2], a[3]],
    [a[4], a[5], a[6], a[7]],
    [a[8], a[9], a[10], a[11]],
    [a[12], a[13], a[14], a[15]],
  ];

  const result = new Float32Array(4).fill(0);
  for (let i = 0; i < 4; i++) {
    let sum = 0;
    for (let j = 0; j < 4; j++) {
      sum += mat[i][j] * vec[j];
    }
    result[i] = sum;
  }
  return result;
};

const transpose = (arr) => {
  const transposedArr = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      transposedArr[i * 4 + j] = arr[j * 4 + i];
    }
  }
  return transposedArr;
};

const invert = (arr) => {
  let mat = [];
  for (let i = 0; i < Math.sqrt(arr.length); i++) {
    let temp = [];
    for (let j = 0; j < Math.sqrt(arr.length); j++) {
      temp.push(arr[i * 4 + j]);
    }
    mat.push(temp);
  }

  let crossValues = new Array(12);

  crossValues[0] = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
  crossValues[1] = mat[0][0] * mat[1][2] - mat[0][2] * mat[1][0];
  crossValues[2] = mat[0][0] * mat[1][3] - mat[0][3] * mat[1][0];
  crossValues[3] = mat[0][1] * mat[1][2] - mat[0][2] * mat[1][1];
  crossValues[4] = mat[0][1] * mat[1][3] - mat[0][3] * mat[1][1];
  crossValues[5] = mat[0][2] * mat[1][3] - mat[0][3] * mat[1][2];
  crossValues[6] = mat[2][0] * mat[3][1] - mat[2][1] * mat[3][0];
  crossValues[7] = mat[2][0] * mat[3][2] - mat[2][2] * mat[3][0];
  crossValues[8] = mat[2][0] * mat[3][3] - mat[2][3] * mat[3][0];
  crossValues[9] = mat[2][1] * mat[3][2] - mat[2][2] * mat[3][1];
  crossValues[10] = mat[2][1] * mat[3][3] - mat[2][3] * mat[3][1];
  crossValues[11] = mat[2][2] * mat[3][3] - mat[2][3] * mat[3][2];

  let determinant = 0;
  for (let i = 0; i < crossValues.length / 2; i++) {
    const sign = i % 3 == 1 ? -1 : 1;
    determinant +=
      sign * crossValues[i] * crossValues[crossValues.length - 1 - i];
  }

  if (!determinant) {
    return null;
  }

  determinant = 1.0 / determinant;

  let result = new Float32Array(16);
  result[0] =
    (mat[1][1] * crossValues[11] -
      mat[1][2] * crossValues[10] +
      mat[1][3] * crossValues[9]) *
    determinant;
  result[1] =
    (-mat[0][1] * crossValues[11] +
      mat[0][2] * crossValues[10] -
      mat[0][3] * crossValues[9]) *
    determinant;
  result[2] =
    (mat[3][1] * crossValues[5] -
      mat[3][2] * crossValues[4] +
      mat[3][3] * crossValues[3]) *
    determinant;
  result[3] =
    (-mat[2][1] * crossValues[5] +
      mat[2][2] * crossValues[4] -
      mat[2][3] * crossValues[3]) *
    determinant;
  result[4] =
    (mat[1][2] * crossValues[8] -
      mat[1][0] * crossValues[11] -
      mat[1][3] * crossValues[7]) *
    determinant;
  result[5] =
    (-mat[0][2] * crossValues[8] +
      mat[0][0] * crossValues[11] +
      mat[0][3] * crossValues[7]) *
    determinant;
  result[6] =
    (mat[3][2] * crossValues[2] -
      mat[3][0] * crossValues[5] -
      mat[3][3] * crossValues[1]) *
    determinant;
  result[7] =
    (-mat[2][2] * crossValues[2] +
      mat[2][0] * crossValues[5] +
      mat[2][3] * crossValues[1]) *
    determinant;
  result[8] =
    (mat[1][0] * crossValues[10] -
      mat[1][1] * crossValues[8] +
      mat[1][3] * crossValues[6]) *
    determinant;
  result[9] =
    (-mat[0][0] * crossValues[10] +
      mat[0][1] * crossValues[8] -
      mat[0][3] * crossValues[6]) *
    determinant;
  result[10] =
    (mat[3][0] * crossValues[4] -
      mat[3][1] * crossValues[2] +
      mat[3][3] * crossValues[0]) *
    determinant;
  result[11] =
    (-mat[2][0] * crossValues[4] +
      mat[2][1] * crossValues[2] -
      mat[2][3] * crossValues[0]) *
    determinant;
  result[12] =
    (mat[1][1] * crossValues[7] -
      mat[1][0] * crossValues[9] -
      mat[1][2] * crossValues[6]) *
    determinant;
  result[13] =
    (-mat[0][1] * crossValues[7] +
      mat[0][0] * crossValues[9] +
      mat[0][2] * crossValues[6]) *
    determinant;
  result[14] =
    (mat[3][1] * crossValues[1] -
      mat[3][0] * crossValues[3] -
      mat[3][2] * crossValues[0]) *
    determinant;
  result[15] =
    (-mat[2][1] * crossValues[1] +
      mat[2][0] * crossValues[3] +
      mat[2][2] * crossValues[0]) *
    determinant;

  return result;
};

const createMOrth = () => {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};

const createIdentity = () => {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};

const degreesToRadians = (degree) => {
  return (degree * Math.PI) / 180;
};
