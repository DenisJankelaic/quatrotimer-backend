var config = {
    production: {
        SECRET: process.env.SECRET
    },
    default: {
        SECRET: "0123456789"
    }
};
exports.get = function get(env) {
    return config[env] || config.default;
};
//# sourceMappingURL=config.js.map