import { useBox } from "@react-three/cannon"

function ObstacleBox(props) {
    const [ref, api] = useBox(() => ({
      rotation: [0, 0, 0], ...props, onCollide: () => {

      }
    }))

    if (props.isGround === true) {
      return (
        <mesh ref={ref} name={"ground1"} visible={true} >
          <boxGeometry args={props.args} />
          <meshStandardMaterial color="orange" />
        </mesh>

      )
    }
    else if (props.isStair === true) {
      return (
        <mesh ref={ref} name={"stair"} visible={true}   >
          <boxGeometry args={props.args} />
          <meshStandardMaterial color="orange" />
        </mesh>

      )
    }
    else {
      return (
        <mesh ref={ref} visible={true}   >
          <boxGeometry args={props.args} />
          <meshStandardMaterial color="orange" />
        </mesh>
      )
    }
  }

  export default ObstacleBox;