import path from 'path'
import dotenv from 'dotenv'
import { connectToDatabase } from '../db'
import { TEAM_GROUPS, TeamGroup, TeamMemberModel } from '../models/TeamMember'

dotenv.config()
dotenv.config({ path: path.resolve(__dirname, '../../../.env') })
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

type SeedRow = { img?: string; name: string; role: string; phone?: string }

const PMT_EXECUTIVES: SeedRow[] = [
  { img: '/images/people/KKMA-K-SIDDIK-Chief-patron.jpg', name: 'K. SIDDIK', role: 'Chief Patron', phone: '+965 123 456 78' },
  { img: '/images/people/KKMA-Akbar-Sidique.jpg', name: 'AKBAR SIDDIQUE', role: 'Patron', phone: '+965 123 456 78' },
  { img: '/images/people/KKMA-A-P-ABDUL-SALAM.jpg', name: 'A. P. ABDUL SALAM', role: 'Chairman', phone: '+965 123 456 78' },
  { img: '/images/people/KKMA-IBRAHIM-KUNNIL.jpg', name: 'IBRAHIM KUNNIL', role: 'Vice Chairman', phone: '+965 123 456 78' },
  { img: '/images/people/KKMA-N-A-MUNEER.jpg', name: 'N.A. MUNEER', role: 'PMT Members', phone: '+965 123 456 78' },
  { img: '/images/people/KKMA-MOHAMMED-ALI-MATRA.jpg', name: 'MOHAMMED ALI MATRA', role: 'PMT Members', phone: '+965 123 456 78' },
  { img: '/images/people/KKMA-ABDUL-FATHAH-THAYYIL.jpg', name: 'ABDUL FATHAH THAYYIL', role: 'PMT Members', phone: '+965 123 456 78' },
]

const CC_OFFICE_BEARERS: SeedRow[] = [
  { img: '/images/people/KKMA-K-BASHEER.jpg', name: 'K. BASHEER', role: 'President', phone: '+965 69677996' },
  { img: '/images/people/KKMA-B-M-IQBAL.jpg', name: 'B. M. IQBAL', role: 'General Secretary', phone: '+965 99483350' },
  { img: '/images/people/KKMA-MUNEER-KUNIYA.jpg', name: 'MUNEER KUNIYA', role: 'Treasurer', phone: '+965 90027939' },
  { img: '/images/people/KKMA-H-A-GAFOOR.jpg', name: 'H.A. GAFOOR', role: 'Working President', phone: '+965 99765237' },
  { img: '/images/people/KKMA-O-P-SHARAFUDHEEN.jpg', name: 'O. P. SHARAFUDHEEN', role: 'Working President', phone: '+965 90060532' },
  { img: '/images/people/KKMA-K-C-RAFEEQUE.jpg', name: 'K. C. RAFEEQUE', role: 'Working President', phone: '+965 99514546' },
  { img: '/images/people/KKMA-MOHAMMED-RASHEED-ZAMZAM.jpg', name: 'MOHAMMED RASHEED ZAMZAM', role: 'Working President', phone: '+965 99428719' },
  { img: '/images/people/Mohamed-Navas-kkma.jpg', name: 'MOHAMED NAVAZ CEENDAVIDA', role: 'Organizing Secretary', phone: '+965 97130710' },
  { img: '/images/people/KKMA-O-M-SHAFI.jpg', name: 'O.M. SHAFI', role: 'Vice President', phone: '+965 66649544' },
  { img: '/images/people/KKMA-A-T-NOUFAL.jpg', name: 'A.T.NOUFAL', role: 'Vice President', phone: '+965 97420679' },
  { img: '/images/people/KKMA-P-M-JAFFER.jpg', name: 'P.M. JAFFER', role: 'Vice President', phone: '+965 66610087' },
  { img: '/images/people/KKMA-LATHEEF-EDAYOOR.jpg', name: 'LATHEEF EDAYOOR', role: 'Vice President', phone: '+965 66637447' },
  { img: '/images/people/KKMA-NIZAM-NALAKATH.jpg', name: 'NIZAM NALAKATH', role: 'Vice President', phone: '+965 99125481' },
  { img: '/images/people/KKMA-P-M-SHEREEF.jpg', name: 'P.M. SHEREEF', role: 'Vice President', phone: '+965 60610733' },
  { img: '/images/people/KKMA-T-FIROZ.jpg', name: 'T. FIROZ', role: 'Vice President', phone: '+965 99408973' },
  { img: '/images/people/KKMA-MAJEED-RAWABI.jpg', name: 'MAJEED RAWABI', role: 'Vice President', phone: '+965 66865382' },
  { img: '/images/people/KKMA-ASLAM-HAMZA.jpg', name: 'ASLAM HAMZA', role: 'Vice President', phone: '+965 51716683' },
  { img: '/images/people/KKMA-ASHARAF-MANKAV.jpg', name: 'ASHARAF MANKAVE', role: 'Vice President', phone: '+965 94739004' },
  { img: '/images/people/KKMA-JABBAR-GURPURA.jpg', name: 'JABBAR GURPURA', role: 'Vice President', phone: '+965 66015758' },
  { img: '/images/people/KKMA-ABDUL-KALAM-MOULAVI.jpg', name: 'ABDUL KALAM MOULAVI', role: 'Vice President', phone: '+965 55226268' },
  { img: '/images/people/Muhammed-Kunji-kkma.jpg', name: 'K. H. MUHAMMED KUNJI', role: 'Vice President', phone: '+965 99590480' },
  { img: '/images/people/KKMA-M-P-SULFIQUER.jpg', name: 'M. P. SULFIQUER', role: 'Secretary', phone: '+965 97834590' },
  { img: '/images/people/KKMA-K-C-KAREEM.jpg', name: 'K. C. KAREEM', role: 'Secretary', phone: '+965 66644175' },
  { img: '/images/people/KKMA-P-A-ABDULLA.jpg', name: 'P. A. ABDULLA', role: 'Secretary', phone: '+965 66608287' },
  { img: '/images/people/KKMA-MUHAMMED-ALI-KADINJIMOOLA.jpg', name: 'MUHAMMED ALI KADINJIMOOLA', role: 'Secretary', phone: '+965 66053044' },
]

