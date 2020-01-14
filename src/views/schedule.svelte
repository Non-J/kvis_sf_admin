<script>
  import ScheduleDayEntry from "../widgets/scheduleDayEntry.svelte";

  import { link } from "svelte-spa-router";
  import { onMount, onDestroy } from "svelte";
  import { scheduleObservable, fullScheduleObservable } from "../firebase.js";

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

  function filterCurrentEvents(fullSchedule) {
    let result = [];
    let now = new Date().getTime();
    if (Array.isArray(fullSchedule)) {
      for (let event of $fullScheduleObservable) {
        if (event.begin.toMillis() <= now && now <= event.end.toMillis()) {
          result.push(event);
        }
      }
    }
    return result;
  }

  let currentEventEntries = [];
  let currentEventEntriesUpdaterInterval;

  $: currentEventEntries = filterCurrentEvents($fullScheduleObservable);

  onMount(() => {
    // TODO: Use update solution that are more lightweight
    // Such as use timeout instead of interval
    currentEventEntriesUpdaterInterval = setInterval(() => {
      currentEventEntries = filterCurrentEvents($fullScheduleObservable);
    }, 30000);
  });

  onDestroy(() => {
    clearInterval(currentEventEntriesUpdaterInterval);
  });
</script>

<style>
  .rounded {
    border-radius: 25px;
  }
</style>

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
      {#if $fullScheduleObservable && $fullScheduleObservable.length !== 0}
        <h1 class="text-2xl text-gray-400">Current events are</h1>

        {#each currentEventEntries as event}
          <div class="mt-10 bg-gray-600 rounded pt-5 pb-5">
            <h1 class="text-xl">{event.title}</h1>
            <p>{event.details}</p>
            <p>{toDate(event.begin)} - {toDate(event.end)}</p>
          </div>
        {/each}
      {:else}
        <p class="text-gray-400">Loading</p>
      {/if}
    </div>

    <div class="w-full h-full p-5 text-center">
      {#if $scheduleObservable && $scheduleObservable.length !== 0}
        <h1 class="text-2xl text-gray-400">Upcoming events</h1>

        {#each $scheduleObservable as day}
          <ScheduleDayEntry content={day} />
        {/each}
      {/if}
    </div>
  </div>
</div>
