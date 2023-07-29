import { OrbitControls, Preload, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import Loader from "../Loader"

const Computers = ({ isMobile }: { isMobile: boolean}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf")

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black"/>
      <pointLight intensity={1} />
      <directionalLight
        position={[-20, 50, 10]}
        intensity={6.5}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      <primitive 
        object={computer.scene}
        scale={isMobile? 0.67 : 0.72}
        position={[0, -3.25, -1.5]}
        rotation={[-0.01,-0.2,-0.1]}
      />
    </mesh>
  )
}

const ComputerCanvas = () => {
  const [isMobile, setisMobile] = useState(false);

  useEffect(() => {
    const MediaQuery = window.matchMedia('(max-width: 500px)');
    setisMobile(MediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setisMobile(event.matches)
    }

    MediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => MediaQuery.removeEventListener('change', handleMediaQueryChange)
  }, [])
  

  return (
    <Canvas
      frameloop="demand"
      shadows={true}
      camera={{position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputerCanvas