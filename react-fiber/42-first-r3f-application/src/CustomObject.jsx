import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";

export default function CustomObject() {
  const geometryRef = useRef();

  // 10 triangles, 3 vertices per triangle
  const verticesCount = 10 * 3;
  const positions = useMemo(() => {
    // added on * 3 more because x,y,z coordinates...3 values per vertex
    const positions = new Float32Array(verticesCount * 3);
    for (let i = 0; i < verticesCount * 3; i++)
      // subtract the 0.5 to make the coordinates negative and positive coordinates * 3 to make it bigger.
      positions[i] = (Math.random() - 0.5) * 3;

    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          ref={geometryRef}
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
    </mesh>
  );
}
