import React from 'react'

interface ValueCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}


export default function ValueCard({ icon, title, description}: ValueCardProps) {
  return (
    <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
        <div className='flex items-center mb-4'>
            {icon}
            <h3 className='text-lg font-bold ml-3'>{title}</h3>
        </div>
        <p className='text-gray-700'>{description}</p>
    </div>
  )
}
