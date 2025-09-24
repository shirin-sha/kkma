"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../db");
const NewsPost_1 = require("../models/NewsPost");
// Load env from project root, then server/.env
dotenv_1.default.config();
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
async function run() {
    await (0, db_1.connectToDatabase)();
    const items = [
        { date: { day: '12', monthYear: "Sep’25" }, title: 'കെ.കെ.എം.എ ഖൈത്താൻ ബ്രാഞ്ച് ഉപഹാരം നൽകി ആദരിച്ചു' },
        { date: { day: '12', monthYear: "Sep’25" }, title: 'കെ. കെ. എം. എ. യാത്രയപ്പ്നൽകി' },
        { date: { day: '10', monthYear: "Sep’25" }, title: 'കെ.കെ.എം.എ മുലാഖാത് 2025' },
        { date: { day: '07', monthYear: "Sep’25" }, title: 'കെ.കെ.എം എ. വയനാട് ജില്ലാ വിദ്യാഭ്യാസ അവാർഡ് വിതരണം ചെയ്തു.' },
        { date: { day: '31', monthYear: "Aug’25" }, title: 'ഇഷ്‌ഖേ റസൂൽ 2025: പ്രവാചക സ്നേഹത്തിന്റെ നിറവിൽ ഒരു സായാഹ്നം.' },
        { date: { day: '27', monthYear: "Aug’25" }, title: 'മുനീർ കോടി സാഹിബ്‌ പ്രസ്ഥാനവീഥിയിലെ കർമ്മയോഗി : കെ കെ. എം എ' },
        { date: { day: '27', monthYear: "Aug’25" }, title: 'തൃശൂർ ജില്ലാ വിദ്യാർത്ഥികൾക്കൾക്കായി കെ.കെ.എം.എ വിദ്യാഭാസ അവാർഡ് ദാനവും അനുമോദനവും സംഘടിപ്പിച്ചു.' },
        { date: { day: '23', monthYear: "Aug’25" }, title: 'കെ. കെ. എം. എ. ഇഷ്‌ഖേ റസൂൽ ഓഗസ്റ്റ് 29 ന്' },
        { date: { day: '20', monthYear: "Aug’25" }, title: 'കെ കെ എം എ യൂത്ത് വിംഗ് നിലവിൽ വന്നു' },
        { date: { day: '18', monthYear: "Aug’25" }, title: 'കെ. കെ. എം. എ വിദ്യാർത്ഥികൾക്ക് അനുമോദനവും അവാർഡ് ദാനവും സംഘടിപ്പിച്ചു.' },
        { date: { day: '11', monthYear: "Aug’25" }, title: 'ഉന്നത വിജയികളെ ആദരിച്ച് കുവൈറ്റ് കേരള മുസ്ലിം അസോസിയേഷൻ' },
        { date: { day: '10', monthYear: "Aug’25" }, title: 'കുവൈത്തിൽ മാനുഷിക സേവനത്തിന്റെ പ്രതീകമായ മാഗ്നെറ്റിനു ആദരവ്.' },
        { date: { day: '16', monthYear: "Feb’25" }, title: 'കെ.കെ.എം.എ. ‘മർഹബ യാ ശഹ്റു റമദാൻ’ മത പ്രഭാഷണം സംഘടിപ്പിച്ചു.', category: 'All News & Updates, KKMA UPDATES, News Kuwait' },
        { date: { day: '04', monthYear: "Feb’25" }, title: 'പ്രവാസിയും മാനസിക പ്രശ്നങ്ങളും കെ. കെ. എം. എ. വെബിനാർ സംഘടിപ്പിച്ചു', category: 'All News & Updates, KKMA UPDATES' },
        { date: { day: '30', monthYear: "Jan’25" }, title: 'കെ.കെ.എം.എ. വിദ്യാഭാസ സ്കോളർഷിപ്പ് 2025 വിതരണം ചെയ്തു.', category: 'All News & Updates, KKMA UPDATES' },
        { date: { day: '30', monthYear: "Jan’25" }, title: 'ഓർമകളിൽ മധുരം നിറച്ച് കെ.കെ.എം.എ ‘മെഹഫിൽ ഫൺ‌ഡേ 2025′ പിക്നിക്ക്', category: 'All News & Updates, KKMA UPDATES' },
        { date: { day: '29', monthYear: "Dec’24" }, title: 'എഴുത്തുകാരൻ എം.ടി വാസുദേവൻ നായരുടെ വിടവാങ്ങൽ.കെ.കെ.എം.എ അനുശോചിച്ചു' },
        { date: { day: '29', monthYear: "Dec’24" }, title: 'മൻ മോഹൻ സിംഗിൻ്റെ മരണത്തിൽ കെ.കെ.എം.എ അനുശോചനം' },
        { date: { day: '22', monthYear: "Dec’24" }, title: 'സക്കീർ ഹുസൈൻ തുവൂരിന് കെ.കെ.എം.എ യാത്രയയപ്പ് നൽകി', category: 'All News & Updates, News Kuwait' },
        { date: { day: '02', monthYear: "Dec’24" }, title: 'ആസ്റ്റർ മിംസ് ഡയറക്ടർ എം.സലാഹുദ്ധീന് കെ.കെ.എം.എ സ്വീകരണം' },
    ];
    // Defaults
    const DEFAULT_CATEGORY = 'All News & Updates';
    const DEFAULT_AUTHOR = 'kadmin';
    const DEFAULT_COMMENTS = 0;
    const LISTING_URL = 'https://kkma.net/news-updates/';
    const upserts = items.map((it) => ({
        updateOne: {
            filter: { title: it.title },
            update: {
                $setOnInsert: {
                    href: LISTING_URL,
                    img: undefined,
                    author: DEFAULT_AUTHOR,
                },
                $set: {
                    title: it.title,
                    date: it.date,
                    category: it.category || DEFAULT_CATEGORY,
                    comments: DEFAULT_COMMENTS,
                    updatedAt: new Date(),
                },
            },
            upsert: true,
        },
    }));
    const result = await NewsPost_1.NewsPost.bulkWrite(upserts);
    console.log('[seed:news] completed:', JSON.stringify(result, null, 2));
    process.exit(0);
}
run().catch((err) => {
    console.error('[seed:news] failed:', err);
    process.exit(1);
});
