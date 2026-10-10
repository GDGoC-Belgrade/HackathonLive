import { Hackathon } from '@/data/mockHome';

interface Props {
  hackathon: Hackathon;
}

export const HackathonHeader = ({ hackathon }: Props) => (
  <header>
    <h1 className="text-3xl font-bold leading-tight break-words">
      {hackathon.name}
      <span className="block text-brand-blue">Dashboard</span>
    </h1>
    <p className="mt-1 text-sm text-gray-600 break-words">{hackathon.location}</p>
  </header>
);
