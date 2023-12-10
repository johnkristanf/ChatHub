"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const JWT_1 = __importDefault(require("../middleware/JWT"));
const ProfileController_1 = require("../controllers/ProfileController");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/userImages/');
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.split('.');
        const getFileExtension = filename[filename.length - 1];
        cb(null, `${req.user.fullname}ProfilePicture.${getFileExtension}`);
    },
});
const profileUpload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
router.put('/update/profile_picture', JWT_1.default.ValidateToken, profileUpload.single('ProfilePicture'), ProfileController_1.UpdateProfilePictureController);
router.put('/update/fullname', JWT_1.default.ValidateToken, ProfileController_1.UpdateFullNameController);
router.put('/update/username', JWT_1.default.ValidateToken, ProfileController_1.UpdateUserNameController);
router.put('/update/email', JWT_1.default.ValidateToken, ProfileController_1.UpdateEmailController);
router.put('/update/password', JWT_1.default.ValidateToken, ProfileController_1.UpdatePasswordController);
router.put('/update/bday_gender', JWT_1.default.ValidateToken, ProfileController_1.UpdateBday_GenderController);
exports.default = router;
//# sourceMappingURL=profile_routes.js.map