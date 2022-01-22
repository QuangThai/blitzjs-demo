import { HomeIcon, SearchIcon, PlusIcon, StarIcon } from "@heroicons/react/solid"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Image, Link, Routes, useMutation } from "blitz"
import { Suspense } from "react"

function Header() {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  return (
    <Suspense fallback="Loading">
      <header className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-10 md:px-12 h-[72px]">
        <Image src="/images/logo.svg" alt="" className="cursor-pointer" width={80} height={80} />
        {currentUser?.id && (
          <>
            <div className="hidden ml-10 md:flex items-center space-x-6">
              <a className="header-link group">
                <HomeIcon className="h-4" />
                <span className="span">Home</span>
              </a>
              <a className="header-link group">
                <SearchIcon className="h-4" />
                <span className="span">Search</span>
              </a>
              <a className="header-link group">
                <PlusIcon className="h-4" />
                <span className="span">Watchlist</span>
              </a>
              <a className="header-link group">
                <StarIcon className="h-4" />
                <span className="span">Originals</span>
              </a>
              <a className="header-link group">
                <Image src="/images/movie-icon.svg" alt="image" width={20} height={20} />
                <span className="span">Movies</span>
              </a>
              <a className="header-link group">
                <Image src="/images/series-icon.svg" alt="image" width={20} height={20} />
                <span className="span">Series</span>
              </a>
            </div>
          </>
        )}
        <div className="ml-auto">
          {!currentUser?.id ? (
            <Link href={Routes.LoginPage()}>
              <a className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200">
                Login
              </a>
            </Link>
          ) : (
            <Image
              className="ml-auto h-12 w-12 rounded-full object-cover cursor-pointer"
              alt="image"
              src="data:image/jpeg;base64,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"
              width={48}
              height={48}
              onClick={async () => await logoutMutation()}
            />
          )}
        </div>
      </header>
    </Suspense>
  )
}

export default Header
