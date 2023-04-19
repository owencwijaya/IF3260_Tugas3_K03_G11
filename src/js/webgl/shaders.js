const vertexShaderSource = `
    precision mediump float;

    attribute vec3 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    attribute vec3 aVertexTangent;
    attribute vec3 aVertexBitangent;
    attribute vec2 aVertexUV;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uNormalMatrix;
    uniform mat4 uWorldMatrix;

    uniform vec3 uAmbientLight;
    uniform vec3 uDirectionalVector;

    varying vec3 lightPos;
    varying vec3 viewPos;
    varying vec3 fragmentPos;

    varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;

    varying vec2 fragUV;

    mat3 transpose(in mat3 inMatrix)
    {
        vec3 i0 = inMatrix[0];
        vec3 i1 = inMatrix[1];
        vec3 i2 = inMatrix[2];

        mat3 outMatrix = mat3(
            vec3(i0.x, i1.x, i2.x),
            vec3(i0.y, i1.y, i2.y),
            vec3(i0.z, i1.z, i2.z)
        );

        return outMatrix;
    }


    void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix  * vec4(aVertexPosition, 1.0);
        vTextureCoord = aTextureCoord;
        highp vec3 directionalLightColor = vec3(1, 1, 1);
        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
  
        highp float directional = max(dot(transformedNormal.xyz, uDirectionalVector), 0.0);
        vLighting = uAmbientLight + (directionalLightColor * directional);

        vec3 tangent = normalize(mat3(uNormalMatrix) * aVertexTangent);
        vec3 bitangent = normalize(mat3(uNormalMatrix) * aVertexBitangent);
        vec3 normal = normalize(mat3(uNormalMatrix) * aVertexNormal);
        mat3 tbn = transpose(mat3(tangent, bitangent, normal));

        lightPos = tbn * uDirectionalVector;
        viewPos = tbn * vec3(0, 0, 0);
        fragmentPos = tbn * vec3(uModelViewMatrix * vec4(aVertexPosition, 1.0));

        vWorldPosition = (uWorldMatrix * vec4(aVertexPosition, 1.0)).xyz;
        vWorldNormal = mat3(uWorldMatrix) * aVertexNormal;
    }
`;

const fragmentShaderSource = `
    precision mediump float;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;
    uniform sampler2D uNormalTex;
    uniform sampler2D uDiffuseTex;
    uniform sampler2D uDepthTex;
    uniform int type;

    varying vec3 lightPos;
    varying vec3 viewPos;
    varying vec3 fragmentPos;
    uniform vec3 uDirectionalVector;
    uniform vec3 uCameraPosition;
    uniform samplerCube uCubeTexture;

    varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;

    vec2 parallax_uv(vec2 uv, vec3 view_dir){
      float depth = texture2D(uDepthTex, uv).r;    
      vec2 p = view_dir.xy * (depth * 0.01) / view_dir.z;
      return uv - p;  
    }

    void main() {
      if (type == 0) {
        highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
        gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
      } else if (type == 1) {
        vec3 light_dir = normalize(lightPos - fragmentPos);
        vec3 view_dir = normalize(viewPos - fragmentPos);
        vec2 uv = parallax_uv(vTextureCoord, view_dir);
        vec3 albedo = texture2D(uDiffuseTex, uv).rgb;
        vec3 ambient = 0.3 * albedo;
    
        vec3 norm = normalize(texture2D(uNormalTex, uv).rgb * 2.0 - 1.0);
        float diffuse = max(dot(light_dir, norm), 0.0);
        gl_FragColor = vec4(diffuse * albedo + ambient, 1.0);
      } else if (type == 2) {
        vec3 worldNormal = normalize(vWorldNormal);
        vec3 eyeToSurfaceDir = -normalize(vWorldPosition - uCameraPosition);
        vec3 direction = reflect(eyeToSurfaceDir, worldNormal);

        gl_FragColor = textureCube(uCubeTexture, direction);
      }
    }
`;

// fungsi untuk membuat shader berdasarkan type dan source nya
const loadShader = (gl, type, source) => {
  // bikin shader baru berdasarkan type
  const shader = gl.createShader(type);

  // load source code ke shader
  gl.shaderSource(shader, source);

  // tes compile
  gl.compileShader(shader);

  // kalo COMPILE_STATUS ngga ada, berarti gagal compile
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("Unable to compile shaders; check console for more information.");
    console.log(
      `Unable to compile ${type} shaders: ${gl.getShaderInfoLog(shader)}`
    );

    return null;
  }

  return shader;
};

// fungsi untuk inisiasi shader; return shaderProgram
const initShaders = (gl) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = loadShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  // buat shader programnya
  const shaderProgram = gl.createProgram();

  // attach vertex shader & fragment shader
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // misalnya shader programnya gagal compile, return null
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(`Unable to init shader program: check console for more information.`);
    console.log(
      `Unable to initialize shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );

    return null;
  }

  return shaderProgram;
};
