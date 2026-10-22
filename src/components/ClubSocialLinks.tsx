const clubs = [
  { name: 'Rotaract', url: 'https://www.rckasthamandap.org/', image: '/logos/icon-rotaract.png' },
  { name: 'Interact', url: 'https://www.interactcluboflas.org/', image: '/logos/icon-interact.png' }
];

export function ClubSocialLinks() {
  return <>{clubs.map((club) => <a key={club.name} href={club.url} target="_blank" rel="noopener noreferrer" aria-label={`${club.name} Club website`} title={`${club.name} Club website`} className="club-wheel-link grid h-9 w-9 shrink-0 place-items-center transition hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7A81B]"><img src={club.image} alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain" /></a>)}</>;
}
