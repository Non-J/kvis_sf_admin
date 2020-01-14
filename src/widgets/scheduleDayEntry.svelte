<script>
  export let content;

  let showContent = false;

  $: {
    if (!content["background"]) {
      content["background"] = "#ffffff77";
    }
  }

  function parseColor(color, alpha) {
    if (!color) {
      throw "Invalid Color";
    }
    if (color[0] !== "#") {
      return 'background-image: url("' + color + '")';
    } else {
      if (alpha) {
        return "background: " + color.substring(0, 7) + alpha;
      } else {
        return "background: " + color;
      }
    }
  }

  function toTime(timestamp) {
    var options = { hour: "2-digit", minute: "2-digit" };
    var time = new Date(timestamp.seconds * 1000);
    return time.toLocaleTimeString("en-US", options);
  }
</script>

<style>

</style>

<div
  class="m-2 rounded bg-gray-600 pt-5 pb-5 hover:text-gray-300 bg-center
  bg-cover"
  style="{parseColor(content['background'])}; cursor:pointer;"
  on:click|preventDefault={() => {
    showContent = !showContent;
  }}>

  {#if content['title']}
    <h1 class="text-xl">{content['title']}</h1>
  {/if}
  {#if content['details']}
    <p>{content['details']}</p>
  {/if}
</div>

{#if showContent && content['content_type'] === 'list_content' && Array.isArray(content['content'])}
  <div>
    {#each content['content'] as event}
      <div
        class="m-2 rounded bg-gray-550 bg-center bg-cover"
        style="{parseColor(content['background'], 'A0')};">
        {#if content['title']}
          <h1 class="text-xl text-gray-900 font-bold">{event['title']}</h1>
        {/if}
        {#if content['details']}
          <pre class="text-lg font-sans text-gray-900">{event['details']}</pre>
        {/if}

        {#if event.begin || event.end}
          <p class="text-md text-gray-900">
            {toTime(event.begin)} to {toTime(event.end)}
          </p>
        {/if}
      </div>
    {/each}
  </div>
{/if}
