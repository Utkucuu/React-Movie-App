import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Hud, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { TextureLoader } from "three"; // TextureLoader ekleyin
import { useMediaQuery } from "react-responsive";
export default function CubeCanvas({ textTures }) {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <Viewcube textTure={textTures} />
      {/* OrbitControls bileşenini ekleyin */}
    </Canvas>
  );
}

function Viewcube({
  renderPriority = 1,
  matrix = new THREE.Matrix4(),
  textTure,
}) {
  const mesh = useRef(null);
  const { camera } = useThree();
  const mobilM = useMediaQuery({ minWidth: 280, maxWidth: 425 });
  const mobilL = useMediaQuery({ minWidth: 425, maxWidth: 600 });
  const MobilL2 = useMediaQuery({ minWidth: 600, maxWidth: 768 });
  const tablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const laptop = useMediaQuery({ minWidth: 1024, maxWidth: 1280 });
  const laptopL = useMediaQuery({ minWidth: 1280 });
  let arg = 160;
  if (laptopL) {
    arg = 160;
  } else if (laptop) {
    arg = 140;
  } else if (tablet) {
    arg = 100;
  } else if (MobilL2) {
    arg = 60;
  } else if (mobilL) {
    arg = 50;
  } else if (mobilM) {
    arg = 40;
  }

  useFrame(() => {
    // Spin mesh to the inverse of the default cameras matrix
    matrix.copy(camera.matrix).invert();
    // mesh.current.quaternion.setFromRotationMatrix(matrix);
    // Küpün y ekseninde dönmesini sağlayan satır
    mesh.current.rotation.y += Math.PI / 360; // Her karede yarım derece döner
    mesh.current.rotation.x += Math.PI / 360; // Her karede yarım derece döner
  });

  // TextureLoader kullanarak resimleri yükle
  const textureLoader = new TextureLoader();

  // const trendDaily = state?.trendDaily?.data?.results || [];
  const textures = textTure
    ? textTure.map((imageSrc) => textureLoader.load(imageSrc))
    : [];

  return (
    <Hud renderPriority={renderPriority}>
      <OrthographicCamera makeDefault position={[100, 100, 100]} />
      <mesh ref={mesh}>
        {textures.map((texture, index) => (
          <meshLambertMaterial
            attach={`material-${index}`}
            key={index}
            map={texture}
          />
        ))}
        <boxGeometry args={[arg, arg, arg]} />
        <OrbitControls enableZoom={false} />
      </mesh>
      <ambientLight intensity={2} />
      <pointLight position={[200, 200, 100]} intensity={0.5} />
    </Hud>
  );
}
