import { handlerPath } from "@libs/handler-resolver";

const signUp = {
    handler: `${handlerPath(__dirname)}/handler.signUp`,
    events: [
        {
            http: {
                method: "post",
                path: "sign-up",
            },
        },
    ],
};

export { signUp };
