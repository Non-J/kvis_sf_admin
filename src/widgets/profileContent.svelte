<script>
  export let profile;
</script>

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
{#if profile['buddies']}
  <div class="flex justify-center content-center">
    <h1
      class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-6xl font-hairline
      text-red-500">
      Buddies:
    </h1>
    <h1
      class="mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-6xl
      font-hairline text-gray-100">
      {profile['buddies']}
    </h1>
  </div>
{/if}
<div class="flex justify-center content-center">
  <h1
    class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline
    text-red-500">
    Scientific Activities (Morning):
  </h1>
  <h1
    class="mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-5xl
    font-hairline text-gray-100 text-left">
    {profile['sciact_morning']}
  </h1>
</div>
<div class="flex justify-center content-center">
  <h1
    class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline
    text-red-500">
    Scientific Activities (Afternoon):
  </h1>
  <h1
    class="mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-5xl
    font-hairline text-gray-100 text-left">
    {profile['sciact_afternoon']}
  </h1>
</div>

<h1
  class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline
  text-gray-100">
  Accommodation: {profile['residence']}
</h1>
<div class="flex justify-center content-center">
  <h1
    class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-4xl font-hairline
    text-red-500">
    Research:
  </h1>
  <h1
    class="mt-1 md:mt-2 ml-2 md:ml-5 text-xl sm:text-2xl md:text-4xl
    font-hairline text-gray-100 text-left">
    {profile['project_title']}
  </h1>
</div>
<h1
  class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-hairline text-red-500">
  Presentation Venue {profile['presentation_room']}
</h1>
