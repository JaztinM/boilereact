import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const NotificationProvider = ({ children }: Props) => {
  return <>{children}</>
}
