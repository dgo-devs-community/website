import React from 'react';
import Image from 'next/image';
import { Profile } from '@/types/directorio';
import { GitHubIcon, LinkedInIcon, PortfolioIcon } from './icons';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="h-40 w-full bg-slate-200 relative">
         <Image src={profile.imageUrl} alt={profile.name} fill className="object-cover" />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <span className="text-xs font-semibold uppercase text-sky-600 tracking-wider">{profile.category}</span>
        <h3 className="text-xl font-bold mt-1 text-slate-900">{profile.name}</h3>
        <p className="text-sm font-medium text-slate-600">{profile.title}</p>
        <p className="text-slate-500 text-sm mt-3 flex-grow">{profile.bio}</p>
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs italic bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{profile.type}</span>
          <div className="flex items-center gap-3">
            {profile.links.github && (
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors">
                <GitHubIcon className="w-5 h-5" />
              </a>
            )}
            {profile.links.linkedin && (
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors">
                <LinkedInIcon className="w-5 h-5" />
              </a>
            )}
            {profile.links.portfolio && (
              <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-500 transition-colors">
                <PortfolioIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;