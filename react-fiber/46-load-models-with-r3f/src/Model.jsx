import { useGLTF, Clone } from "@react-three/drei";

export default function Model() {
  const model = useGLTF("./hamburger-draco.glb");

  return (
    <>
      <Clone
        object={model.scene}
        scale={0.35}
        position-y={-1}
        position-x={-4}
      />
      <Clone object={model.scene} scale={0.35} position-y={-1} position-x={0} />
      <Clone object={model.scene} scale={0.35} position-y={-1} position-x={4} />
    </>
  );
}

useGLTF.preload("./hamburger-draco.glb");
