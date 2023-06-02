import {
  Center,
  useTexture,
  OrbitControls,
  useGLTF,
  Sparkles,
  shaderMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");

  //   console.log(nodes)
  const bakedTexture = useTexture("./model/baked.jpg");
  bakedTexture.flipY = false;

  const portalMaterial = useRef();
  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta * 3;
  });

  return (
    <>
      <color args={["#030202"]} attach="background" />

      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        {/* Light A */}
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        {/* Light B */}
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        {/* Portal */}
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          {/* <shaderMaterial
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uColorStart: { value: new THREE.Color("#ffffff") },
              uColorEnd: { value: new THREE.Color("#000000") },
            }}
          /> */}
          <portalMaterial ref={portalMaterial} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.4}
          count={50}
        />
      </Center>
    </>
  );
}
