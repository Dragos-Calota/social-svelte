<script>
  import { Router, Route } from "svelte-routing";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
  import Home from "./pages/Home.svelte";
</script>

<Router>
  <Route path="/" component={Login}></Route>
  <Route path="/register" component={Register}></Route>
  <Route path="/home" component={Home}></Route>
</Router>
