import Router from "next/router";

export function isAuthenticated(context) {
    return !!context.cookie.get("jwt");
}

export function redirectIfAuthenticated(context) {
    if (isAuthenticated(context)) {
        redirect("/", context);

        return true;
    }

    return false;
}

export function redirectIfNotAuthenticated(context) {
    if (!isAuthenticated(context)) {
        redirect("/login", context);

        return true;
    }

    return false;
}

export function redirect(target, context = {}) {
    if (context.res) {
        // server
        // 303: "See other"
        context.res.writeHead(303, { Location: target });
        context.res.end();
    } else {
        // In the browser, we just pretend like this never even happened ;)
        Router.replace(target);
    }
}