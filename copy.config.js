module.exports = {
  copyMaterialIcons: {
    src: ['{{ROOT}}/node_modules/ionic2-material-icons/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyMaterializeCss: {
    src: ['{{ROOT}}/node_modules/materialize-css/dist/css/materialize.min.css'],
    dest: '{{BUILD}}'
  }
};