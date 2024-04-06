
// import { refreshAccessToken, refreshToken } from "../services/user_service";
// export const checkAccessTokenExpiration = async () => {
//     const expirationTime = 24 * 60 * 60 * 1000;
//     setInterval(async () => {
//         try {
//             const rs = await refreshAccessToken();
//             console.log(rs);
//         } catch (error) {
//             console.log(error.message);
//         }
//     }, expirationTime);
// }
// export const resetToken = async () => {
//     setInterval(async () => {
//         try {
//             const rs = await refreshToken();
//             console.log(rs);
//         } catch (error) {
//             console.log(error.message);
//         }
//     }, 20 * 24 * 60 * 60 * 1000)
// }