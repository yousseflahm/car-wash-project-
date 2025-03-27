const Ziggy = {
    url: "http://localhost",
    port: null,
    defaults: {},
    routes: {
        "sanctum.csrf-cookie": {
            uri: "sanctum/csrf-cookie",
            methods: ["GET", "HEAD"],
        },
        dashboard: { uri: "client/dashboard", methods: ["GET", "HEAD"] },
        "profile.edit": { uri: "profile", methods: ["GET", "HEAD"] },
        "profile.update": { uri: "profile", methods: ["PATCH"] },
        "profile.destroy": { uri: "profile", methods: ["DELETE"] },
        register: { uri: "client/register", methods: ["GET", "HEAD"] },
        login: { uri: "client/login", methods: ["GET", "HEAD"] },
        "password.request": {
            uri: "client/forgot-password",
            methods: ["GET", "HEAD"],
        },
        "password.email": { uri: "client/forgot-password", methods: ["POST"] },
        "password.reset": {
            uri: "client/reset-password/{token}",
            methods: ["GET", "HEAD"],
            parameters: ["token"],
        },
        "password.store": { uri: "client/reset-password", methods: ["POST"] },
        "washer.verification.notice": {
            uri: "verify-email",
            methods: ["GET", "HEAD"],
        },
        "washer.verification.verify": {
            uri: "verify-email/{id}/{hash}",
            methods: ["GET", "HEAD"],
            parameters: ["id", "hash"],
        },
        "washer.verification.send": {
            uri: "email/verification-notification",
            methods: ["POST"],
        },
        "washer.password.confirm": {
            uri: "confirm-password",
            methods: ["GET", "HEAD"],
        },
        "washer.password.update": { uri: "password", methods: ["PUT"] },
        "washer.logout": { uri: "logout", methods: ["POST"] },
        "admin.register": { uri: "admin/register", methods: ["GET", "HEAD"] },
        "admin.login": { uri: "admin/login", methods: ["GET", "HEAD"] },
        "admin.login.post": { uri: "admin/login", methods: ["POST"] },
        "admin.dashboard": { uri: "admin/dashboard", methods: ["GET", "HEAD"] },
        "admin.logout": { uri: "admin/logout", methods: ["POST"] },
        "washer.register": { uri: "washer/register", methods: ["GET", "HEAD"] },
        "washer.login": { uri: "washer/login", methods: ["GET", "HEAD"] },
        "washer.login.post": { uri: "washer/login", methods: ["POST"] },
        "washer.password.request": {
            uri: "washer/forgot-password",
            methods: ["GET", "HEAD"],
        },
        "washer.password.email": {
            uri: "washer/forgot-password",
            methods: ["POST"],
        },
        "washer.password.reset": {
            uri: "washer/reset-password/{token}",
            methods: ["GET", "HEAD"],
            parameters: ["token"],
        },
        "washer.password.store": {
            uri: "washer/reset-password",
            methods: ["POST"],
        },
        "washer.dashboard": {
            uri: "washer/dashboard",
            methods: ["GET", "HEAD"],
        },
        "storage.local": {
            uri: "storage/{path}",
            methods: ["GET", "HEAD"],
            wheres: { path: ".*" },
            parameters: ["path"],
        },
    },
};
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
