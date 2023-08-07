import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d; /* 이것을 설정해 주어야 rotate를 했을 때 3d의 형태로 보인다. */
  animation: rotateBox 3s linear infinite;
  @keyframes rotateBox {
    from {
      transform: rotateX(0deg) rotateY(0deg);
    }
    to {
      transform: rotateX(360deg) rotateY(360deg);
    }
  }
  :hover {
  }
`

const Front = styled.div`
  border: solid 2px black;
  background-color: ${(props) => (props.frontBg ? props.frontBg : props.bgColorAll)};
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  position: absolute;
  transform: translateZ(calc(${(props) => props.width} / 2)); /* 앞쪽으로 당김  */
`

const Back = styled.div`
  border: solid 2px black;
  background-color: ${(props) => (props.backBg ? props.backBg : props.bgColorAll)};
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  position: absolute;
  transform: translateZ(calc(${(props) => props.width} / -2)) scaleX(-1); /* scaleX: 글자 좌우 반전 */
`

const Bottom = styled.div`
  border: solid 2px black;
  background-color: ${(props) => (props.bottomBg ? props.bottomBg : props.bgColorAll)};
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  position: absolute;
  transform: rotateX(90deg) scaleY(-1); /* scaleY: 글자 상하 반전 */
  bottom: 0;
`

const Top = styled.div`
  border: solid 2px black;
  background-color: ${(props) => (props.topBg ? props.topBg : props.bgColorAll)};
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  position: absolute;
  transform: rotateX(90deg);
  top: 0;
`

const Left = styled.div`
  border: solid 2px black;
  background-color: ${(props) => (props.leftBg ? props.leftBg : props.bgColorAll)};
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  position: absolute;
  transform: rotateY(90deg) translateZ(calc(${(props) => props.width} / -2)) scaleX(-1);
`

const Right = styled.div`
  border: solid 2px black;
  background-color: ${(props) => (props.rightBg ? props.rightBg : props.bgColorAll)};
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  position: absolute;
  transform: rotateY(-90deg) translateZ(calc(${(props) => props.width} / -2)) scaleX(-1);
`

const Cube = ({
  width,
  front,
  back,
  bottom,
  top,
  left,
  right,
  frontBg,
  leftBg,
  backBg,
  bottomBg,
  topBg,
  rightBg,
  bgColorAll,
}) => {
  // console.log(width);

  return (
    <Container width={width}>
      <Front width={width} frontBg={frontBg} bgColorAll={bgColorAll || 'black'}>
        {front}
      </Front>
      <Back width={width} backBg={backBg} bgColorAll={bgColorAll || 'black'}>
        {back}
      </Back>
      <Bottom width={width} bottomBg={bottomBg} bgColorAll={bgColorAll || 'black'}>
        {bottom}
      </Bottom>
      <Top width={width} topBg={topBg} bgColorAll={bgColorAll || 'black'}>
        {top}
      </Top>
      <Left width={width} leftBg={leftBg} bgColorAll={bgColorAll || 'black'}>
        {left}
      </Left>
      <Right width={width} rightBg={rightBg} bgColorAll={bgColorAll || 'black'}>
        {right}
      </Right>
    </Container>
  )
}

Cube.propTypes = {
  width: PropTypes.string,
  front: PropTypes.element,
  back: PropTypes.element,
  bottom: PropTypes.element,
  top: PropTypes.element,
  left: PropTypes.element,
  right: PropTypes.element,
  frontBg: PropTypes.string,
  leftBg: PropTypes.string,
  backBg: PropTypes.string,
  bottomBg: PropTypes.string,
  topBg: PropTypes.string,
  rightBg: PropTypes.string,
  bgColorAll: PropTypes.string,
}

export default Cube

// 사용 시 부모 태그로 감싸 주어 위치를 조정해야함
