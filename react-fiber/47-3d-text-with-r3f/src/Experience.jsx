import {
  useMatcapTexture,
  Center,
  OrbitControls,
  Text3D,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useEffect, useRef } from "react";
// import { useState } from "react";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const donuts = useRef([]);
  // const donutsGroup = useRef();
  //   const [torusGeometry, setTorusGeometry] = useState();
  //   const [material, setMaterial] = useState();
  const [matcapTexture] = useMatcapTexture("2E763A_78A0B7_B3D1CF_14F209", 256);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    material.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  // Adding rotation to the donuts using ref+ useFrame
  // useFrame((state, delta) => {
  //   // for (const donut of donutsGroup.current.children) {
  //   //   donut.rotation.y += delta * 0.4;
  //   }
  // });

  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.3;
    }
  });

  // Adding rotation end

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          material={material}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello R3F
          {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
        </Text3D>
      </Center>

      {/* <group ref={donutsGroup}> */}
      {[...Array(100)].map((value, index) => (
        <mesh
          ref={(element) => (donuts.current[index] = element)}
          key={index}
          geometry={torusGeometry}
          material={material}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
      {/* </group> */}
    </>
  );
}