const AHMADI_ZONAL_COMMITTEE: SeedRow[] = [
  { name: 'Haris P.M.', role: 'President', phone: '69697991' },
  { name: 'Mohammed Rafeeque K. T.', role: 'General Secretary', phone: '99840697' },
  { name: 'Niyad K.P', role: 'Treasurer', phone: '51211001' },
  { name: 'Mohammed Rafeeque K. T.', role: 'Ag. Vice President Membership', phone: '99840697' },
  { name: 'Firos T.', role: 'Vice President (FBS & MWS)', phone: '99408973' },
  { name: 'Basheer Udinoor', role: 'Vice President (Social Projects)', phone: '94000392' },
  { name: 'Ashraf Ali', role: 'Vice President (Relief)', phone: '99682119' },
  { name: 'Saleem Kommeri', role: 'Vice President (Magnet)', phone: '94993120' },
  { name: 'C.M. Ashraf', role: 'Vice President (Arts, Sports & Event Management)', phone: '66616501' },
  { name: 'Abdul Rasheed', role: 'Vice President (Skill Development & Moral Development)', phone: '50454585' },
  { name: 'Naser M.T', role: 'Vice President (Student Development & Family Club)', phone: '69080303' },
  { name: 'Mohammed Yaseen', role: 'IT Secretary', phone: '60077428' },
  { name: 'Shaheer Ahmed', role: 'Admin Secretary', phone: '60655992' },
  { name: 'Sharafudeen Ckm', role: 'Communication Secretary', phone: '99267163' },
]

const CITY_ZONAL_COMMITTEE: SeedRow[] = [
  { name: 'Abdul Lathif Shedia', role: 'President', phone: '66765892' },
  { name: 'Abdul Razak', role: 'General Secretary', phone: '99702396' },
  { name: 'Kamarudheen P', role: 'Treasurer', phone: '99641052' },
  { name: 'Mohammed Raees VK', role: 'Secretary (Administration & IT)', phone: '50199030' },
  { name: 'Abdulla Karambra', role: 'Secretary (Communication)', phone: '99750546' },
  { name: 'Jaffar. Panankandy', role: 'Vice President (Membership ,Health Scheme & Privilege Card)', phone: '98594480' },
  { name: 'Naseer Karamkulangara', role: 'Vice President (FBS, MWS)', phone: '55887486' },
  { name: 'Abdulla Vavad', role: 'Vice President (Social Projects (MAP, HIP, FD & DWW), Fund Drive)', phone: '67736765' },
  { name: 'Mohammed Hadad CH', role: 'Vice President (Relief Cell & KDRC)', phone: '97472101' },
  { name: 'NAJMUDDEN TC', role: 'Vice President (Magnet, Legal Cell & Employment Cell)', phone: '50209565' },
  { name: 'Noushad AK', role: 'Vice President (Arts & Sports, Event Management)', phone: '919048747247' },
  { name: 'Mustafa AT', role: 'Vice President (Skill Development & Moral Development (Religious))', phone: '51254333' },
  { name: 'Majeed Karadi K C', role: 'Vice President (Students Development & Family Club)', phone: '65859412' },
]

