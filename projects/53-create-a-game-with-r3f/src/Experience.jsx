import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { Level } from "./Level.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.js";
import Effects from "./Effects.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["#252731"]} attach="background" />
      <Perf position="top-left" />
      {/* <OrbitControls makeDefault /> */}
      <Physics>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
      <Effects />
    </>
  );
}
