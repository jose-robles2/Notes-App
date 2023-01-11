import React from 'react'
import {createClient} from '@supabase/supabase-js'
import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import { useNavigate } from 'react-router-dom'

// Initialize the supabase API
const supabase = createClient(
  "https://pmadqifjmhkmfgvjpvri.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtYWRxaWZqbWhrbWZndmpwdnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2ODE0MjUsImV4cCI6MTk4NTI1NzQyNX0.bdb_acXVLny-zmX6JE3qwPDnClUvxr1TObCNFeukxSo"
)

// Log the user in. If they are not signed out, we navigate them to '/success', else they stay
function Login() {
  const navigate = useNavigate(); 

  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      // forward to success url
      navigate("/success")
    } else {
        // forward to localhost:3000
        navigate("/")
    }
  })

  // Create the supabase Auth component -> renders a login page
  // Make google a provider to allow the option for users to login with google
  return (
    <div className='supabaseAuth'>
        <Auth 
          supabaseClient={supabase}
          appearance={{theme: ThemeSupa}}
          theme='dark'
          providers = {["google"]}
        />
    </div>
  )
}

export default Login