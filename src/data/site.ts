import legacy from './legacy-content.json';
import media from './legacy-media.json';
import recognitionEvidence from './member-recognitions.json';
export const currentTenureYear = '2026-27';
export const boardGroup = `BOD ${currentTenureYear.replace('-', '/')}`;
const clubCoordinates = { latitude: 27.720033572533616, longitude: 85.32123231349269 };
const clubMapQuery = `${clubCoordinates.latitude},${clubCoordinates.longitude}`;

export const site = {
  clubName: 'Rotary Club of Kasthamandap',
  charterDate: legacy.charterDate,
  rotaryYear: currentTenureYear.replace('-', '–'),
  shortName: 'RCK',
  district: 'Rotary International District 3292',
  theme: 'Serve with Soul',
  anniversaryPopup: false,
  contact: {
    email: 'purushottam19720417@gmail.com',
    phone: '+977 9851050272',
    address: 'Kathmandu, Nepal',
    coordinates: clubCoordinates,
    map: `https://www.google.com/maps?q=${clubMapQuery}&z=17&output=embed`,
    mapLink: `https://www.google.com/maps?q=${clubMapQuery}`
  },
  // PLACEHOLDER: confirm the real community contribution total before launch.
  totalContributionValue: '$1M+',
  impact: [
    { value: '25', label: 'years of service' },
    { value: '84', label: 'projects completed' },
    { value: '60', label: 'active members' },
    { value: '18k+', label: 'lives served' }
  ]
};


export type PhotoCrop = { source: string; sourceWidth: number; sourceHeight: number; x: number; y: number; width: number; height: number };
export type Recognition = { label: string; shortLabel?: string; years?: string; recordedYear?: string; sourceUrl?: string };
export type MemberProfile = { recognitions: Recognition[]; status: 'current' | 'past'; joinedYear?: number; leftYear?: number; lastRole?: string; contributions?: string[]; whereNow?: string; presidentId?: string; id: string; name: string; role: string; group: string; bio: string; image: string; photoCrop?: PhotoCrop; memberSince: string; profession: string; organization: string; achievements: string[]; interests: string; showContact: boolean; email: string; phone: string; isPastPresident?: boolean; isMajorDonor?: boolean; sourceUrl?: string; sourceImage?: string; sourceYear?: string; directoryText?: string; recognition?: string; legacyRole?: string };
// Update this leadership lineup and its transparent portraits each Rotary year.
export const leaders = [
  { id: 'sponsor-president', name: 'Sailesh Vaidya', title: 'President', photo: '/images/leaders/rotary-club-president.png', portrait: { height: '96%', bottom: '0%' }, org: site.clubName },
  { id: 'district-governor', name: 'Vishnu Bdr. Karkee', title: 'District Governor', photo: '/images/leaders/district-governor.png', portrait: { height: '104%', bottom: '-6%' }, org: 'Rotary District 3292' },
  { id: 'ri-president', name: 'Olayinka Hakeem Babalola', title: 'President', photo: '/images/leaders/ri-president.png', portrait: { height: '82%', bottom: '19%' }, org: 'Rotary International' }
];
export const clubPresident = leaders[0];
export const districtGovernor = leaders[1];
export const riPresident = leaders[2];


