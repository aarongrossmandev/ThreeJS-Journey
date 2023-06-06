import { useGLTF, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  Physics,
  CylinderCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useMemo, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
  const [hitSound] = useState(() => new Audio("./hit.mp3"));
  const cube = useRef();
  const twister = useRef();

  const cubeJump = () => {
    const mass = cube.current.mass();

    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  const collisionEnter = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  };

  const hamburger = useGLTF("./hamburger.glb");

  const cubesCount = 10;
  const cubes = useRef();

  const cubesTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];

    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ]);
      rotations.push([Math.random(), Math.random(), Math.random()]);
      const scale = 0.2 + Math.random() * 0.8;
      scales.push([scale, scale, scale]);
    }

    return { positions, rotations, scales };
  }, []);

  //   useEffect(() => {
  //     for (let i = 0; i < cubesCount; i++) {
  //       const matrix = new THREE.Matrix4();
  //       matrix.compose(
  //         new THREE.Vector3(i * 2, 0, 0),
  //         new THREE.Quaternion(),
  //         new THREE.Vector3(1, 1, 1)
  //       );
  //       cubes.current.setMatrixAt(i, matrix);
  //     }
  //   }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.807, 0]}>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* trimesh is fine for stationary objects, but not dynamic ones, use custom for dynamic */}
        {/* <RigidBody colliders="trimesh">
          <mesh
            castShadow
            position={[0, 1, 0]}
            rotation={[Math.PI * 0.5, 0, 0]}
          >
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="cyan" />
          </mesh>
        </RigidBody> */}

        {/* Custom Collider */}
        {/* <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
        > */}
        {/* [hx:number, hy:number, hz:number], value of the half extent */}
        {/* hx: half width, hy: half height, hz: half depth */}
        {/* <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider
            args={[0.25, 1, 0.25]}
            position={[0, 0, 1]}
            rotation={[-Math.PI * 0.35, 0, 0]}
          /> */}
        {/* <BallCollider args={[1.5]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="cyan" />
          </mesh>
        </RigidBody> */}

        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          gravityScale={1}
          restitution={0}
          //   base friction value is 0.7
          friction={0.7}
          colliders={false}
          onCollisionEnter={collisionEnter}
          //   onCollisionExit={() => {
          //     console.log("exit");
          //   }}
          //   onSleep={() => {
          //     console.log("sleep");
          //   }}
          //   onWake={() => {
          //     console.log("wake");
          //   }}
        >
          {/* Have to provide custom colliders in order to change an objects mass */}
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="cyan" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" restitution={0} friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={twister}
          friction={0}
          position={[0, -0.8, 0]}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.25, 1.25]} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        <InstancedRigidBodies
          positions={cubesTransforms.positions}
          rotations={cubesTransforms.rotations}
          scales={cubesTransforms.scales}
        >
          <instancedMesh
            castShadow
            ref={cubes}
            receiveShadow
            args={[null, null, cubesCount]}
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
