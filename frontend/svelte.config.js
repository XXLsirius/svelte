import adapter from "@sveltejs/adapter-node";

export default {
  kit: {
    adapter: adapter(),
  },
};

/**  Below code is useful when you are going to build static pages and serve with nginx! **/
// import adapter from "@sveltejs/adapter-static";

// export default {
//   kit: {
//     adapter: adapter({
//       // default options are shown. On some platforms
//       // these options are set automatically — see below
//       pages: "som",
//       assets: "som",
//       fallback: "index.html",
//       precompress: false,
//       strict: true,
//     }),
//   },
// };
