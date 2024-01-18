<script>
  import { supabase } from "../supabase";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import Navbar from "../components/Navbar.svelte";
  import Modal from "../components/Modal.svelte";
  import Post from "../components/Post.svelte";
  import FilterPosts from "../components/FilterPosts.svelte";

  let loggedUser = null;

  let posts = [];
  let users = [];

  const getPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, users(*)")
        .order("createdAt", { ascending: false });

      if (error) throw error;

      if (data) posts = data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const { data, error } = await supabase.from("users").select();

      if (error) throw error;

      if (data) users = data;
    } catch (error) {
      console.log(error);
    }
  };

  const filterPosts = (e) => {
    posts = posts.filter((post) => post.users.username === e.detail);
  };

  const cancelFilter = (e) => {
    if (!e.detail) getPosts();
  };

  const deletePost = (e) => {
    posts = posts.filter((post) => post.id !== e.detail);
  };

  onMount(async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) navigate("/");
    if (data.session) {
      loggedUser = data.session.user;
      getPosts();
      getUsers();
    }
  });
</script>

{#if loggedUser}
  <Navbar {loggedUser}>
    <FilterPosts
      {users}
      on:selectToFilter={filterPosts}
      on:cancelFilter={cancelFilter}
    />
  </Navbar>

  <Modal {loggedUser} {getPosts} />

  <div class="w-full p-5 flex flex-col items-center">
    {#each posts as post (post.id)}
      <Post
        src={post.path}
        username={post.users.username}
        description={post.description}
        date={post.createdAt}
        author={post.users.id}
        {loggedUser}
        postId={post.id}
        {getPosts}
        on:deletePost={deletePost}
      />
    {/each}
  </div>
{/if}
