import { ReactNode, Suspense } from 'react'

type Props = {
  children: ReactNode
}

export function App({ children }: Props) {
  return <Suspense fallback='Loading...'>{children}</Suspense>
}
