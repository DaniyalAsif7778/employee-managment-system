import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'

type MenueContextValue = {
  dashBoardDrawer: boolean
  headerDrawer: boolean
  setDashBoardStatus: (open: boolean) => void
  setHeaderDrawwer: (open: boolean) => void
  toggleDashBoardDrawer: () => void
  toggleHeaderDrawer: () => void
}

const MenueContext = createContext<MenueContextValue | null>(null)

type MenueProviderProps = {
  children: ReactNode
}

export function MenueProvider({ children }: MenueProviderProps): ReactElement {
  const [dashBoardDrawer, setDashBoardDrawer] = useState(false)
  const [headerDrawer, setHeaderDrawer] = useState(false)

  const setDashBoardStatus = useCallback((open: boolean) => {
    setDashBoardDrawer(open)
  }, [])

  const setHeaderDrawwer = useCallback((open: boolean) => {
    setHeaderDrawer(open)
  }, [])

  const toggleDashBoardDrawer = useCallback(() => {
    setDashBoardDrawer((open) => !open)
  }, [])

  const toggleHeaderDrawer = useCallback(() => {
    setHeaderDrawer((open) => !open)
  }, [])

  const value = useMemo<MenueContextValue>(
    () => ({
      dashBoardDrawer,
      headerDrawer,
      setDashBoardStatus,
      setHeaderDrawwer,
      toggleDashBoardDrawer,
      toggleHeaderDrawer,
    }),
    [
      dashBoardDrawer,
      headerDrawer,
      setDashBoardStatus,
      setHeaderDrawwer,
      toggleDashBoardDrawer,
      toggleHeaderDrawer,
    ]
  )

  return <MenueContext.Provider value={value}>{children}</MenueContext.Provider>
}

export default function useMenue(): MenueContextValue {
  const context = useContext(MenueContext)

  if (!context) {
    throw new Error('useMenue must be used within MenueProvider')
  }

  return context
}
