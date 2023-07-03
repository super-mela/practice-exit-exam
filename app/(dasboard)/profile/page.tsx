'use client'
import React from 'react'
import { FaEllipsisV, FaRegCalendarMinus } from 'react-icons/fa'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';
const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function Profile() {
    return (
        <div className='pt-[25px] px-[25px] bg-[#F8F9Fc]'>
            <div className='flex items-center justify-between'>
                <h1 className='text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer'>Dashboard</h1>
            </div>
            <div className='grid grid-cols-3 gap-[20px] mt-[25px] pb-[15px]'>
                <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 easy-out'>
                    <div>
                        <h2 className='text-[#B589Df] text-[11px] leading-[17px] font-bold'>EARNING (MONTHLY)</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>$40,0000</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color='' />
                </div>
                <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 easy-out'>
                    <div>
                        <h2 className='text-[#B589Df] text-[11px] leading-[17px] font-bold'>EARNING (MONTHLY)</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>$40,0000</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color='' />
                </div>
                <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 easy-out'>
                    <div>
                        <h2 className='text-[#B589Df] text-[11px] leading-[17px] font-bold'>EARNING (MONTHLY)</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>$40,0000</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color='' />
                </div>
            </div>
            <div className='flex mt-[22px] w-full gap-[20px]'>
                <div className='basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]'>
                        <h2>Earnings Overview</h2>
                        <FaEllipsisV color='gray' className='cursor-pointer' />
                    </div>
                    <LineChart
                        width={500}
                        height={500}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </div>
                <div className='basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
                        <h2>Revenu Resources</h2>
                        <FaEllipsisV color='gray' className='cursor-pointer' />
                    </div>
                    <div className='pl-[35px]'>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data2}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>

                        <div className='grid grid-cols-4'>
                            {
                                data2.map((item, index) => (
                                    <p key={index} className='cursor-pointer font-bold'>{item?.name}</p>
                                ))
                            }

                        </div>
                        <div className='grid grid-cols-4 mt-[15px]'>
                            {
                                COLORS.map((item, index) => (
                                    <div className='h-[30px] w-[30px]' style={{ backgroundColor: item }}></div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Profile;