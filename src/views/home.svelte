<script>
  import Base from "./base.svelte";
  import Login from "../widgets/login.svelte";
  import ProfileContent from "../widgets/profileContent.svelte";

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
        <ProfileContent profile={firebaseUser['data']} />
      {:else}
        <div class="flex py-12 justify-center">
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

      <a href="/schedule" use:link>
        <button
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4
          mt-2 md:mt-4 focus:outline-none focus:shadow-outline"
          style="border-radius: 17px;">
          Schedule
        </button>
      </a>

    </div>
  {:else}
    <Login />
  {/if}

</Base>
