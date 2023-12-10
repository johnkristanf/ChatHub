"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JWT_1 = __importDefault(require("../middleware/JWT"));
const Accounts_1 = require("../model/Accounts");
const router = express_1.default.Router();
router.get('/', async (request, response) => {
    try {
        response.status(200).render('LandingPage/LandingPage');
    }
    catch (error) {
        console.error(error);
        request;
        response.status(500).send('Error Displaying Html Content');
    }
});
router.get('/auth', async (request, response) => {
    try {
        response.status(200).render('Forms/Auth');
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Displaying Html Forms Content');
    }
});
router.get('/account/verify', JWT_1.default.ValidateVerificationToken, async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            response.status(200).render('Verify/VerifyForm');
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Verifying User');
    }
});
router.get('/account/messages', JWT_1.default.ValidateToken, async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            response.status(200).render('MainPage/Messages/MessageContainer');
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Retrieving User Profile');
    }
});
router.get('/account/connect', JWT_1.default.ValidateToken, async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            response.status(200).render('MainPage/Friends/FriendsContainer');
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Retrieving User Profile');
    }
});
router.get('/account/profile', JWT_1.default.ValidateToken, async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { id } = request.user;
            const UserProfile = await Accounts_1.AccountModel.findById(id)
                .select('image fullname gender birthday email username');
            response.status(200).render('MainPage/Settings/SettingsContainer', { UserProfile });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Retrieving User Profile');
    }
});
exports.default = router;
//# sourceMappingURL=view_routes.js.map