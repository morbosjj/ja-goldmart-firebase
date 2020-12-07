const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),

  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#FFB401',
        'layout-header-background': '#FFFFFF',
        'layout-header-padding': '0px',
        'layout-footer-padding': '0px',
        'menu-item-color': '#000000',
      },
    },
  })
);
