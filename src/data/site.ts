export const site = {
  clubName: 'Rotaract Club of Kasthamandap',
  shortName: 'RCK',
  district: 'Rotary International District 3292',
  theme: 'Serve with Soul',
  anniversaryPopup: false,
  contact: {
    email: 'hello@rckasthamandap.org',
    phone: '+977 1 456 7890',
    address: 'Kathmandu, Nepal',
    map: 'https://www.google.com/maps?q=Kathmandu%2C%20Nepal&output=embed'
  },
  impact: [
    { value: '25', label: 'years of service' },
    { value: '84', label: 'projects completed' },
    { value: '60', label: 'active members' },
    { value: '18k+', label: 'lives served' }
  ]
};

export const projects = [
  { id: 'hospice-care', title: 'Hospice Care Initiative', summary: 'A dignified, compassionate home for patients and families navigating life-limiting illness.', date: '2026-11-15', status: 'upcoming', avenue: 'Service', location: 'Kathmandu', image: '/images/project-service.jpg', featured: true },
  { id: 'school-library', title: 'Books Open Doors', summary: 'Building joyful reading corners in community schools across the Kathmandu Valley.', date: '2026-08-24', status: 'active', avenue: 'Youth', location: 'Bhaktapur', image: '/images/project-youth.jpg', featured: false },
  { id: 'clean-water', title: 'Every Drop Counts', summary: 'Reliable clean water access for families in the hills around Kathmandu.', date: '2026-06-18', status: 'completed', avenue: 'Service', location: 'Kavre', image: '/images/project-water.jpg', featured: false },
  { id: 'career-circle', title: 'Career Circle', summary: 'Practical mentoring conversations connecting young people with local professionals.', date: '2026-05-12', status: 'completed', avenue: 'Professional', location: 'Kathmandu', image: '/images/project-professional.jpg', featured: false },
  { id: 'community-table', title: 'Community Table', summary: 'An open evening of food, listening and fellowship with neighborhood partners.', date: '2026-04-09', status: 'completed', avenue: 'Fellowship', location: 'Patan', image: '/images/project-fellowship.jpg', featured: false }
];

export const news = [
  { id: 'serve-with-soul', slug: 'serve-with-soul', type: 'Club News', title: 'A new Rotary year, a deeper promise', excerpt: 'Our 2026–27 journey begins with an invitation to serve with more care, courage and soul.', author: 'RCK Editorial', date: '2026-07-01', readTime: '4 min read', tags: ['Club News', 'Service'], image: '/images/news-community.jpg' },
  { id: 'water-project', slug: 'water-project', type: 'Club News', title: 'Every Drop Counts reaches Kavre', excerpt: 'The first tap is flowing, and with it, a community’s new sense of possibility.', author: 'RCK Editorial', date: '2026-06-22', readTime: '3 min read', tags: ['Club News', 'Clean Water'], image: '/images/project-water.jpg' },
  { id: 'fellowship-evening', slug: 'fellowship-evening', type: 'Club News', title: 'An evening of stories and new friends', excerpt: 'Members and guests gathered for an honest conversation about belonging and service.', author: 'RCK Editorial', date: '2026-06-06', readTime: '2 min read', tags: ['Club News', 'Fellowship'], image: '/images/project-fellowship.jpg' },
  ...['Why local listening changes service', 'The quiet power of fellowship', 'Young leaders are already here'].map((title, index) => ({ id: `rotarian-${index + 1}`, slug: `rotarian-${index + 1}`, type: 'Rotarian Articles', title, excerpt: 'A placeholder perspective for our Rotarian readers about people, purpose and practical service.', author: 'Rotarian Editorial', date: `2026-05-${String(20 - index * 4).padStart(2, '0')}`, readTime: '5 min read', tags: ['Rotarian Articles', 'Perspective'], image: '/images/news-community.jpg' }))
];

export const gallery = [
  { id: 'gallery-1', title: 'Hospice Care Initiative', date: '2026-08-18', avenue: 'Service', image: '/images/project-service.jpg' },
  { id: 'gallery-2', title: 'Books Open Doors', date: '2026-08-24', avenue: 'Youth', image: '/images/project-youth.jpg' },
  { id: 'gallery-3', title: 'Members in fellowship', date: '2026-07-12', avenue: 'Fellowship', image: '/images/project-fellowship.jpg' },
  { id: 'gallery-4', title: 'Every Drop Counts', date: '2026-06-18', avenue: 'Service', image: '/images/project-water.jpg' },
  { id: 'gallery-5', title: 'Community conversation', date: '2026-05-27', avenue: 'Professional', image: '/images/project-professional.jpg' },
  { id: 'gallery-6', title: 'A day outdoors', date: '2026-04-09', avenue: 'Fellowship', image: '/images/project-fellowship.jpg' }
];

export type MemberProfile = { id: string; name: string; role: string; group: string; bio: string; image: string; memberSince: string; profession: string; organization: string; achievements: string[]; interests: string; showContact: boolean; email: string; phone: string };

