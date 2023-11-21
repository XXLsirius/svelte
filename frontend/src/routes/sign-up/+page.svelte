<script>
  import { goto } from "$app/navigation";
  import { isLogin } from "../stores";
  import ModelFuncs from "../../assets/js/models/ModelMain";

  let username = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let redirectURL = "/";

  async function onCreateAccount(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${ModelFuncs.getServerUrl()}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID: "aaa",
          Username: username,
          Password: password,
        }),
      });
      if (response.status == 401 || response.status == 500) {
        //change the code here if you want
        if (serverErrMsg) {
          failureMsg.set(serverErrMsg);
        }
        return;
      }

      const parseRes = await response.json();
      if (parseRes.result == "failure") {
        switch (parseRes.message) {
          case "existing_user":
            alert("User already exists!");
        }

        return;
      }
      //set local storage and state
      const { token } = parseRes;
      let userData = { username, password };
      localStorage.clear();
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", username);
      isLogin.set(true);
      if (redirectURL) {
        goto(redirectURL);
      }
      // goto("/dashboard");
    } catch (err) {
      alert("login failed");
      console.log(err);
    }
  }
</script>

<div
  class="app-container app-theme-white body-tabs-shadow closed-sidebar-mobile closed-sidebar"
>
  <div class="app-container closed-sidebar-mobile closed-sidebar">
    <div class="h-100">
      <div class="h-100 no-gutters row">
        <div
          class="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center col-md-12 col-lg-7"
        >
          <div class="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
            <div class="app-logo" />
            <h4>
              <div>Welcome,</div>
              <span
                >It only takes a <span class="text-success">few seconds</span> to
                create your account</span
              >
            </h4>
            <div>
              <form class="">
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="emailInput" class="inputEmail"
                        ><span class="text-danger">*</span> Email</label
                      >
                      <input
                        name="email"
                        id="emailInput"
                        placeholder="Email here..."
                        type="email"
                        class="form-control"
                        bind:value={email}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="nameInput" class="inputName">Name</label>
                      <input
                        name="text"
                        id="nameInput"
                        placeholder="Name here..."
                        type="text"
                        class="form-control"
                        bind:value={username}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="enterPassword" class="registerName"
                        ><span class="text-danger">*</span> Password</label
                      >
                      <input
                        name="password"
                        id="enterPassword"
                        placeholder="Password here..."
                        type="password"
                        class="form-control"
                        bind:value={password}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="confirmPassword" class="registerRepeat"
                        ><span class="text-danger">*</span> Repeat Password</label
                      >
                      <input
                        name="passwordrep"
                        id="confirmPassword"
                        placeholder="Repeat Password here..."
                        type="password"
                        class="form-control"
                        bind:value={confirmPassword}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-3 position-relative form-check">
                  <input
                    name="check"
                    id="exampleCheck"
                    type="checkbox"
                    class="form-check-input"
                  />
                  <label for="exampleCheck" class="form-check-label"
                    >Accept our <a href="/sign-up">Terms and Conditions</a
                    >.</label
                  >
                </div>
                <div class="mt-4 d-flex align-items-center">
                  <h5 class="mb-0">
                    Already have an account? <a
                      href="/sign-in"
                      class="text-primary">Sign in</a
                    >
                  </h5>
                  <div class="ml-auto">
                    <button
                      class="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg register-create"
                      on:click={onCreateAccount}
                      >Create Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          class="d-lg-flex d-xs-none col-lg-5"
          style="background-image: url(/src/assets/images/login-back.png); background-size: cover;"
        />
      </div>
    </div>
  </div>
</div>
