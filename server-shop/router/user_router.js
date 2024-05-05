import { Router } from "express";
import { login, register, logout, refresh_token, getAll, detailUser, deleteUser, resetPassword, updateUser, forgetPassword, getCurrentUser, loginByGoogle, resetPasswordCurrentUser } from "../controllers/user_controller.js";
import { register_validator, login_validator } from "../validator/user_validator.js";
import passport from "passport";
import { authRole, checkAuth } from "../middleware/check_auth.js";

const router = Router();
router.get('/auth/google', passport.authenticate('google'));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/', successRedirect: 'http://localhost:5173/client' }));

router.get('/login/google/success', loginByGoogle)

router.post('/logout/google', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy(function (err) {
            if (err) {
                console.log("error: " + err);
                res.status(500).json({ message: "Error destroying session" });
            } else {
                res.clearCookie('connect.sid');
                res.clearCookie("refresh_token")
                res.clearCookie("access_token")
                res.status(200).json({ message: "Logged out successfully" });
            }
        });
    });

});

router.get('/users', getAll)
router.get('/users/:user_id', detailUser)
router.get('/user', checkAuth, authRole([0, 1, 2, 3]), getCurrentUser)

router.put('/users/:user_id', updateUser)
router.put('/reset-password', resetPassword)
router.put('/reset-password-current', checkAuth, authRole([0, 2, 3]), resetPasswordCurrentUser)

router.delete('/users/delete/:user_id', deleteUser)

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forget-password', forgetPassword)

router.post('/refresh_token', refresh_token)

export default router;