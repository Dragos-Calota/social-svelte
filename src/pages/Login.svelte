<script>
  import { Link, navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { supabase } from "../supabase";

  let loginForm = { email: "", password: "" };
  let showPassword = false;
  let errorLogin = { status: false, message: "" };

  onMount(async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session) navigate("/home");
  });

  const logIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) throw error;
      if (data) navigate("/home");
    } catch (error) {
      errorLogin.status = true;
      errorLogin.message = error.message;
    }
  };
</script>

<div class="min-h-screen w-screen flex justify-center items-center">
  <form
    class="w-4/12 grid grid-cols-1 gap-5 text-center"
    on:submit|preventDefault={logIn}
  >
    <div>
      <p class="text-5xl my-5 font-bold">Log in with your account!</p>
    </div>

    <div class="form-control">
      <div class="label">
        <p class="label-text">Email address</p>
      </div>
      <input
        class="input input-bordered input-primary"
        bind:value={loginForm.email}
      />
    </div>

    <div class="form-control">
      <div class="label">
        <p class="label-text">Password</p>
      </div>
      {#if showPassword}
        <input class="input input-primary" bind:value={loginForm.password} />
      {:else}
        <input
          type="password"
          class="input input-primary"
          bind:value={loginForm.password}
        />
      {/if}
    </div>

    <div class="grid grid-cols-5 items-center">
      <div class="label">
        <span class="label-text">Show password</span>
      </div>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        bind:checked={showPassword}
      />
    </div>

    <button class="btn btn-primary">Log In</button>

    <p class="text-xl font-bold">
      You don't have an account? Go to the{" "}
      <Link class="link link-primary" to="/register">Register Page</Link>
    </p>

    {#if errorLogin.status}
      <div class="alert alert-error my-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span>{errorLogin.message}</span>
      </div>
    {/if}
  </form>
</div>
