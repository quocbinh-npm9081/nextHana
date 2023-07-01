export { default } from "next-auth/middleware";
//protected route with NextAuth
export const config = { matcher: ["/user/shipping", "/events/minigame"] };
