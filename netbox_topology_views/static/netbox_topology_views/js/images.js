(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // js/csrftoken.js
  var getCookie = (name) => {
    if (!document.cookie)
      return;
    let cookieValue = null;
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
    return cookieValue;
  };

  // js/toast.js
  var toast = {
    success: (message) => {
      const el = document.querySelector("#topology-plugin-success-toast");
      if (!el)
        return console.error("Could not find toast component!");
      const content = el.querySelector("span");
      content.textContent = message;
      const toast2 = new window.Toast(el);
      toast2.show();
    },
    error: (message) => {
      const el = document.querySelector("#topology-plugin-error-toast");
      if (!el)
        return console.error("Could not find toast component!");
      const content = el.querySelector("span");
      content.textContent = message;
      const toast2 = new window.Toast(el);
      toast2.show();
    }
  };

  // js/images.js
  var mapping = {};
  var csrftoken = getCookie("csrftoken");
  document.querySelector("form#images").addEventListener("submit", (e) => __async(void 0, null, function* () {
    e.preventDefault();
    try {
      const res = yield fetch("/" + basePath + "api/plugins/netbox_topology_views/images/save/", {
        method: "POST",
        body: JSON.stringify(mapping),
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok)
        throw new Error(yield res.text());
      toast.success("Saved settings");
    } catch (err) {
      console.dir(err);
      toast.error(err.message);
    }
  }));
  document.querySelectorAll("form#images .dropdown-menu img").forEach((el) => {
    el.addEventListener("click", (e) => {
      var _a;
      if (!(e.currentTarget instanceof HTMLElement))
        return;
      const {
        dataset: { role, image }
      } = e.currentTarget;
      mapping[role] = image;
      const button = (_a = e.currentTarget.closest(".dropdown")) == null ? void 0 : _a.querySelector(`#dropdownMenuButton${role}`);
      if (button)
        button.innerHTML = `<img src="${image}" />`;
    });
  });
})();
