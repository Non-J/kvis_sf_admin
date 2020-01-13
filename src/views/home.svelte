<script>
  import Base from "./base.svelte";

  import { link } from "svelte-spa-router";
  import { onMount, onDestroy } from "svelte";
  import { auth, authUserObservable, getEmailByUsername } from "../firebase.js";

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let firebaseUser;
  let firebaseUserSubscription;

  onMount(() => {
    firebaseUserSubscription = authUserObservable.subscribe(user => {
      firebaseUser = user;
    });
  });

  onDestroy(() => {
    firebaseUserSubscription.unsubscribe();
  });

  let loggingInFlag = false;
  let loginInputUsername = "";
  let loginInputPassword = "";
  let loginInputErrorMsg = null;

  function loginAction() {
    loggingInFlag = true;
    loginInputErrorMsg = null;

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

  function logoutAction() {
    auth.signOut();
    loggingInFlag = false;
  }
</script>

<style>
  .bg-profilebgimage {
    background-image: url("images/profilebg.jpg");
  }

  .bg-loginbgimage {
    background-image: url("images/loginbg.jpg");
  }
  .container-smth {
      max-width: 45%;
      margin-left: auto;
      margin-right: auto;
  }  

  @media (min-height: 768px) {
    .container-smth {
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>

<Base>

  {#if firebaseUser}
    <div
      class="w-full h-full min-h-screen p-5 text-center bg-center bg-cover
      bg-profilebgimage">
      {#if firebaseUser['data']['name']}
        <h1
          class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline
          text-gray-100">
          {firebaseUser['data']['name']}
        </h1>
        <h1
          class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-2xl font-hairline
          text-gray-100">
          {firebaseUser['data']['country']}
        </h1>
        <div class="flex justify-center content-center">
          <h1
            class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-6xl font-hairline
            text-red-500">
            Buddies:
          </h1>
          <h1
            class="mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-6xl
            font-hairline text-gray-100">
            Nokia 08XXXXXXXX
          </h1>
        </div>
        <div class="flex justify-center content-center">
          <h1
            class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline
            text-red-500">
            Excursion route:
          </h1>
          <h1
            class="mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-5xl
            font-hairline text-gray-100">
            1
          </h1>
        </div>
        <div class="flex justify-center content-center">
          <h1
            class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline
            text-red-500">
            Sci Activities:
          </h1>
          <h1
            class="mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-5xl
            font-hairline text-gray-100">
            1, 2
          </h1>
        </div>

        <h1
          class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline
          text-gray-100">
          Room: {firebaseUser['data']['location_dorm']}
        </h1>
        <div class="flex justify-center content-center">
          <h1
            class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-4xl font-hairline
            text-red-500">
            Research:
          </h1>
          <h1
            class="mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-4xl
            font-hairline text-gray-100">
            {firebaseUser['data']['project_name']}
          </h1>
        </div>
        <h1
          class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline
          text-red-500">
          Presentation Venue {firebaseUser['data']['location_presentation']}
        </h1>
      {:else}
        <div class="flex h-screen w-screen justify-center content-center">
          <h1
            class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline
            text-gray-100">
            Loading
          </h1>
        </div>
      {/if}

      <button
        on:click={logoutAction}
        class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2
        md:mt-4 focus:outline-none focus:shadow-outline"
        style="border-radius: 17px;">
        Logout
      </button>

      <a href='/schedule' use:link ><button
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2
        md:mt-4 focus:outline-none focus:shadow-outline"
        style="border-radius: 17px;">
        Go to Schedule
      </button></a>

    </div>
  {:else}
    <div class="w-full h-full min-h-screen bg-center bg-cover bg-loginbgimage">
      <div class="container-smth">
        <div class="w-full flex pt-8 content-center justify-center">
          <h1 class="font-hairline antialiased text-gray-100 text-5xl font-mono">
            WELCOME
          </h1>
        </div>
        <div class="w-full flex pt-5 content-center justify-center">
          <img
            class="max-w-xs w-full h-full"
            src="/images/issflogo.png"
            alt="16th issf and 3rd kvis isf logo" />
        </div>
        <div class="w-full flex content-center justify-center">
          <form class="w-full max-w-sm px-8 pt-6 pb-8 mb-4">
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
                class="bg-gray-700 shadow appearance-none w-full py-2 px-3
                text-gray-300 leading-tight focus:outline-none
                focus:shadow-outline"
                placeholder="username"
                style="border-radius: 17px" />
            </div>

            <div class="mb-4">
              <input
                bind:value={loginInputPassword}
                required
                type="password"
                id="loginInputPassword"
                class="bg-gray-700 shadow appearance-none w-full py-2 px-3
                text-gray-300 leading-tight focus:outline-none
                focus:shadow-outline"
                placeholder="passcode"
                style="border-radius: 17px;" />
            </div>
            <center>
              {#if loggingInFlag}
                <button
                  disabled="true"
                  type="submit"
                  class="bg-gray-600 text-white font-bold py-2 px-4
                  focus:outline-none focus:shadow-outline"
                  style="border-radius: 17px;">
                  Logging In
                </button>
              {:else}
                <button
                  on:click={loginAction}
                  type="submit"
                  class="bg-red-600 hover:bg-red-700 text-white font-bold py-2
                  px-4 focus:outline-none focus:shadow-outline"
                  style="border-radius: 17px;">
                  Login
                </button>
              {/if}
            </center>
          </form>
        </div>
      </div>
    </div>
  {/if}

</Base>
