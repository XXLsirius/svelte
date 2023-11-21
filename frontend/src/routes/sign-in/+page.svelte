<script>
  import { goto } from "$app/navigation";
  import { isLogin } from "../stores";
  import ModelFuncs from "../../assets/js/models/ModelMain";

  export let username = "";
  export let password = "";
  let redirectURL = "/";

  export async function onSignIn(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${ModelFuncs.getServerUrl()}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID: "1224",
          Username: username,
          Password: password,
        }),
      });
      if (response.status !== 200 || response.status == 500) {
        //change the code here if you want
        alert("Unauthorized");
        goto("/sign-up");
        return;
      }

      const parseRes = await response.json();
      if (parseRes.result == "failure") {
        switch (parseRes.message) {
          case "no_such_user":
            alert("No such user exists!");
            break;
          case "incorrect_password":
            alert("Incorrect Password");
            break;
        }

        return;
      }
      //set local storage and state
      const { token } = parseRes;
      let userData = { username, password };
      localStorage.clear();
      localStorage.setItem("jwt", token);
      username = localStorage.getItem("jwt");
      localStorage.setItem("user", userData.username);

      isLogin.set(true);
      if (redirectURL) {
        goto(redirectURL);
      }
    } catch (err) {
      alert("login-sign failed");
      goto("/sign-up");
    }
  }
</script>

<div class="app-container app-theme-white body-tabs-shadow">
  <div class="app-container">
    <div class="h-100">
      <div class="h-100 no-gutters row">
        <div
          class="d-none d-lg-block col-lg-4"
          style="background-image: url(/src/assets/images/login-back.png); background-size: cover;"
        />
        <div
          class="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-8"
        >
          <div class="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
            <div class="app-logo" />
            <h4 class="mb-0">
              <span class="d-block">Welcome back,</span>
              <span>Please sign in to your account.</span>
            </h4>
            <h6 class="mt-3">
              No account? <a href="/sign-up" class="text-primary">Sign up now</a
              >
            </h6>
            <div class="divider row" />
            <div>
              <!-- <form class="" on:submit={onSignIn}> -->
              <div class="form-row">
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="userInput" class="inputUsername">Username</label
                    >
                    <input
                      name="userInput"
                      id="userInput"
                      placeholder="Username here..."
                      type="text"
                      class="form-control"
                      bind:value={username}
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="position-relative form-group">
                    <label for="passwordInput" class="inputPassword"
                      >Password</label
                    >
                    <input
                      name="password"
                      id="passwordInput"
                      placeholder="Password here..."
                      type="password"
                      class="form-control"
                      bind:value={password}
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="position-relative form-check">
                <input
                  name="check"
                  id="exampleCheck"
                  type="checkbox"
                  class="form-check-input"
                />
                <label for="exampleCheck" class="form-check-label"
                  >Keep me logged in</label
                >
              </div>
              <div class="divider row" />
              <div class="d-flex align-items-center">
                <div class="ml-auto">
                  <a
                    href="/"
                    class="btn-lg btn btn-link recover-btn"
                    on:click={(e) => {
                      e.preventDefault();
                    }}>Recover Password</a
                  >
                  <button
                    id="id_btn_signin"
                    class="btn btn-primary btn-lg login-btn"
                    on:click={onSignIn}>Login to Dashboard</button
                  >
                </div>
              </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
