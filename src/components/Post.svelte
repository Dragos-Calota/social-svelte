<script>
  import { onMount } from "svelte";
  import { supabase } from "../supabase";

  export let src,
    username,
    description,
    date,
    author,
    loggedUser,
    postId,
    getPosts;

  const URL = import.meta.env.VITE_URL_POSTS;

  let dateString = "";
  let isEditing = false;
  let newDescription = description;

  onMount(() => {
    const dateObject = new Date(date);

    if (dateObject.getDate() < 10) {
      dateString += `0${dateObject.getDate()}/`;
    } else {
      dateString += `${dateObject.getDate()}/`;
    }

    if (dateObject.getMonth() + 1 < 10) {
      dateString += `0${dateObject.getMonth() + 1}/`;
    } else {
      dateString += `${dateObject.getMonth() + 1}/`;
    }

    dateString += `${dateObject.getFullYear()}`;

    if (dateObject.getHours() < 10) {
      dateString += ` 0${dateObject.getHours()}:`;
    } else {
      dateString += ` ${dateObject.getHours()}:`;
    }

    if (dateObject.getMinutes() < 10) {
      dateString += `0${dateObject.getMinutes()}`;
    } else {
      dateString += `${dateObject.getMinutes()}`;
    }
  });

  const updatePost = async () => {
    try {
      const { error } = await supabase
        .from("posts")
        .update({ description: newDescription })
        .eq("id", postId);
      if (error) throw error;
      isEditing = false;
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      const { error } = await supabase.storage.from("posts").remove([src]);

      if (error) throw error;

      getPosts();
    } catch (error) {
      console.log(error.message);
    }
  };
</script>

<div class="w-1/4 py-5">
  <div class="flex items-center justify-between pb-2">
    <div class="flex items-center">
      <div class="avatar -z-10 pr-2">
        <div class="w-10 rounded-full">
          <img src="/unnamed.png" alt="MUIE" />
        </div>
      </div>
      <p class="text-xl font-extrabold">
        {username}
        <span class="text-sm font-medium">•</span>
        <span class="text-sm font-normal">{dateString}</span>
      </p>
    </div>
    {#if author === loggedUser.id}
      <button class="btn btn-circle btn-ghost btn-sm" on:click={deletePost}>
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

  {#if isEditing}
    <form on:submit|preventDefault={updatePost}>
      <div class="w-full flex py-2 items-center">
        <input
          type="text"
          class="input input-primary w-3/5"
          bind:value={newDescription}
        />
        <div class="p-2">
          <button
            type="button"
            class="btn btn-error"
            on:click={() => {
              newDescription = description;
              isEditing = false;
            }}>Cancel</button
          >
        </div>
        <div class="py-2">
          <button class="btn btn-accent">Update</button>
        </div>
      </div>
    </form>
  {:else}
    <div class="w-full flex py-2 items-center justify-between">
      {#if description}
        <p class="text-xl">{description}</p>
        {#if author === loggedUser.id}
          <button
            class="btn btn-ghost btn-circle btn-sm"
            on:click={() => (isEditing = true)}
            ><svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"
              />
            </svg>
          </button>
        {/if}
      {:else if !description && author === loggedUser.id}
        <button
          class="btn btn-ghost font-light"
          on:click={() => (isEditing = true)}
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"
            />
          </svg>
          Add description
        </button>
      {/if}
    </div>
  {/if}
  <img src={URL + src} alt="MUIE" class="rounded-box py-2" />
  <div class="divider" />
</div>
