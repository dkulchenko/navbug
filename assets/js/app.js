// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html";
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";
import topbar from "../vendor/topbar";

import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");
let liveSocket = new LiveSocket("/live", Socket, {
  hooks: {
    // add editor to liveview
    Editor: {
      editor: null,

      mounted() {
        this.editor = new Editor({
          element: this.el,
          extensions: [StarterKit, Link.configure({ openOnClick: false })],
          content: "",
        });

        this.editor
          .chain()
          .focus()
          .insertContent([
            {
              type: "text",
              text: "Link name",
              marks: [
                {
                  type: "link",
                  attrs: { href: "https://google.com", target: "" },
                },
              ],
            },
          ])
          .run();
      },

      destroyed() {
        this.editor.destroy();
      },
    },
  },
  params: { _csrf_token: csrfToken },
});

// add editor to dead view (exact same code as above, just not in a hook)
window.addEventListener("load", function () {
  if (document.getElementById("editor")) {
    const editor = new Editor({
      element: document.getElementById("editor"),
      extensions: [StarterKit, Link.configure({ openOnClick: false })],
      content: "",
    });

    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "text",
          text: "Link name",
          marks: [
            {
              type: "link",
              attrs: { href: "https://google.com", target: "" },
            },
          ],
        },
      ])
      .run();
  }
});

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
window.addEventListener("phx:page-loading-start", (_info) => topbar.show(300));
window.addEventListener("phx:page-loading-stop", (_info) => topbar.hide());

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket;
