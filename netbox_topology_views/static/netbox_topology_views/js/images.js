(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
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

  // js/toast.js
  var toast;
  var init_toast = __esm({
    "js/toast.js"() {
      toast = {
        success: (message) => {
          const el = document.querySelector("#topology-plugin-success-toast");
          if (!el) return console.error("Could not find toast component!");
          const content = el.querySelector("span");
          content.textContent = message;
          const toast2 = new window.Toast(el);
          toast2.show();
        },
        error: (message) => {
          const el = document.querySelector("#topology-plugin-error-toast");
          if (!el) return console.error("Could not find toast component!");
          const content = el.querySelector("span");
          content.textContent = message;
          const toast2 = new window.Toast(el);
          toast2.show();
        }
      };
    }
  });

  // js/images.js
  var require_images = __commonJS({
    "js/images.js"(exports) {
      init_toast();
      var mapping = {};
      document.querySelector("form#images").addEventListener("submit", (e) => __async(null, null, function* () {
        e.preventDefault();
        try {
          const res = yield fetch("/" + basePath + "api/plugins/netbox_topology_views/images/save/", {
            method: "POST",
            body: JSON.stringify(mapping),
            headers: {
              "X-CSRFToken": window.CSRF_TOKEN,
              "Content-Type": "application/json"
            }
          });
          if (!res.ok) throw new Error(yield res.text());
          toast.success("Saved settings");
        } catch (err) {
          console.dir(err);
          toast.error(err.message);
        }
      }));
      document.querySelectorAll("form#images .dropdown-menu img").forEach((el) => {
        el.addEventListener("click", (e) => {
          var _a;
          if (!(e.currentTarget instanceof HTMLElement)) return;
          const {
            dataset: { role, image }
          } = e.currentTarget;
          mapping[role] = image;
          const button = (_a = e.currentTarget.closest(".dropdown")) == null ? void 0 : _a.querySelector(`#dropdownMenuButton${role}`);
          if (button) button.innerHTML = `<img src="${image}" />`;
        });
      });
    }
  });
  require_images();
})();
