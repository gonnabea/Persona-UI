declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>
  export const src: string
  export default content
}
