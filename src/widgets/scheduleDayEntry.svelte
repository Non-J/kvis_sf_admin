<script>
  export let content;

  let showContent = false;

  $: {
    if (!content["background"]) {
      content["background"] = "#8897ab";
    }
  }

  function parseBackgroundColor(color, alpha) {
    if (!color) {
      throw "Invalid Color";
    }
    if (color[0] !== "#") {
      return 'background-image: url("' + color + '")';
    } else {
      if (alpha) {
        return "background-color: " + color.substring(0, 7) + alpha;
      } else {
        return "background-color: " + color;
      }
    }
  }

  function parseTextStyle(text_color, text_weight, text_scale) {
    let result = "";
    if (text_color) {
      result += "color: " + text_color + ";";
    }
    if (text_weight) {
      result += "font-weight: " + (400 + text_weight * 100) + ";";
    }
    if (text_scale) {
      result += "font-size: " + text_scale + "em;";
    }
    return result;
  }

  function toTime(timestamp) {
    var options = { hour: "2-digit", minute: "2-digit" };
    var time = new Date(timestamp.seconds * 1000);
    return time.toLocaleTimeString("en-US", options);
  }
</script>

<style>
  .rounded {
    border-radius: 25px;
  }
  .bg-gray-550 {
    background: #8897ab;
  }
</style>

<div
  class="m-2 rounded pt-5 pb-5 hover:text-gray-300 bg-center bg-cover"
  style="{parseBackgroundColor(content['background'])}; cursor:pointer;"
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
        class="m-2 rounded bg-center bg-cover"
        style="{parseBackgroundColor(content['background'], 'A0')};">
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
