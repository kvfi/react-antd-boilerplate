const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#2e848c',
            '@font-family': 'Space Grotesk',
            '@layout-header-background': '#000000'
        }
    })
)
