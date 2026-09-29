import React from 'react'

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 4900 },
  { month: "Apr", revenue: 7200 },
  { month: "May", revenue: 6800 },
  { month: "Jun", revenue: 3500 },
];
const Practice = () => {
    const maxRveneue=Math.max(
        ...revenueData.map(item=>item.revenue)
    )
  return (
    <div className='p-6 rounded-xl bg-slate-950 border border-slate-800'>
        <div>
            <h1 className='text-lg'>Revenue Overview</h1>
            <p className='text-xs mt-1 text-slate-400'>Revenue performance over the last 6 months</p>
        </div>
        <div  className='h-64 mt-6 relative'>
            <div className='absolute inset-0 flex flex-col justify-between'>
                <div className='border-b border-slate-600' />
                <div className='border-b border-slate-600' />
                <div className='border-b border-slate-600' />
                <div className='border-b border-slate-600' />
                <div className='border-b border-slate-600' />
            </div>
            <div className='flex flex-col items-center gap-3 justify-end'>
                
            </div>            
        </div>
    </div>
  )
}

export default Practice