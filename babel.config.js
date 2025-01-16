module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "inline-import",
      {
        extensions: [".sql"], // Les options doivent être dans un objet associé au plugin
      },
    ],
  ],
};
