const fragmentShader = /*glsl*/ `
  varying vec2 vUv;

  void main(){
    gl_FragColor = vec4(vUv, 0., 1.);
  }
`;

export default fragmentShader;
