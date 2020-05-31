"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoggedUser_1 = require("../../../Entities/LoggedUser");
var User_1 = require("../../../Entities/User");
var user_model_1 = require("../user.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var keys = require("../../../../config/key");
var UserDBImpl = /** @class */ (function () {
    function UserDBImpl() {
    }
    UserDBImpl.prototype.getToken = function (nickname, _id) {
        return ("Bearer " +
            jwt.sign({
                nickname: nickname,
                id: _id,
            }, keys.secretOrKey));
    };
    UserDBImpl.prototype.findUserToLogin = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser, isMatch, token, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, user_model_1.default.findOne({
                                $or: [{ nickname: user.nickname }, { email: user.email }],
                            })];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(user.password, foundUser.password)];
                    case 2:
                        isMatch = _a.sent();
                        if (isMatch) {
                            token = this.getToken(foundUser.name, foundUser.id);
                            return [2 /*return*/, new LoggedUser_1.default(foundUser.nickname, foundUser.email, token)];
                        }
                        else {
                            return [2 /*return*/, Promise.reject("La contraseña o el usuario no coinciden.")];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, Promise.reject("La contraseña o el usuario no coinciden.")];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        throw new Error(err_1.message);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserDBImpl.prototype.addUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, newUser, savedUser, token, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
                        newUser = new user_model_1.default({
                            name: user.name,
                            surname: user.surname,
                            nickname: user.nickname,
                            email: user.email,
                            password: user.password,
                        });
                        newUser.password = hashedPassword;
                        return [4 /*yield*/, user_model_1.default.create(newUser)];
                    case 1:
                        savedUser = _a.sent();
                        token = this.getToken(savedUser.name, savedUser.id);
                        return [2 /*return*/, new LoggedUser_1.default(savedUser.nickname, savedUser.email, token)];
                    case 2:
                        err_2 = _a.sent();
                        throw new Error(err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserDBImpl.prototype.validateToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.decodeToken(token)];
                    case 1:
                        decoded = _a.sent();
                        return [4 /*yield*/, user_model_1.default.findById(decoded.id)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, new User_1.default(user.nickname, user.email, null, null, user.name, user.surname)];
                }
            });
        });
    };
    UserDBImpl.prototype.decodeToken = function (token) {
        return new Promise(function (resolve, reject) {
            jwt.verify(token, keys.secretOrKey, function (err, decoded) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(decoded);
            });
        });
    };
    return UserDBImpl;
}());
exports.default = UserDBImpl;
//# sourceMappingURL=UsersDBImpl.js.map