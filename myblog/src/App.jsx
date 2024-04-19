import { useEffect, useState } from "react";
import { login, logout } from "./store/authSlice";
import authservice from "./appwrite/auth";
import { useDispatch } from "react-redux"
import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authservice.getCurrentUser()
      .then((userData) => { //we can use any parameter.
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])



  return !loading ? (
    <>
      <nav className="f sticky-top" >
        <Header />
      </nav>
      <main className="bg-dark">
        <Outlet />
      </main>
      <footer className="bg-dark text-secondary" >
        <Footer />
      </footer>
    </>
  )
    : null


}

export default App;
