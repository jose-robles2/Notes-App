import React from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth} from '@supabase/auth-ui-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Startup from "../components/Startup"

// Initialize Supabase API
const supabase = createClient(
  "https://pmadqifjmhkmfgvjpvri.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtYWRxaWZqbWhrbWZndmpwdnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2ODE0MjUsImV4cCI6MTk4NTI1NzQyNX0.bdb_acXVLny-zmX6JE3qwPDnClUvxr1TObCNFeukxSo"
)


function Success() {
  const [user, setUser] = useState({})  // Create a useState for user
  const navigate = useNavigate()        // Use the navigate hook for routin

  // Lets us run code when the user gets redirected
  useEffect(() => {
    async function getUserData() {
        await supabase.auth.getUser().then((value) => {
            // Set the user if there is one
            if (value.data?.user) {
                console.log(value.data.user)
                setUser(value.data.user)
            }
        })
    }
    getUserData()
  }, [])

  async function signOutUser() {
    const {error} = await supabase.auth.signOut()
    navigate("/")
  } 

  return (
    <div>
        {/* Prevent user from going to "/success" URL without being signed in  */}
        { Object.keys(user).length !== 0 ? 
            <> <Startup signOutUser = {signOutUser} /> </>
            : 
            <>
              <h1>User is not logged in</h1>
              <button onClick={() => {navigate("/")}}>Go back home</button>
            </>
        } 
    </div>
  )
}

export default Success