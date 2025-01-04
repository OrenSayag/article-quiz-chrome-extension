import "./style.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "article-quiz-content-box",
      position: "inline",
      onMount: (container) => {
        console.log(container);
        const root = ReactDOM.createRoot(container);
        root.render(
          <ThemeProvider>
            <App container={container} />
          </ThemeProvider>,
        );
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
