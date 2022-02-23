// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#0DA5FF",
              "@link-color": "#0DA5FF",
              "@font-size-base": "14px",
              "@heading-color": "rgba(0, 0, 0, 0.85)",
              "@text-color": "rgba(0, 0, 0, 0.65)",
              "@text-color-secondary": "rgba(0, 0, 0, 0.45)",
              "@disabled-color": "rgba(0, 0, 0, 0.25)",
              "@border-radius-base": "2px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
