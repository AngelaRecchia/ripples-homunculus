import React, { Children, useMemo, useRef, useState } from "react";
import vertexShader from "./shaders/vertexShader";
import fragmentShader from "./shaders/fragmentShader";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
const Experience = () => {
  const { size } = useThree();
  const { width, height } = size;

  const max = useMemo(() => 50, []);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });
  const [currentWave, setCurrentWave] = useState(0);

  // ref
  const planesRef = useRef();

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          time: { value: 0 },
        },
      }),
    []
  );

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        map: new THREE.TextureLoader().load("./brush.png"),
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      }),
    []
  );

  const plane = useMemo(() => new THREE.PlaneGeometry(100, 100), []);

  const setNewWave = (x, y, index) => {
    const mesh = planesRef.current.children[index];
    mesh.visible = true;
    mesh.position.x = x * window.innerWidth;
    mesh.position.y = y * window.innerHeight;
    mesh.material.opacity = 1;
  };

  useFrame(({ clock, pointer, size }) => {
    setMouse({
      x: pointer.x * 0.5,
      y: pointer.y * 0.5,
    });

    shaderMaterial.uniforms.time.value = clock.elapsedTime;

    if (
      Math.abs(mouse.x - prevMouse.x) < 0.001 &&
      Math.abs(mouse.y - prevMouse.y) < 0.001
    ) {
      // nothig
    } else {
      planesRef.current.children[currentWave].visible = false;
      setCurrentWave((currentWave + 1) % max);
      setNewWave(mouse.x, mouse.y, currentWave);
    }

    // planesRef.current.position.set(
    //   mouse.x * size.width,
    //   mouse.y * size.height,
    //   0
    // );

    setPrevMouse(mouse);

    planesRef.current.children.forEach((mesh) => {
      mesh.rotation.z += 0.02;
      mesh.material.opacity *= 0.98;
      mesh.scale.x = 0.98 * mesh.scale.x + 0.1;
    });

    // planesRef.current.children.forEach((child) => {
    //   child.visible = false;
    // });
  });

  return (
    <group ref={planesRef}>
      {[...Array(max)].map((mesh, i) => {
        return (
          <mesh
            material={material}
            geometry={plane}
            key={i}
            // rotation-z={2 * Math.PI * Math.random()}
            visible={false}
          />
        );
      })}
    </group>
  );
};

export default Experience;
