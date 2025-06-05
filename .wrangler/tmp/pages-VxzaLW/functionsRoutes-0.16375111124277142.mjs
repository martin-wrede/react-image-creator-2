import { onRequest as __ai_js_onRequest } from "D:\\Documents\\CODING\\JAVASCRIPT\\react-image-creator\\functions\\ai.js"
import { onRequest as __airtable_js_onRequest } from "D:\\Documents\\CODING\\JAVASCRIPT\\react-image-creator\\functions\\airtable.js"

export const routes = [
    {
      routePath: "/ai",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__ai_js_onRequest],
    },
  {
      routePath: "/airtable",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__airtable_js_onRequest],
    },
  ]