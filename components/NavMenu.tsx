import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import MobileMenuButtons from './MobileMenuButtons'
import ThemeButton from './ThemeButton'
import { useNavLinkContext } from './NavLinkProvider'

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobileScreen = useMediaQuery({ query: '(max-width: 640px)' })
  const router = useRouter()

  useEffect(() => {
    function handleRouteChange() {
      setIsMenuOpen(false)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const handleMediaQueryChange = function (matches: boolean) {
    if (matches) {
      setIsMenuOpen(false)
    }
  }

  useMediaQuery({ maxWidth: 640 }, undefined, handleMediaQueryChange)

  useEffect(() => {
    if (!isMobileScreen) {
      setIsMenuOpen(true)
    }
  }, [isMobileScreen, isMenuOpen])

  return (
    <nav className='absolute inset-x-0 top-0 mx-auto max-w-2xl bg-zinc-100 py-8 text-lg dark:bg-zinc-900'>
      <div
        className={`${
          isMobileScreen && isMenuOpen ? 'pb-3' : ''
        } flex w-full items-center justify-between px-6`}
      >
        <MobileMenuButtons
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        {isMobileScreen ? <ThemeButton /> : null}
      </div>
      {isMenuOpen ? (
        <div className='flex w-full items-start justify-between px-6'>
          <div className='flex w-full items-start gap-x-8 gap-y-3 max-sm:flex-col sm:items-center'>
            <NavItem
              href='/'
              text='Home'
              router={router}
              isMobileScreen={isMobileScreen}
              isPage
            />
            <NavItem
              href='/guestbook'
              text='Guestbook'
              router={router}
              isMobileScreen={isMobileScreen}
              isPage
            />
            <NavItem
              href='/projects'
              text='Projects'
              router={router}
              isMobileScreen={isMobileScreen}
              isPage
            />
            <NavItem
              href='/resume.pdf'
              text='Resume'
              router={router}
              isMobileScreen={isMobileScreen}
              handleClick={() => setIsMenuOpen(false)}
            />
          </div>
          {isMobileScreen ? null : <ThemeButton />}
        </div>
      ) : null}
    </nav>
  )
}

interface NavItemProps {
  href: string
  text: string
  router: any
  isMobileScreen: Boolean
  isPage?: Boolean
  handleClick?: () => void
}

function NavItem({
  href,
  text,
  router,
  isMobileScreen,
  isPage,
  handleClick,
}: NavItemProps) {
  const navLinkColors = useNavLinkContext()
  const isActive = router.asPath === href
  const classNames = `
    ${
      isMobileScreen
        ? 'w-full border-b border-zinc-700 font-semibold text-black dark:text-white'
        : isActive
        ? 'text-black dark:text-white'
        : navLinkColors
    }
    max-sm:py-3 sm:w-fit
  `

  return (
    <>
      {isPage ? (
        <Link className={classNames} href={href}>
          {text}
        </Link>
      ) : (
        <a
          href={href}
          className={classNames}
          target='_blank'
          rel='noreferrer noopener'
          onClick={handleClick}
        >
          {text}
        </a>
      )}
    </>
  )
}
