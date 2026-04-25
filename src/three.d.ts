declare module 'three' {
  export class Clock {
    getElapsedTime(): number;
  }

  export class Mesh {
    constructor(geometry?: unknown, material?: unknown);
  }

  export class OrthographicCamera {
    position: { z: number };
    constructor(left: number, right: number, top: number, bottom: number, near: number, far: number);
  }

  export class PlaneGeometry {
    constructor(width: number, height: number);
    dispose(): void;
  }

  export class Scene {
    add(object: unknown): void;
  }

  export class ShaderMaterial {
    constructor(parameters: Record<string, unknown>);
    dispose(): void;
  }

  export class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    copy(vector: Vector2): this;
    lerp(vector: Vector2, alpha: number): this;
    set(x: number, y: number): this;
  }

  export class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
  }

  export class WebGLRenderer {
    domElement: HTMLCanvasElement;
    constructor(parameters?: Record<string, unknown>);
    dispose(): void;
    forceContextLoss(): void;
    getPixelRatio(): number;
    render(scene: Scene, camera: OrthographicCamera): void;
    setPixelRatio(value: number): void;
    setSize(width: number, height: number, updateStyle?: boolean): void;
  }
}
