import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import Dim from './Dim'
import Container from './Container'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

interface ModalProps {
  toggle: () => void
  active: boolean
  containerClassName?: string
  headerChildren?: JSX.Element
  bodyChildren: JSX.Element
  footerChildren?: JSX.Element
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

const Modal = ({
  containerClassName,
  headerChildren,
  bodyChildren,
  footerChildren,
  headerClassName,
  bodyClassName,
  footerClassName,
  toggle,
  active,
}: ModalProps) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    ref.current = document.body
    setMounted(true)
  }, [])

  if (mounted && ref.current && active) {
    return createPortal(
      <Dim>
        <Container className={containerClassName}>
          <Header toggle={toggle} className={headerClassName}>
            {headerChildren}
          </Header>
          <Body className={bodyClassName}>{bodyChildren}</Body>
          {footerChildren ? <Footer className={footerClassName}>{footerChildren}</Footer> : ''}
        </Container>
      </Dim>,
      ref.current,
    )
  }

  return null
}

const ModalWithoutDim = ({
  containerClassName,
  headerChildren,
  bodyChildren,
  footerChildren,
  headerClassName,
  bodyClassName,
  footerClassName,
  toggle,
  active,
}: ModalProps) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    ref.current = document.body
    setMounted(true)
  }, [])

  if (mounted && ref.current && active) {
    return createPortal(
      <Container className={`w-auto h-auto ${containerClassName}`}>
        <Header toggle={toggle} className={headerClassName}>
          {headerChildren}
        </Header>
        <Body className={bodyClassName}>{bodyChildren}</Body>
        {footerChildren ? <Footer className={footerClassName}>{footerChildren}</Footer> : ''}
      </Container>,
      ref.current,
    )
  }

  return null
}

export { Container as ModalContainer, Header as ModalHeader, Body as ModalBody, Footer as ModalFooter, ModalWithoutDim }

export default Modal
