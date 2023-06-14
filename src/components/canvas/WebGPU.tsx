import * as React from "react";
import * as THREE from "three";
// @ts-ignore
import WebGPUCapabilities from "three/examples/jsm/capabilities/WebGPU";
// @ts-ignore
import WebGPURenderer from "three/examples/jsm/renderers/webgpu/WebGPURenderer";
import { Canvas, useThree } from "@react-three/fiber";

export function WebGPU(props: React.PropsWithChildren<any>) {
  if (!WebGPUCapabilities.isAvailable()) {
    return <h1 className={"no-support"}>WebGPU not supported</h1>;
  }

  return (
    <Canvas
      gl={(canvas) => {
        const r = new WebGPURenderer({ canvas });
        r.setClearColor(0x000000, 0);
        return r;
      }}
      {...props}
    />
  );
}