// A dated directory is not evidence of current office or departure. Only the current
// president has a confirmed 2026–27 board assignment. Contact OCR awaits review.
const documentedRecognitions: Record<string, Recognition[]> = recognitionEvidence;
export const souvenirs: { id: string; title: string; year: string; file: string; description: string }[] = [];
export const members: MemberProfile[] = legacy.members.map(person => {
  const current = person.name === clubPresident.name;
  return {
    ...person, id: current ? 'bod-0' : person.id, status: 'current',
    group: current ? boardGroup : 'General Members',
    role: current ? `President ${site.rotaryYear}` : person.legacyRole === 'Honorary Member' ? 'Honorary Member' : 'Directory Member',
    bio: current ? `${clubPresident.title}, ${clubPresident.org} · RY ${site.rotaryYear}.` : [person.profession, `Listed in the archived ${person.directoryYear} directory`].filter(Boolean).join(' · '),
    image: current ? clubPresident.photo : person.portrait ? person.sourceImage : '/images/leaders/person-placeholder.svg',
    photoCrop: current ? undefined : person.portrait,
    memberSince: '', achievements: [], interests: '', showContact: false,
    sourceYear: person.directoryYear,
    recognitions: [
      { label: 'Paul Harris Fellow', shortLabel: 'PHF' },
      ...(person.recognition === 'MPHF' ? [{ label: 'Multiple Paul Harris Fellow', shortLabel: 'MPHF', recordedYear: person.directoryYear, sourceUrl: person.sourceImage }] : []),
      ...(person.recognition === 'PHS' ? [{ label: 'Paul Harris Society', shortLabel: 'PHS', recordedYear: person.directoryYear, sourceUrl: person.sourceImage }] : []),
      ...(person.isMajorDonor ? [{ label: 'Major Donor', shortLabel: 'Major Donor', recordedYear: person.directoryYear, sourceUrl: person.sourceImage }] : []),
      ...(documentedRecognitions[person.id] ?? [])
    ],
    ...(current || person.isPastPresident ? { presidentId: current ? `president-${currentTenureYear}` : `president-${person.id}` } : {})
  };
});
// Explicit sample plans requested for the current year; no invented dates, funding or outcomes.
const currentProjectDrafts = [
  { id: 'draft-community-health', title: 'Community Health Outreach', image: '/images/projects/health-outreach.svg', avenue: 'Service', summary: 'A proposed day of basic health screening and community health education, developed with local partners.' },
  { id: 'draft-learning-access', title: 'Learning Without Barriers', image: '/images/projects/learning-access.svg', avenue: 'Youth', summary: 'A proposed education initiative supporting accessible learning materials and opportunities for young people.' },
  { id: 'draft-service-fellowship', title: 'Fellowship Through Service', image: '/images/projects/service-fellowship.svg', avenue: 'Fellowship', summary: 'A proposed gathering connecting members and partners around a shared community service activity.' }
].map(item => ({ ...item, slug: item.id, date: '', eventDate: '', dateLabel: 'Dates to be confirmed', tenureYear: currentTenureYear, status: 'upcoming' as string, location: 'Kathmandu · venue to be confirmed', image: item.image, featured: false, isDraft: true, excerpt: item.summary, paragraphs: [item.summary, 'This is sample content for the current Rotary year. The club will confirm the project scope, partners, dates and budget before publication as an approved activity.'], bodyText: item.summary, sourceUrl: '' }));
export const projects = [
  ...currentProjectDrafts,
  ...legacy.articles.map(article => ({ ...article, summary: article.excerpt, date: article.eventDate, status: 'completed' as string, isDraft: false }))
];
export const news = legacy.articles.map(article => ({ ...article, type: 'Club News', author: 'Rotary Club of Kasthamandap archive', readTime: `${Math.max(1, Math.ceil(article.bodyText.split(/\s+/).length / 200))} min read`, tags: [article.avenue, 'Club archive'] }));
export const gallery = legacy.gallery;
export const archive = legacy;
export const foundingTenureStart = Number(legacy.charterDate.slice(0, 4));
export const tenureYears = Array.from({ length: 2026 - foundingTenureStart + 1 }, (_, i) => { const year = 2026 - i; return `${year}-${String(year + 1).slice(-2)}`; });
export type President = { id: string; name: string; photo: string; photoCrop?: PhotoCrop; tenure: string; order: number; isCharter: boolean; isPlaceholder: boolean; bio: string; projects: { title: string; year: string; description: string }[]; financialContribution: string; achievements: string[]; sourceUrl?: string };
const knownTenures: Record<string, string> = legacy.presidentTenures;
export const presidents: President[] = members.filter(person => person.isPastPresident || person.id === 'bod-0').map(person => ({
  id: person.presidentId!, name: person.name, photo: person.image, photoCrop: person.photoCrop,
  tenure: person.id === 'bod-0' ? currentTenureYear : knownTenures[person.id] ?? (person.id === 'gajendra-bdr-shrestha' ? 'Charter president · 2001' : 'Tenure not recorded'),
  order: person.id === 'gajendra-bdr-shrestha' ? 0 : knownTenures[person.id] ? Number(knownTenures[person.id].slice(0,4)) : 3000,
  isCharter: person.id === 'gajendra-bdr-shrestha', isPlaceholder: false,
  bio: person.id === 'bod-0' ? person.bio : person.id === 'prof-dr-manohar-lal-shrestha' ? 'Recorded as club president at the Silver Jubilee celebration in January 2026.' : `${person.name} is identified as ${person.id === 'gajendra-bdr-shrestha' ? 'charter president' : 'a past president'} in the club archive. ${knownTenures[person.id] ? 'The Rotary year is documented on the Silver Jubilee banner or in the archived bulletins and reports.' : 'The source does not establish the exact Rotary year.'}`,
  projects: [], financialContribution: '', achievements: [], sourceUrl: person.id === 'gajendra-bdr-shrestha' ? legacy.charterSource : knownTenures[person.id] ? legacy.presidentTenureSource : person.sourceUrl
}));
export const pastPresidents = presidents.filter(person => person.tenure !== currentTenureYear).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
export const presidentById = Object.fromEntries(presidents.map(person => [person.id, person]));
// Draft messages requested by the user; replace with approved statements when available.
export const messages = [
  { leader: clubPresident, message: 'Service Above Self begins with listening to the people around us. At Rotary Club of Kasthamandap, we bring our experience, fellowship and compassion together to meet local needs with practical action. In the spirit of Serve with Soul, let us strengthen our partnerships, welcome new ideas and give our time generously. Together, we can build a kinder Kathmandu and create lasting opportunities for the communities we serve.' },
  { leader: districtGovernor, message: 'The strength of Rotary District 3292 lies in clubs that turn shared values into meaningful service. I encourage every member of Rotary Club of Kasthamandap to lead with integrity, work closely with community partners and support the next generation of leaders. Guided by Service Above Self, let us share what we learn, celebrate the contributions of others and build projects whose benefits continue well beyond a single Rotary year.' }
].map(({ leader, message }) => ({ id: leader.id, name: leader.name, title: leader.title, org: leader.org, image: leader.photo, year: site.rotaryYear, message: message.replace('Serve with Soul', site.theme), isDraft: true }));


