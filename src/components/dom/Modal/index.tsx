import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Dim from './Dim'
import Header from './Header'
import Body from './Body'
import Container from './Container'

interface ModalProps {
  toggle: () => void
  active: boolean
  headerChildren?: JSX.Element
  bodyChildren: JSX.Element
}

const Modal = ({ headerChildren, bodyChildren, toggle, active }: ModalProps) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    ref.current = document.body
    setMounted(true)
  }, [])

  if (mounted && ref.current && active) {
    return createPortal(
      <Dim>
        <Container>
          <Header toggle={toggle}>{headerChildren}</Header>
          <Body>{bodyChildren}</Body>
        </Container>
      </Dim>,
      ref.current,
    )
  }

  return null
}

export { Header as ModalHeader, Body as ModalBody }

export default Modal
