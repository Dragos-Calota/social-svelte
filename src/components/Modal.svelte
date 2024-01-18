<script>
  import { v4 as uuid } from "uuid";
  import { supabase } from "../supabase";

  export let loggedUser;
  export let getPosts;

  let photoToUpload = null;
  let description = "";
  let formRef = null;

  const addPost = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("posts")
        .upload(loggedUser.id + "/" + uuid(), photoToUpload[0]);

      if (error) throw error;

      if (data) {
        await supabase.from("posts").insert({
          id: data.id,
          author: loggedUser.id,
          path: data.path,
          description,
        });
        getPosts();
        formRef.reset();

        document.getElementById("postModal").close();
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<dialog id="postModal" class="modal">
  <div class="modal-box">
    <form
      class="grid grid-cols-1 gap-10 text-center"
      bind:this={formRef}
      on:submit|preventDefault={addPost}
    >
      <p class="font-bold text-3xl">Create a new post</p>

      <input
        required
        type="file"
        accept="image/*"
        class="file-input file-input-bordered file-input-primary"
        bind:files={photoToUpload}
      />

      <div class="form-control">
        <div class="label">
          <p class="label-text">Description</p>
        </div>
        <input
          class="input input-bordered input-primary"
          bind:value={description}
        />
      </div>

      <button type="submit" class="btn btn-accent"> Upload </button>
    </form>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button on:click={() => formRef.reset()}>close</button>
  </form>
</dialog>