const FARWANIYA_ZONAL_COMMITTEE: SeedRow[] = [
  { name: 'MOHAMMED SALEEM. P P P', role: 'President', phone: '99321831' },
  { name: 'Mr PV. MOUIDEEN KOYA', role: 'Working President (Zone)', phone: '99481932' },
  { name: 'Mr SABIR MOHAMMED', role: 'Vice President - Membership', phone: '97207221' },
  { name: 'Mr Najumudheen', role: 'Vice President - Health Scheme', phone: '67036073' },
  { name: 'Mr Abdul Gafoor', role: 'Vice President - Social Projects (MAP, HIP, FD & DWW)', phone: '67030025' },
  { name: 'Haneefa Padanna', role: 'Vice President - Fund Drive & KDRC', phone: '67623861' },
  { name: 'C A Mohammed', role: 'Vice President - Relief Cell', phone: '55610012' },
  { name: 'Mr Yakoob Elathoor', role: 'Vice President - Magnet', phone: '99783716' },
  { name: 'Mr Rafeeq Usman', role: 'Vice President - Employment Cell', phone: '99417062' },
  { name: 'Mr Mahmood Perumba', role: 'Vice President - Arts & Sports', phone: '50276444' },
  { name: 'Mr Shamseer Naser', role: 'Vice President - Event Management', phone: '50084100' },
  { name: 'Mr Shameer Jaleeb', role: 'Vice President - Skill Development', phone: '99112778' },
  { name: 'Mr Sidheeq Sabhan', role: 'Vice President - Students Development', phone: '97397143' },
  { name: 'Mr Jamsheed', role: 'General Secretary', phone: '94068738' },
  { name: 'Mr Sideeq (Jaleeb)', role: 'Secretary - Administration', phone: '99208625' },
  { name: 'Mr Usman Madathil', role: 'Secretary - Communication', phone: '99129503' },
  { name: 'Dr S Muhammed', role: 'Treasurer', phone: '66915688' },
]

function toDocs(rows: SeedRow[], group: TeamGroup) {
  return rows.map((row, i) => ({
    name: row.name,
    role: row.role,
    group,
    phone: row.phone || '',
    photoPath: row.img,
    displayOrder: i + 1,
    isActive: true,
  }))
}

async function run() {
  await connectToDatabase()

  const del = await TeamMemberModel.deleteMany({ group: { $in: [...TEAM_GROUPS] } })
  console.log(`[seed:team] removed ${del.deletedCount} existing team rows in groups: ${TEAM_GROUPS.join(', ')}`)

  const docs = [
    ...toDocs(PMT_EXECUTIVES, 'pmt_executives'),
    ...toDocs(CC_OFFICE_BEARERS, 'central_committee_office_bearers'),
    ...toDocs(AHMADI_ZONAL_COMMITTEE, 'ahmadi_zonal_committee'),
    ...toDocs(CITY_ZONAL_COMMITTEE, 'city_zonal_committee'),
    ...toDocs(FARWANIYA_ZONAL_COMMITTEE, 'farwaniya_zonal_committee'),
  ]
  const created = await TeamMemberModel.insertMany(docs)
  console.log(
    `[seed:team] inserted ${created.length} members (${PMT_EXECUTIVES.length} PMT + ${CC_OFFICE_BEARERS.length} CC + ${AHMADI_ZONAL_COMMITTEE.length} Ahmadi + ${CITY_ZONAL_COMMITTEE.length} City + ${FARWANIYA_ZONAL_COMMITTEE.length} Farwaniya)`,
  )
  process.exit(0)
}

run().catch((err) => {
  console.error('[seed:team] failed:', err)
  process.exit(1)
})
