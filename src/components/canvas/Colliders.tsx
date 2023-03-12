import { useBox, useSphere } from "@react-three/cannon"

// Box Collider
export function BoxCollider(props) {
    const [ref, api] = useBox(() => ({
      rotation: [0, 0, 0], ...props, onCollide: () => {

      }
    }))

    if (props.isGround === true) {
      return (
        // @ts-ignore
        <mesh ref={ref} name={"ground1"} visible={props.visible}>
          <boxGeometry args={props.args} />
          <meshStandardMaterial color="orange" />
        </mesh>

      )
    }
    else if (props.isStair === true) {
      return (
        // @ts-ignore
        <mesh ref={ref} name={"stair"} visible={props.visible}>
          <boxGeometry args={props.args} />
          <meshStandardMaterial color="orange" />
        </mesh>

      )
    }
    else {
      return (
        // @ts-ignore
        <mesh ref={ref} visible={props.visible}>
          <boxGeometry args={props.args} />
          <meshStandardMaterial color="orange" />
        </mesh>
      )
    }
  }

  export function SphereCollider(props) {
        const [ref, api] = useSphere(() => ({
          mass: 0.5,
          type: props.type,
          args: props.args,
          rotation: props.rotation, ...props, onCollide: () => {
            console.log("충돌: sphere collider")
          }
    }))

    return (
        // @ts-ignore
      <mesh ref={ref} visible={props.visible}>
        <sphereGeometry args={props.args} />
        <meshStandardMaterial color="red" />
      </mesh>
    )
  }

