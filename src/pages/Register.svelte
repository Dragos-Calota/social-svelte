<script>
  import { Link } from "svelte-routing";
  import { supabase } from "../supabase";

  let registerForm = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  };

  let successSubmit = { status: false, message: "User created successfully!" };
  let errorSubmit = { status: false, message: "" };

  let showPassword = false;

  const register = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerForm.email,
        password: registerForm.password,
        options: {
          data: {
            firstName: registerForm.firstName,
            lastName: registerForm.lastName,
            username: registerForm.username,
          },
        },
      });

      if (error) throw error;

      if (data) {
        await supabase.from("users").insert({
          id: data.user.id,
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
          username: registerForm.username,
        });

        successSubmit.status = true;
        errorSubmit.status = false;

        registerForm.firstName = "";
        registerForm.lastName = "";
        registerForm.username = "";
        registerForm.email = "";
        registerForm.password = "";
      }
    } catch (error) {
      errorSubmit.status = true;
      errorSubmit.message = error.message;
      successSubmit.status = false;
    }
  };
</script>

<div class="min-h-screen w-screen flex justify-center items-center">
  <form
    class="w-4/12 grid grid-cols-1 gap-5 text-center"
    on:submit|preventDefault={register}
  >
    <div>
      <p class="text-5xl my-5 font-bold">Create a new account!</p>
    </div>

    <div class="form-control">
      <div class="label">
        <p class="label-text">First Name<span class="text-error">*</span></p>
      </div>
      <input
        required
        class="input input-bordered input-primary"
        bind:value={registerForm.firstName}
      />
    </div>

    <div class="form-control">
      <div class="label">
        <p class="label-text">Last Name<span class="text-error">*</span></p>
      </div>
      <input
        required
        class="input input-bordered input-primary"
        bind:value={registerForm.lastName}
      />
    </div>

    <div class="form-control">
      <div class="label">
        <p class="label-text">Username<span class="text-error">*</span></p>
      </div>
      <input
        required
        class="input input-bordered input-primary"
        bind:value={registerForm.username}
      />
    </div>

    <div class="form-control">
      <div class="label">
        <p class="label-text">Email address<span class="text-error">*</span></p>
      </div>
      <input
        required
        class="input input-bordered input-primary"
        bind:value={registerForm.email}
      />
    </div>

    <div class="form-control">
      <div class="label">
        <p class="label-text">Password<span class="text-error">*</span></p>
      </div>
      {#if showPassword}
        <input
          required
          class="input input-primary"
          bind:value={registerForm.password}
        />
      {:else}
        <input
          required
          type="password"
          class="input input-primary"
          bind:value={registerForm.password}
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

    <p class="label-text text-end">
      <span class="text-error">*</span>Required Fields
    </p>

    <button class="btn btn-primary">Sign Up</button>

    <p class="text-xl font-bold">
      Already have an account? Go back to the{" "}
      <Link class="link link-primary" to="/">Login Page</Link>
    </p>

    {#if errorSubmit.status}
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
        <span>{errorSubmit.message}</span>
      </div>
    {/if}

    {#if successSubmit.status}
      <div class="alert alert-success my-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span>{successSubmit.message}</span>
      </div>
    {/if}
  </form>
</div>
