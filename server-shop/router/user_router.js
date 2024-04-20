import { Router } from "express";
import { login, register, logout, refresh_token, getAll, detailUser, deleteUser, resetPassword, updateUser, forgetPassword } from "../controllers/user_controller.js";
import { register_validator, login_validator } from "../validator/user_validator.js";
import passport from "passport";

const router = Router();
router.get('/auth/google', passport.authenticate('google'));
router.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173c/client', successRedirect: 'http://localhost:5173/client' }));

router.get('/users', getAll)
router.get('/users/detail/:user_id', detailUser)

router.put('/users/update/:user_id', updateUser)
router.put('/reset-password', resetPassword)

router.delete('/users/delete/:user_id', deleteUser)

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forget-password', forgetPassword)

router.post('/refresh_token', refresh_token)

export default router;