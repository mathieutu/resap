// eslint-disable-next-line no-restricted-exports
export { default, getStaticProps } from './index'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
