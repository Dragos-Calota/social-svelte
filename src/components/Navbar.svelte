<script>
  import { navigate } from "svelte-routing";
  import { supabase } from "../supabase";

  export let loggedUser;

  const signOut = async () => {
    await supabase.auth.signOut();

    navigate("/");
  };
</script>

<div class="navbar bg-primary justify-between sticky top-0">
  <div class="navbar-start">
    <div class="avatar pr-2">
      <div class="w-10 rounded-full ring ring-black ring-offset-base-100">
        <img src="/unnamed.png" alt="MUIE" />
      </div>
    </div>
    <p class="text-black font-bold text-lg">
      {loggedUser.user_metadata.username}
    </p>
  </div>
  <div class="navbar-center">
    <div class="dropdown">
      <slot />
    </div>
  </div>

  <div class="navbar-end">
    <div class="dropdown dropdown-end">
      <button class="btn btn-ghost text-black text-xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><line x1="3" y1="12" x2="21" y2="12"></line><line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
          ></line><line x1="3" y1="18" x2="21" y2="18"></line></svg
        >
      </button>

      <div
        class="grid grid-cols-1 bg-black p-4 rounded-box text-center dropdown-content w-52"
      >
        <button class="btn btn-ghost m-1">Your Profile</button>
        <button
          class="btn btn-ghost m-1"
          on:click={() => document.getElementById("postModal").showModal()}
          >Add a new post</button
        >
        <button class="btn btn-ghost m-1" on:click={signOut}>Sign out</button>
      </div>
    </div>
  </div>
</div>
