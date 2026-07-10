import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`;

const fragmentShader = `
precision highp float;
uniform float u_time; uniform vec2 u_resolution; uniform vec2 u_mouse; uniform float u_scrollSpeed;
varying vec2 vUv;
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy)); vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5); vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p) {
  float value = 0.0, amplitude = 0.5, frequency = 1.0;
  for (int i = 0; i < 5; i++) { value += amplitude * snoise(p * frequency); frequency *= 2.0; amplitude *= 0.5; }
  return value;
}
vec3 auroraLine(vec2 uv, float t, float yOffset, float speed, float freq, float amp, vec3 color, float intensity) {
  float x = uv.x + t * speed * 0.2;
  float n1 = fbm(vec2(x * freq, yOffset + t * 0.1));
  float n2 = fbm(vec2(x * freq * 1.5 + 5.0, yOffset + t * 0.15 + 3.0));
  float noise = n1 * 0.6 + n2 * 0.4;
  float wave = sin(x * 3.14159 + noise * 2.0 + t * speed) * amp;
  wave += sin(x * 7.0 + noise * 3.0 + t * speed * 1.3) * amp * 0.3;
  float dist = abs(uv.y - (wave + yOffset));
  float lineGlow = exp(-dist * 15.0) * intensity;
  float bloom = exp(-dist * 5.0) * intensity * 0.4;
  float mouseInfluence = 1.0 + 0.3 * exp(-distance(uv, u_mouse) * 4.0);
  lineGlow *= mouseInfluence; bloom *= mouseInfluence;
  return color * lineGlow + color * bloom * 0.5;
}
void main() {
  vec2 uv = vUv; uv.x *= u_resolution.x / u_resolution.y;
  float t = u_time * 0.3, scrollAmp = 0.8 + u_scrollSpeed * 1.5; vec3 col = vec3(0.0);
  vec3 bgTop = vec3(0.02, 0.02, 0.03), bgBottom = vec3(0.04, 0.02, 0.01);
  vec3 background = mix(bgBottom, bgTop, uv.y);
  float bgStars = fbm(vec2(uv.x * 3.0, uv.y * 3.0 + t * 0.05));
  bgStars = smoothstep(0.4, 0.6, bgStars); bgStars = pow(bgStars, 3.0) * 0.3;
  background += vec3(0.02, 0.02, 0.02) * bgStars; col = background;
  col += auroraLine(uv, t, 0.1, 0.5, 1.0, 0.15 * scrollAmp, vec3(0.0, 0.9, 1.0), 0.8);
  col += auroraLine(uv, t * 0.8 + 2.0, -0.05, 0.3, 1.2, 0.12 * scrollAmp, vec3(1.0, 0.72, 0.3), 0.7);
  col += auroraLine(uv, t * 1.2 + 4.0, 0.2, 0.7, 0.8, 0.18 * scrollAmp, vec3(1.0, 0.3, 0.14), 0.9);
  col += auroraLine(uv, t * 0.6 + 1.0, 0.35, 0.4, 1.5, 0.1 * scrollAmp, vec3(0.6, 0.9, 1.0), 0.6);
  vec2 vigUV = vUv - 0.5; float vig = 1.0 - dot(vigUV, vigUV) * 1.5;
  vig = clamp(vig, 0.0, 1.0); col *= vig;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

function AuroraMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    u_time: { value: 0 }, u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) }, u_scrollSpeed: { value: 0 },
  }), []);

  useEffect(() => { uniforms.u_resolution.value.set(size.width, size.height); }, [size, uniforms]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.set((e.clientX / window.innerWidth) * (size.width / size.height), 1.0 - e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.u_time.value = state.clock.elapsedTime;
    mat.uniforms.u_mouse.value.lerp(mouseRef.current, 0.05);
    mat.uniforms.u_scrollSpeed.value = 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} depthWrite={false} depthTest={false} />
    </mesh>
  );
}

export const LuminousAurora: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <div className="fixed inset-0 z-0" style={{ opacity }}>
    <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: false }} style={{ width: '100%', height: '100%' }}>
      <AuroraMesh />
    </Canvas>
  </div>
);