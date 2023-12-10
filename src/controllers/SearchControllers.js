"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnFriendController = exports.GetFriendsListController = exports.GetFriendsListIDController = exports.GetFriendRequestListController = exports.GetProfileController = exports.SearchFriendController = void 0;
const Accounts_1 = __importDefault(require("../model/Accounts"));
const Accounts_2 = require("../model/Accounts");
const SearchFriendController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { fullname } = request.params;
            const searchFriend = await Accounts_1.default.Search(fullname);
            console.log('searchFriend', searchFriend);
            if (searchFriend || searchFriend === undefined) {
                response.status(200).send({
                    searchResponseData: searchFriend || 'Undefined'
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Searching Friend');
    }
};
exports.SearchFriendController = SearchFriendController;
const GetProfileController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { user_id } = request.params;
            const FriendProfile = await Accounts_1.default.Profile(user_id);
            if (FriendProfile) {
                response.status(200).send({
                    FriendProfile: FriendProfile
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Searching Friend');
    }
};
exports.GetProfileController = GetProfileController;
const GetFriendRequestListController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const RecipientData = await Accounts_2.AccountModel.find({ _id: request.user.id }).select('friendRequests');
            if (RecipientData) {
                for (const data of RecipientData) {
                    response.status(200).send({
                        SenderData: data.friendRequests
                    });
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Getting FriendRequest Friend');
    }
};
exports.GetFriendRequestListController = GetFriendRequestListController;
const GetFriendsListIDController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const listID = await Accounts_2.AccountModel.find({ _id: request.user.id }).select('friends');
            if (listID)
                response.status(200).send({
                    listID: listID
                });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Getting Friends List');
    }
};
exports.GetFriendsListIDController = GetFriendsListIDController;
const GetFriendsListController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { friendIDArray } = request.body;
            const friendData = await Accounts_2.AccountModel.find({ _id: { $in: friendIDArray } })
                .select('image fullname email birthday gender username activity');
            if (friendData)
                response.status(200).send({
                    friendData: friendData
                });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Getting Friends List');
    }
};
exports.GetFriendsListController = GetFriendsListController;
const UnFriendController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { friend_id } = request.params;
            const { id } = request.user;
            const updateUserData = await updateUserDataAfterUnfriend(id, friend_id);
            const updateFriendData = await updateFriendDataAfterUnfriend(id, friend_id);
            if (updateUserData && updateFriendData)
                response.status(200).send('Unfriend Successfully');
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Getting Friends List');
    }
};
exports.UnFriendController = UnFriendController;
const updateUserDataAfterUnfriend = async (id, friend_id) => {
    const user = await Accounts_2.AccountModel.find({ _id: id }).select('friends');
    const unfriend = user[0].friends.filter((id) => friend_id !== id);
    return await Accounts_2.AccountModel.findByIdAndUpdate(id, {
        friends: unfriend
    });
};
const updateFriendDataAfterUnfriend = async (id, friend_id) => {
    const friend = await Accounts_2.AccountModel.find({ _id: friend_id }).select('friends');
    const Unfriend = friend[0].friends.filter((user_id) => id !== user_id);
    return await Accounts_2.AccountModel.findByIdAndUpdate(friend_id, {
        friends: Unfriend
    });
};
//# sourceMappingURL=SearchControllers.js.map