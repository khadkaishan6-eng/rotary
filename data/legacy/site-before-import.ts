export const currentTenureYear = '2026-27';
export const boardGroup = `BOD ${currentTenureYear.replace('-', '/')}`;
const clubCoordinates = { latitude: 27.720033572533616, longitude: 85.32123231349269 };
const clubMapQuery = `${clubCoordinates.latitude},${clubCoordinates.longitude}`;

export const site = {
  clubName: 'Rotary Club of Kasthamandap',
  rotaryYear: currentTenureYear.replace('-', '–'),
  shortName: 'RCK',
  district: 'Rotary International District 3292',
  theme: 'Serve with Soul',
  anniversaryPopup: false,
  contact: {
    email: 'hello@rckasthamandap.org',
    phone: '+977 1 456 7890',
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

export const projects = [
  { id: 'hospice-care', title: 'Hospice Care Initiative', summary: 'A dignified, compassionate home for patients and families navigating life-limiting illness.', date: '2026-11-15', tenureYear: '2026-27', status: 'upcoming', avenue: 'Service', location: 'Kathmandu', image: 'https://picsum.photos/seed/rck-project-hospice/1200/800', featured: true },
  { id: 'school-library', title: 'Books Open Doors', summary: 'Building joyful reading corners in community schools across the Kathmandu Valley.', date: '2026-08-24', tenureYear: '2026-27', status: 'active', avenue: 'Youth', location: 'Bhaktapur', image: 'https://picsum.photos/seed/rck-project-library/1200/800', featured: false },
  { id: 'clean-water', title: 'Every Drop Counts', summary: 'Reliable clean water access for families in the hills around Kathmandu.', date: '2026-06-18', tenureYear: '2025-26', status: 'completed', avenue: 'Service', location: 'Kavre', image: 'https://picsum.photos/seed/rck-project-water/1200/800', featured: false },
  { id: 'career-circle', title: 'Career Circle', summary: 'Practical mentoring conversations connecting young people with local professionals.', date: '2026-05-12', tenureYear: '2025-26', status: 'completed', avenue: 'Professional', location: 'Kathmandu', image: 'https://picsum.photos/seed/rck-project-career/1200/800', featured: false },
  { id: 'community-table', title: 'Community Table', summary: 'An open evening of food, listening and fellowship with neighborhood partners.', date: '2026-04-09', tenureYear: '2025-26', status: 'completed', avenue: 'Fellowship', location: 'Patan', image: 'https://picsum.photos/seed/rck-project-table/1200/800', featured: false },
  // DUMMY historical projects: replace dates, locations, titles, summaries and images before launch.
  ...[
    { start: 2024, title: 'Young Leaders for Kathmandu', avenue: 'Youth' },
    { start: 2024, title: 'Neighborhood Health Outreach', avenue: 'Service' },
    { start: 2023, title: 'Community Reading Rooms', avenue: 'Youth' },
    { start: 2022, title: 'Skills for Tomorrow', avenue: 'Professional' },
    { start: 2020, title: 'Neighbors Together', avenue: 'Fellowship' },
    { start: 2002, title: 'Charter Community Service Day', avenue: 'Service' }
  ].map(({ start, title, avenue }, index) => ({
    id: `placeholder-history-${index + 1}`, title: `${title} (placeholder)`,
    summary: 'Dummy project history for preview only. Replace with a verified project record before launch.',
    date: `${start}-09-15`, tenureYear: `${start}-${String(start + 1).slice(-2)}`,
    status: 'completed', avenue, location: 'Kathmandu (placeholder)',
    image: `https://picsum.photos/seed/rck-history-${index + 1}/1200/800`, featured: false
  }))
];

export const news = [
  { id: 'serve-with-soul', slug: 'serve-with-soul', type: 'Club News', title: 'A new Rotary year, a deeper promise', excerpt: 'Our 2026–27 journey begins with an invitation to serve with more care, courage and soul.', author: 'RCK Editorial', date: '2026-07-01', readTime: '4 min read', tags: ['Club News', 'Service'], image: 'https://picsum.photos/seed/rck-news-year/1200/675' },
  { id: 'water-project', slug: 'water-project', type: 'Club News', title: 'Every Drop Counts reaches Kavre', excerpt: 'The first tap is flowing, and with it, a community’s new sense of possibility.', author: 'RCK Editorial', date: '2026-06-22', readTime: '3 min read', tags: ['Club News', 'Clean Water'], image: 'https://picsum.photos/seed/rck-news-water/1200/675' },
  { id: 'fellowship-evening', slug: 'fellowship-evening', type: 'Club News', title: 'An evening of stories and new friends', excerpt: 'Members and guests gathered for an honest conversation about belonging and service.', author: 'RCK Editorial', date: '2026-06-06', readTime: '2 min read', tags: ['Club News', 'Fellowship'], image: 'https://picsum.photos/seed/rck-news-fellowship/1200/675' },
  ...['Why local listening changes service', 'The quiet power of fellowship', 'Young leaders are already here'].map((title, index) => ({ id: `rotarian-${index + 1}`, slug: `rotarian-${index + 1}`, type: 'Rotarian Articles', title, excerpt: 'A placeholder perspective for our Rotarian readers about people, purpose and practical service.', author: 'Rotarian Editorial', date: `2026-05-${String(20 - index * 4).padStart(2, '0')}`, readTime: '5 min read', tags: ['Rotarian Articles', 'Perspective'], image: `https://picsum.photos/seed/rck-news-article-${index + 1}/1200/675` }))
];

export const gallery = [
  { id: 'gallery-1', title: 'Hospice Care Initiative', date: '2026-08-18', avenue: 'Service', image: 'https://picsum.photos/seed/rck-gallery-1/800/600' },
  { id: 'gallery-2', title: 'Books Open Doors', date: '2026-08-24', avenue: 'Youth', image: 'https://picsum.photos/seed/rck-gallery-2/800/600' },
  { id: 'gallery-3', title: 'Members in fellowship', date: '2026-07-12', avenue: 'Fellowship', image: 'https://picsum.photos/seed/rck-gallery-3/800/600' },
  { id: 'gallery-4', title: 'Every Drop Counts', date: '2026-06-18', avenue: 'Service', image: 'https://picsum.photos/seed/rck-gallery-4/800/600' },
  { id: 'gallery-5', title: 'Community conversation', date: '2026-05-27', avenue: 'Professional', image: 'https://picsum.photos/seed/rck-gallery-5/800/600' },
  { id: 'gallery-6', title: 'A day outdoors', date: '2026-04-09', avenue: 'Fellowship', image: 'https://picsum.photos/seed/rck-gallery-6/800/600' }
];

export type MemberProfile = { status: 'current' | 'past'; joinedYear?: number; leftYear?: number; lastRole?: string; contributions?: string[]; whereNow?: string; presidentId?: string; id: string; name: string; role: string; group: string; bio: string; image: string; memberSince: string; profession: string; organization: string; achievements: string[]; interests: string; showContact: boolean; email: string; phone: string };
// Update this leadership lineup and its transparent portraits each Rotary year.
export const leaders = [
  { id: 'sponsor-president', name: 'Sailesh Vaidya', title: 'President', photo: '/images/leaders/rotary-club-president.png', portrait: { height: '96%', bottom: '0%' }, org: site.clubName },
  { id: 'district-governor', name: 'Vishnu Bdr. Karkee', title: 'District Governor', photo: '/images/leaders/district-governor.png', portrait: { height: '104%', bottom: '-6%' }, org: 'Rotary District 3292' },
  { id: 'ri-president', name: 'Olayinka Hakeem Babalola', title: 'President', photo: '/images/leaders/ri-president.png', portrait: { height: '82%', bottom: '19%' }, org: 'Rotary International' }
];
export const clubPresident = leaders[0];
export const districtGovernor = leaders[1];
export const riPresident = leaders[2];

const memberImage = (index: number) => `https://i.pravatar.cc/300?img=${index + 1}`;

const currentMembers: MemberProfile[] = [
  ...[clubPresident.name, 'Aarav Shrestha', 'Mina Gurung', 'Bibek Maharjan', 'Saanvi Karki', 'Prabin Tamang', 'Nima Rai', 'Riya Thapa'].map((name, index) => ({ id: `bod-${index}`, name, role: [`President ${site.rotaryYear}`, 'President-Elect', 'Secretary', 'Treasurer', 'Service Director', 'Membership Director', 'Public Image Director', 'Youth Director'][index], group: boardGroup, bio: index === 0 ? `${clubPresident.title}, ${clubPresident.org} · RY ${site.rotaryYear}.` : 'Placeholder profile for a RCK leader who brings care and practical energy to service.', image: index === 0 ? clubPresident.photo : memberImage(index), memberSince: index === 0 ? '' : '2022', profession: index === 0 ? '' : 'Community professional', organization: index === 0 ? clubPresident.org : 'Placeholder Organization', achievements: index === 0 ? [] : ['Planned a community project', 'Supported a partner school', 'Welcomed new members'], ...(index === 0 ? { presidentId: `president-${currentTenureYear}` } : {}), status: 'current' as const, interests: index === 0 ? '' : 'Learning, walking and community conversations', showContact: false, email: '', phone: '' })),
  { id: 'member-2', name: 'Nabin Joshi', role: 'President-Elect', group: boardGroup, bio: 'Bringing a practical, generous spirit to every project and partnership.', image: memberImage(8), memberSince: '2022', profession: 'Community professional', organization: 'Placeholder Organization', achievements: ['Planned a community project', 'Supported a partner school', 'Welcomed new members'], status: 'current' as const, interests: 'Learning, walking and community conversations', showContact: false, email: '', phone: '' },
  { id: 'member-3', name: 'Sanjay Maharjan', role: 'Secretary', group: boardGroup, bio: 'A connector who keeps the details moving and the welcome warm.', image: memberImage(9), memberSince: '2022', profession: 'Community professional', organization: 'Placeholder Organization', achievements: ['Planned a community project', 'Supported a partner school', 'Welcomed new members'], status: 'current' as const, interests: 'Learning, walking and community conversations', showContact: false, email: '', phone: '' },
  { id: 'member-4', name: 'Maya Gurung', role: 'Past President 2025–26', group: 'Past Presidents', bio: 'A steady advocate for youth service and community-led change.', image: memberImage(10), memberSince: '2021', profession: 'Community professional', organization: 'Placeholder Organization', achievements: ['Led a Rotary year', 'Delivered a service initiative', 'Mentored club members'], status: 'current' as const, interests: 'Service and fellowship', showContact: false, email: '', phone: '' },
  { id: 'member-5', name: 'Ramesh Karki', role: 'Major Donor', group: 'Major Donors', bio: 'Supporting long-term impact with quiet generosity and deep trust.', image: memberImage(11), memberSince: '2020', profession: 'Community professional', organization: 'Placeholder Organization', achievements: ['Supported a flagship project', 'Invested in youth service', 'Strengthened a local partnership'], status: 'current' as const, interests: 'Community investment', showContact: false, email: '', phone: '' },
  ...Array.from({ length: 36 }, (_, index) => ({ id: `general-${index}`, name: `Rtn. Member ${String(index + 1).padStart(2, '0')}`, role: 'General Member', group: 'General Members', bio: 'Clearly labelled placeholder member profile.', image: memberImage(index + 12), memberSince: '2026', profession: 'Placeholder professional', organization: 'Placeholder Organization', achievements: ['Participated in a service activity', 'Joined a fellowship gathering', 'Supported a club initiative'], status: 'current' as const, interests: 'Service, learning and fellowship', showContact: false, email: '', phone: '' })),
  ...Array.from({ length: 15 }, (_, index) => ({ id: `past-${index}`, ...(index > 0 ? { presidentId: `president-${2001 + index}-${String(2002 + index).slice(-2)}` } : {}), name: `Past President ${String(index + 1).padStart(2, '0')}`, role: `Past President ${2001 + index}`, group: 'Past Presidents', bio: 'Clearly labelled placeholder past president profile.', image: memberImage(index + 48), memberSince: String(2001 + index), profession: 'Placeholder professional', organization: 'Placeholder Organization', achievements: ['Led a Rotary year', 'Delivered a service initiative', 'Mentored club members'], status: 'current' as const, interests: 'Service and fellowship', showContact: false, email: '', phone: '' })),
  ...Array.from({ length: 7 }, (_, index) => ({ id: `donor-${index}`, name: `Supporter ${String(index + 1).padStart(2, '0')}`, role: 'Major Donor', group: 'Major Donors', bio: 'Clearly labelled placeholder supporter profile.', image: memberImage(index + 63), memberSince: '2020', profession: 'Placeholder professional', organization: 'Placeholder Organization', achievements: ['Supported a flagship project', 'Invested in youth service', 'Strengthened a local partnership'], status: 'current' as const, interests: 'Community investment', showContact: false, email: '', phone: '' }))
];

// Mock former members. Link former presidents to the canonical presidents records below.
const pastMembers: MemberProfile[] = Array.from({ length: 24 }, (_, index) => {
  const joinedYear = 2002 + index;
  const leftYear = Math.min(joinedYear + 2 + index % 4, 2026);
  return {
    id: `former-${index + 1}`, name: `Placeholder Alumni ${String(index + 1).padStart(2, '0')}`,
    status: 'past', group: 'Past Members', role: 'Former Member',
    joinedYear, leftYear, lastRole: ['Service Director', 'Secretary', 'General Member', 'Treasurer'][index % 4],
    ...(index % 6 === 0 ? { presidentId: `president-${joinedYear}-${String(joinedYear + 1).slice(-2)}` } : {}),
    contributions: ['Placeholder: supported a community service project', 'Placeholder: mentored incoming volunteers', 'Placeholder: helped organize fellowship events'],
    ...(index % 3 === 0 ? { whereNow: 'Placeholder: continuing community volunteering' } : {}),
    bio: 'Mock former member record; replace with verified history.', image: memberImage(index + 12),
    memberSince: String(joinedYear), profession: 'Placeholder professional', organization: 'Placeholder Organization',
    achievements: [], interests: 'Service and fellowship', showContact: false, email: '', phone: ''
  };
});
// A former president remains one member record, visible in both tabs.
for (const former of pastMembers) {
  const existing = currentMembers.find((member) => former.presidentId && member.presidentId === former.presidentId);
  if (existing) former.id = existing.id;
}
const formerPresidentIds = new Set(pastMembers.map((member) => member.presidentId).filter(Boolean));
export const members: MemberProfile[] = [
  ...currentMembers.filter((member) => !member.presidentId || !formerPresidentIds.has(member.presidentId)),
  ...pastMembers
];

// Draft messages requested by the user; replace with approved statements when available.
export const messages = [
  { leader: clubPresident, message: 'Service Above Self begins with listening to the people around us. At Rotary Club of Kasthamandap, we bring our experience, fellowship and compassion together to meet local needs with practical action. In the spirit of Serve with Soul, let us strengthen our partnerships, welcome new ideas and give our time generously. Together, we can build a kinder Kathmandu and create lasting opportunities for the communities we serve.' },
  { leader: districtGovernor, message: 'The strength of Rotary District 3292 lies in clubs that turn shared values into meaningful service. I encourage every member of Rotary Club of Kasthamandap to lead with integrity, work closely with community partners and support the next generation of leaders. Guided by Service Above Self, let us share what we learn, celebrate the contributions of others and build projects whose benefits continue well beyond a single Rotary year.' }
].map(({ leader, message }) => ({ id: leader.id, name: leader.name, title: leader.title, org: leader.org, image: leader.photo, year: site.rotaryYear, message: message.replace('Serve with Soul', site.theme), isDraft: true }));

// Confirmed editorial range; these history records are DUMMY DATA, not verified club history.
export const foundingTenureStart = 2002;
export const tenureYears = Array.from({ length: Number(currentTenureYear.slice(0, 4)) - foundingTenureStart + 1 }, (_, index) => {
  const start = Number(currentTenureYear.slice(0, 4)) - index;
  return `${start}-${String(start + 1).slice(-2)}`;
});

export type President = {
  id: string; name: string; photo: string; tenure: string; order: number;
  isCharter: boolean; isPlaceholder: boolean; bio: string;
  projects: { title: string; year: string; description: string }[];
  financialContribution: string; achievements: string[];
};

// Historical records are placeholders; the current president uses the shared confirmed leadership record.
// Replace each record with verified history before launch. Figures are illustrative USD.
export const presidents: President[] = [...tenureYears].reverse().map((tenure, index) => {
  if (tenure === currentTenureYear) return {
    id: `president-${tenure}`, name: clubPresident.name, photo: clubPresident.photo,
    tenure, order: index + 1, isCharter: false, isPlaceholder: false,
    bio: `${clubPresident.name} is the ${clubPresident.title.toLowerCase()} of ${clubPresident.org} for Rotary year ${site.rotaryYear}.`,
    projects: [], financialContribution: '', achievements: []
  };
  const title = ['Community Health Camp', 'School Reading Corners', 'Clean Water Partnership', 'Youth Leadership Workshop', 'Winter Essentials Drive'][index % 5];
  return {
    id: `president-${tenure}`, name: `Placeholder President ${String(index + 1).padStart(2, '0')}`,
    photo: `https://i.pravatar.cc/300?img=${index + 1}`, tenure, order: index + 1, isCharter: index === 0, isPlaceholder: true,
    bio: `Dummy biography for ${tenure}. This leader brought members together around practical community service and mentoring young volunteers.`,
    projects: [{ title, year: tenure, description: 'Dummy history: members partnered with local volunteers to support community needs.' }],
    financialContribution: `$${(1500 + ((index * 7) % 19) * 250).toLocaleString('en-US')} raised for community service (dummy USD figure)`,
    achievements: ['Placeholder: strengthened a community partnership', 'Placeholder: mentored incoming club leaders']
  };
});

for (const member of members) {
  const president = presidents.find((person) => person.id === member.presidentId);
  if (president) {
    member.name = president.name;
    member.image = president.photo;
    member.lastRole = `President ${president.tenure}`;
  }
}

export const searchItems = [
  ...projects.map((item) => ({ type: 'Projects', title: item.title, description: item.summary, href: `/projects/${item.id}`, image: item.image })),
  ...gallery.map((item) => ({ type: 'Gallery', title: item.title, description: `${item.avenue} gallery moment`, href: `/gallery#${item.id}`, image: item.image })),
  ...members.map((item) => ({ type: 'Members', title: item.name, description: `${item.role} · ${item.group}`, href: '/members', image: item.image })),
  ...news.map((item) => ({ type: 'News', title: item.title, description: item.excerpt, href: `/news/${item.slug}`, image: item.image }))
];

