"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsPost = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const NewsPostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    href: { type: String, required: true },
    img: { type: String },
    imagePath: { type: String },
    content: { type: String },
    contentHtml: { type: String },
    excerpt: { type: String },
    slug: { type: String, index: true, unique: false },
    featuredAlt: { type: String },
    featuredCaption: { type: String },
    galleryPaths: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    seoTitle: { type: String },
    seoDescription: { type: String },
    date: {
        day: { type: String, required: true },
        monthYear: { type: String, required: true }
    },
    category: { type: String, required: true },
    author: { type: String, required: true },
    comments: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { collection: 'newposts' });
NewsPostSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
exports.NewsPost = mongoose_1.default.models.NewsPost || mongoose_1.default.model("NewsPost", NewsPostSchema);
