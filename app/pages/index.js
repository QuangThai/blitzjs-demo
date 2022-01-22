import { Suspense, useEffect, useState } from "react"
import { Image, Link, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import Brands from "app/components/Brands"
import MoviesCollection from "app/components/MoviesCollection"
import Header from "app/components/Header"
import Slider from "app/components/Slider"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home = () => {
  const [popularMoviesRes, setPopularMoviesRes] = useState([])
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=19bed41eecf289253751312a444bfc69&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((res) => setPopularMoviesRes(res.results))
  }, [])
  return (
    <Suspense fallback="loading">
      <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
        <Header />
        <Slider />
        <Brands />
        <MoviesCollection title="Popular Movies" results={popularMoviesRes} />
        <MoviesCollection title="Popular Shows" results={popularMoviesRes} />
        <MoviesCollection title="Top Rated Movies" results={popularMoviesRes} />
        <MoviesCollection title="Top Rated Shows" results={popularMoviesRes} />
      </main>
    </Suspense>
  )
}

export async function getServerSideProps() {
  const [popularMoviesRes, popularShowsRes, top_ratedMoviesRes, top_ratedShowsRes] =
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=19bed41eecf289253751312a444bfc69&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=19bed41eecf289253751312a444bfc69&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=19bed41eecf289253751312a444bfc69&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=19bed41eecf289253751312a444bfc69&language=en-US&page=1`
      ),
    ])
  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] = await Promise.all([
    popularMoviesRes.json(),
    popularShowsRes.json(),
    top_ratedMoviesRes.json(),
    top_ratedShowsRes.json(),
  ])

  return {
    props: {
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  }
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
