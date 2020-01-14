<script>
  import { auth, authUserObservable, getEmailByUsername } from "../firebase.js";

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let loggingInFlag = false;
  let loginInputUsername = "";
  let loginInputPassword = "";
  let loginInputErrorMsg = null;

  function loginAction() {
    loggingInFlag = true;
    loginInputErrorMsg = null;

    loginInputUsername = loginInputUsername.trim();

    if (emailRegex.test(loginInputUsername)) {
      auth
        .signInWithEmailAndPassword(loginInputUsername, loginInputPassword)
        .catch(error => {
          loggingInFlag = false;
          loginInputErrorMsg = error;
        });
    } else {
      getEmailByUsername({ username: loginInputUsername })
        .then(result => {
          if (result.data.email) {
            auth
              .signInWithEmailAndPassword(result.data.email, loginInputPassword)
              .catch(error => {
                loggingInFlag = false;
                loginInputErrorMsg = error;
              });
          } else {
            loggingInFlag = false;
            loginInputErrorMsg =
              "Unable to sign in. Please contact staff for assistance. \n(Error Detail: email field in user document is null)";
          }
        })
        .catch(error => {
          console.error(error);
          loggingInFlag = false;
          loginInputErrorMsg = error;
        });
    }
  }
</script>

<style>
  .bg-loginbgimage {
    background-image: url("images/loginbg.jpg");
    background-position: center;
    background-size: cover;
  }

  .box-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
</style>

<div class="box-container min-h-screen max-w-full bg-loginbgimage">
  <h1
    class="font-hairline antialiased text-gray-100 text-3xl sm:text-5xl
    font-sans my-4">
    Welcome
  </h1>

  <img class="w-40 sm:w-64" src="/images/issflogo.png" alt="16th ISSF Logo" />

  <form class="w-full max-w-sm py-6 px-6">
    {#if loginInputErrorMsg}
      <h3 class="text-red-300 text-xs italic pb-4">
        An error has occured: {loginInputErrorMsg.code}
        <br />
        {loginInputErrorMsg.message}
      </h3>
    {/if}

    <div class="mb-4">
      <input
        bind:value={loginInputUsername}
        required
        type="text"
        id="loginInputUsername"
        class="bg-gray-700 shadow appearance-none w-full py-2 px-3 text-gray-300
        leading-tight focus:outline-none focus:shadow-outline"
        placeholder="username"
        style="border-radius: 17px" />
    </div>

    <div class="mb-4">
      <input
        bind:value={loginInputPassword}
        required
        type="password"
        id="loginInputPassword"
        class="bg-gray-700 shadow appearance-none w-full py-2 px-3 text-gray-300
        leading-tight focus:outline-none focus:shadow-outline"
        placeholder="passcode"
        style="border-radius: 17px;" />
    </div>
    <center>
      {#if loggingInFlag}
        <button
          disabled="true"
          type="submit"
          class="bg-gray-600 text-white font-bold py-2 px-4 focus:outline-none
          focus:shadow-outline"
          style="border-radius: 17px;">
          Logging In
        </button>
      {:else}
        <button
          on:click={loginAction}
          type="submit"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4
          focus:outline-none focus:shadow-outline"
          style="border-radius: 17px;">
          Login
        </button>
      {/if}
    </center>
  </form>

</div>