export const searchItems = [
  ...projects.map(item => ({ type: 'Projects', title: item.title, description: item.summary, href: `/projects/${item.id}`, image: item.image })),
  ...gallery.map(item => ({ type: 'Gallery', title: item.title, description: `${item.avenue} gallery moment`, href: `/gallery#${item.id}`, image: item.image })),
  ...members.map(item => ({ type: 'Members', title: item.name, description: `${item.role} · ${item.profession} · ${item.legacyRole} · ${item.recognitions.map(tag => `${tag.label} ${tag.shortLabel ?? ''}`).join(' ')}`, href: `/members?person=${item.id}`, image: item.id === 'bod-0' ? item.image : '/images/leaders/person-placeholder.svg' })),
  ...news.map(item => ({ type: 'News', title: item.title, description: item.excerpt, href: `/news/${item.slug}`, image: item.image })),
  ...media.filter(item => item.mimeType === 'application/pdf').map(item => ({ type: 'Bulletins', title: item.title, description: 'Historical club bulletin · PDF', href: item.localUrl, image: '/images/legacy-article.svg' })),
  { type: 'Archive', title: 'Club Archive · bulletins and souvenirs', description: 'Club publications, annual souvenirs and historical boards', href: '/archive', image: '/images/legacy-article.svg' }
];
