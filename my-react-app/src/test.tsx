
function App() {

  return (
    <>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div id="g_id_onload"
        data-client_id="987519151644-vb805kd9gft7aotnm41de4lavvh5opdh.apps.googleusercontent.com"
        data-login_uri="http://localhost:5173/auth/google"
        data-auto_prompt="false">
       </div>

      <div className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="signin_with"
        data-shape="rectangular"
        data-logo_alignment="left">
      </div>
    </>
  )
}

export default App
