<script>
  export let profile;
</script>

<style>
  .grid-container {
    margin: 25px;
    display: grid;
    grid-template-columns: max-content auto;
    grid-gap: 1rem 0.5rem;
    gap: 1rem 0.5rem;
    grid-auto-columns: auto;
    text-align: left;
  }
</style>

<h1
  class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline
  text-gray-100">
  {profile['name']}
</h1>
<h1
  class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-2xl font-hairline
  text-gray-100">
  {profile['country']}
</h1>

<div class="flex justify-center">
  <div class="grid-container">

    <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-red-500">
      Accommodation:
    </h1>
    <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-gray-100">
      {profile['residence']}
    </h1>

    {#if profile['buddies']}
      <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-red-500">
        Buddies:
      </h1>
      <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-gray-100">
        {profile['buddies']}
      </h1>
    {/if}

    <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-red-500">
      Scientific Activities:
    </h1>
    <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-gray-100">
      {profile['sciact_morning']} (Morning)
      <br />
      {profile['sciact_afternoon']} (Afternoon)
    </h1>

    <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-red-500">
      Project:
    </h1>
    <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-gray-100">
      {profile['project_code']} - {profile['project_title']}
    </h1>

    <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-red-500">
      Presentation Venue:
    </h1>
    <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-gray-100">
      {profile['presentation_room']} (At {profile['presentation_time']})
    </h1>

  </div>
</div>
