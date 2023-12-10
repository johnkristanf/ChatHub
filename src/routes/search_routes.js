"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JWT_1 = __importDefault(require("../middleware/JWT"));
const SearchControllers_1 = require("../controllers/SearchControllers");
const router = express_1.default.Router();
router.get('/search/friend/:fullname', JWT_1.default.ValidateToken, SearchControllers_1.SearchFriendController);
router.get('/get/profile/:user_id', JWT_1.default.ValidateToken, SearchControllers_1.GetProfileController);
router.get('/get/FriendRequestList', JWT_1.default.ValidateToken, SearchControllers_1.GetFriendRequestListController);
router.get('/get/friendsID', JWT_1.default.ValidateToken, SearchControllers_1.GetFriendsListIDController);
router.post('/get/friends/list', JWT_1.default.ValidateToken, SearchControllers_1.GetFriendsListController);
router.put('/unfriend/:friend_id', JWT_1.default.ValidateToken, SearchControllers_1.UnFriendController);
exports.default = router;
//# sourceMappingURL=search_routes.js.map