export const members: MemberProfile[] = [
  ...['Ishan Khadka', 'Aarav Shrestha', 'Mina Gurung', 'Bibek Maharjan', 'Saanvi Karki', 'Prabin Tamang', 'Nima Rai', 'Riya Thapa'].map((name, index) => ({ id: `bod-${index}`, name, role: ['President 2026–27', 'President-Elect', 'Secretary', 'Treasurer', 'Service Director', 'Membership Director', 'Public Image Director', 'Youth Director'][index], group: 'BOD 2026/27', bio: 'Placeholder profile for a RCK leader who brings care and practical energy to service.', image: '/images/avatar.svg', memberSince: '2022', profession: 'Community professional', organization: 'Placeholder Organization', achievements: ['Planned a community project', 'Supported a partner school', 'Welcomed new members'], interests: 'Learning, walking and community conversations', showContact: index === 0, email: 'placeholder@example.com', phone: '+977 9800000000' })),
  { id: 'member-2', name: 'Nabin Joshi', role: 'President-Elect', group: 'BOD 2026/27', bio: 'Bringing a practical, generous spirit to every project and partnership.', image: '/images/avatar.svg', memberSince: '2022', profession: 'Community professional', organization: 'Placeholder Organization', achievements: ['Planned a community project', 'Supported a partner school', 'Welcomed new members'], interests: 'Learning, walking and community conversations', showContact: false, email: '', phone: '' },
  { id: 'member-3', name: 'Sanjay Maharjan', role: 'Secretary', group: 'BOD 2026/27', bio: 'A connector who keeps the details moving and the welcome warm.', image: '/images/avatar.svg', memberSince: '2022', profession: 'Community professional', organization: 'Placeholder Organization', achievements: ['Planned a community project', 'Supported a partner school', 'Welcomed new members'], interests: 'Learning, walking and community conversations', showContact: false, email: '', phone: '' },
  { id: 'member-4', name: 'Maya Gurung', role: 'Past President 2025–26', group: 'Past Presidents', bio: 'A steady advocate for youth service and community-led change.', image: '/images/avatar.svg', memberSince: '2021', profession: 'Community professional', organization: 'Placeholder Organization', achievements: ['Led a Rotary year', 'Delivered a service initiative', 'Mentored club members'], interests: 'Service and fellowship', showContact: false, email: '', phone: '' },
  { id: 'member-5', name: 'Ramesh Karki', role: 'Major Donor', group: 'Major Donors', bio: 'Supporting long-term impact with quiet generosity and deep trust.', image: '/images/avatar.svg', memberSince: '2020', profession: 'Community professional', organization: 'Placeholder Organization', achievements: ['Supported a flagship project', 'Invested in youth service', 'Strengthened a local partnership'], interests: 'Community investment', showContact: false, email: '', phone: '' },
  ...Array.from({ length: 60 }, (_, index) => ({ id: `general-${index}`, name: `Rtr. Member ${String(index + 1).padStart(2, '0')}`, role: 'General Member', group: 'General Members', bio: 'Clearly labelled placeholder member profile.', image: '/images/avatar.svg', memberSince: '2026', profession: 'Placeholder professional', organization: 'Placeholder Organization', achievements: ['Participated in a service activity', 'Joined a fellowship gathering', 'Supported a club initiative'], interests: 'Service, learning and fellowship', showContact: false, email: '', phone: '' })),
  ...Array.from({ length: 25 }, (_, index) => ({ id: `past-${index}`, name: `Past President ${String(index + 1).padStart(2, '0')}`, role: `Past President ${2001 + index}`, group: 'Past Presidents', bio: 'Clearly labelled placeholder past president profile.', image: '/images/avatar.svg', memberSince: String(2001 + index), profession: 'Placeholder professional', organization: 'Placeholder Organization', achievements: ['Led a Rotary year', 'Delivered a service initiative', 'Mentored club members'], interests: 'Service and fellowship', showContact: false, email: '', phone: '' })),
  ...Array.from({ length: 6 }, (_, index) => ({ id: `donor-${index}`, name: `Supporter ${String(index + 1).padStart(2, '0')}`, role: 'Major Donor', group: 'Major Donors', bio: 'Clearly labelled placeholder supporter profile.', image: '/images/avatar.svg', memberSince: '2020', profession: 'Placeholder professional', organization: 'Placeholder Organization', achievements: ['Supported a flagship project', 'Invested in youth service', 'Strengthened a local partnership'], interests: 'Community investment', showContact: false, email: '', phone: '' }))
];

export const messages = [
  { name: 'Rtr. Ishan Khadka', title: 'President, RY 2026–27', image: '/images/avatar.svg', message: 'This year, we are choosing presence as our starting point. When we listen before we act, service becomes more thoughtful, more useful and more human. I invite every member and partner to bring their whole self to the work, celebrate small progress and build relationships that last beyond a project.' },
  { name: 'Rtn. Mario Placeholder', title: 'RI President, placeholder', image: '/images/avatar.svg', message: 'Rotary grows stronger when local clubs turn shared values into practical action. This placeholder message represents our connection to a global network of people who lead with curiosity, generosity and a belief that communities already hold much of the wisdom they need.' }
];
