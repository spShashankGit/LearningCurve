module.exports = function (config) {
    config.set({
        basePath: '../',
        files: [
            "tests/**/*js"
        ],
        autoWatch: true,
        frameworks: ["jasmine"],
        browsers: ["Chrome_with_debugging"],
        customLaunchers: {
            Chrome_with_debugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9222'],
                debug: true
            }
        },
        plugins: [
            "karma-chrome-launcher",
            "karma-jasmine"
        ],
        junitReporter: {
            outputFile: "test_out/unit.xml",
            suite: "unit"
        }
    });
};