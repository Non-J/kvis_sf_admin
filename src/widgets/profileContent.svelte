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
  class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-5xl font-normal text-gray-100">
  {profile['name'] ? profile['name'] : 'No Name'}
</h1>
<h1
  class="mt-1 md:mt-2 text-xl sm:text-2xl md:text-2xl font-hairline
  text-gray-100">
  {profile['school'] ? profile['school'] + ', ' : ''}{profile['country'] ? profile['country'] : ''}
</h1>

<div class="flex justify-center">
  <div class="grid-container">

    {#if profile['residence']}
      <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-red-500">
        Accommodation:
      </h1>
      <h1 class="text-xl sm:text-2xl md:text-4xl font-normal text-gray-100">
        {profile['residence']}
      </h1>
    {/if}

    {#if profile['buddies']}
      <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-red-500">
        Buddies:
      </h1>
      <h1 class="text-xl sm:text-2xl md:text-4xl font-normal text-gray-100">
        {profile['buddies']}
      </h1>
    {/if}

    {#if profile['sciact_morning'] || profile['sciact_afternoon']}
      <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-red-500">
        Scientific Activities:
      </h1>
      <h1 class="text-xl sm:text-2xl md:text-4xl font-normal text-gray-100">
        {profile['sciact_morning'] ? profile['sciact_morning'] : 'No Activities'}
        (Morning)
        <br />
        {profile['sciact_afternoon'] ? profile['sciact_afternoon'] : 'No Activities'}
        (Afternoon)
      </h1>
    {/if}

    {#if profile['project_code'] || profile['project_title']}
      <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-red-500">
        Project:
      </h1>
      <h1 class="text-xl sm:text-2xl md:text-4xl font-normal text-gray-100">
        {profile['project_code'] ? profile['project_code'] + ' - ' : ''}{profile['project_title'] ? profile['project_title'] : 'Untitled'}
      </h1>
    {/if}

    {#if profile['presentation_room'] || profile['presentation_time']}
      <h1 class="text-xl sm:text-2xl md:text-4xl font-hairline text-red-500">
        Presentation Venue:
      </h1>
      <h1 class="text-xl sm:text-2xl md:text-4xl font-normal text-gray-100">
        {profile['presentation_room'] ? profile['presentation_room'] : 'TBA'}
        {#if profile['presentation_time']}
          (At {profile['presentation_time']})
        {/if}
      </h1>
    {/if}

  </div>
</div>
