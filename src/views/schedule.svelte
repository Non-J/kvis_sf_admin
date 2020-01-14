<script>
  import Base from "./base.svelte";

  import { link } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { Schedule } from "../firebase.js";

  const eventHappening = (begin, end) => {
    var time = new Date();
    let now = time.getTime() / 1000;
    if (begin.seconds <= now && now <= end.seconds) return true;
    return false;
  };

  const toDate = timestamp => {
    var options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    var time = new Date(timestamp.seconds * 1000);
    return time.toLocaleDateString("en-US", options);
  };

  const toTime = timestamp => {
    var options = { hour: "2-digit", minute: "2-digit" };
    var time = new Date(timestamp.seconds * 1000);
    return time.toLocaleTimeString("en-US", options);
  };

  const toggle = id => {
    Days[id.id].show = !Days[id.id].show;
  };

  const pale = col => {
    if (col[0] != "#") return;
    return col[0] + col[1] + col[2] + col[3] + col[4] + col[5] + col[6] + "A0";
  };

  var Events = [];
  var Days = [];
  onMount(async () => {
    [Events, Days] = await Schedule();
    console.log(Events);
    await Days.forEach(day => (day.show = false));
    console.log(Days);
  });
</script>

<style>
  .rounded {
    border-radius: 25px;
  }
  .bg-gray-550 {
    background: #8897ab;
  }
</style>

<Base>
  <div class="flex content-center justify-center bg-gray-900">
    <div class="w-full h-full min-h-screen max-w-3xl p-5 text-center">
      <a href="/" use:link>
        <button
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4
          mt-2 md:mt-4 focus:outline-none focus:shadow-outline"
          style="border-radius: 17px;">
          Home
        </button>
      </a>
      <div class="w-full h-full p-5 text-center">
        {#if Events.length !== 0}
          <h1 class="text-2xl text-gray-400">Current events are</h1>

          {#each Events as ev}
            {#if eventHappening(ev.begin, ev.end)}
              <div class="mt-10 bg-gray-600 rounded pt-5 pb-5">
                <h1 class="text-xl">{ev.title}</h1>
                <p>{ev.details}</p>
                <p>{toDate(ev.begin)} - {toDate(ev.end)}</p>
              </div>
            {/if}
          {/each}
        {:else}
          <p class="text-gray-400">Loading</p>
        {/if}
      </div>
      <div class="w-full h-full p-5 text-center">
        {#if Days.length !== 0}
          <h1 class="text-2xl text-gray-400">Upcoming events</h1>

          {#each Days as day, id}
            <div
              class="m-2 rounded bg-gray-600 pt-5 pb-5 hover:text-gray-300"
              style="background:{day.background}; cursor:pointer;"
              on:click|preventDefault={() => toggle({ id })}>
              {#if day.details}
                <h1 class="text-xl">{day.title}</h1>
              {:else}
                <h1 class="text-xl m-3">{day.title}</h1>
              {/if}
              {#if day.details}
                <p>{day.details}</p>
              {/if}
            </div>

            {#if day.show == true}
              <div>
                {#each day.content as ev}
                  <div
                    class="m-2 rounded bg-gray-550"
                    style="background:{pale(day.background)}">
                    <b>
                      <h1 class="text-xl text-gray-900">{ev.title}</h1>
                    </b>
                    <p class="text-lg text-gray-900">{ev.details}</p>
                    {#if day.details}
                      <p class="text-md text-gray-900">
                        {toTime(ev.begin)} to {toTime(ev.end)}
                      </p>
                    {/if}
                  </div>
                {/each}
              </div>
            {/if}
          {/each}
        {:else}
          <p class="text-gray-400">Loading</p>
        {/if}
      </div>
    </div>
  </div>
</Base>
