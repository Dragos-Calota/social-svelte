<script>
  import { createEventDispatcher } from "svelte";
  export let users;

  const dispatch = createEventDispatcher();

  let contentOpen = false;
  let inputValue = "";
  let usersCopy = users;
  let userToFilter = "";

  $: {
    if (inputValue) {
      usersCopy = usersCopy.filter((element) =>
        element.username.includes(inputValue)
      );
    } else {
      usersCopy = users;
    }
  }

  const selectUserToFilter = (username) => {
    inputValue = username;
    userToFilter = username;
    contentOpen = false;

    dispatch("selectToFilter", userToFilter);
  };

  const cancelFilter = () => {
    inputValue = "";
    userToFilter = "";

    dispatch("cancelFilter", userToFilter);
  };
</script>

<div class="w-96 relative">
  <input
    type="text"
    class="input w-full"
    placeholder="Search user"
    on:focus={() => (contentOpen = true)}
    bind:value={inputValue}
  />

  {#if inputValue}
    <button
      class="btn btn-circle btn-ghost btn-sm absolute top-2 right-2"
      on:click={cancelFilter}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        /></svg
      >
    </button>
  {/if}
</div>

{#if contentOpen}
  <div
    class="flex flex-col bg-black p-4 rounded-box items-center dropdown-content w-96 overflow-scroll h-48"
  >
    {#each usersCopy as user (user.id)}
      <button
        class="btn btn-ghost m-1 w-full justify-start"
        on:click={() => selectUserToFilter(user.username)}
      >
        <div class="avatar">
          <div class="w-8 rounded-full">
            <img src="/unnamed.png" alt="MUIE" />
          </div>
        </div>
        {user.username}</button
      >
    {/each}
  </div>
{/if}
