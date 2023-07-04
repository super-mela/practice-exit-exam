'use client'
import React, { useState } from 'react'
import { FaClock, FaListAlt, FaChartPie, FaEllipsisV } from 'react-icons/fa'
import Countdown from "react-countdown";
import { PieChart, Pie, Sector, Cell } from 'recharts';
import ProgressBar from "@ramonak/react-progress-bar";

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

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const Completionist = () => <span>Exam time expired!</span>;

function Profile() {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };
    return (
        <div className='pt-[25px] px-[25px] bg-[#F8F9Fc]'>
            <div className='flex items-center justify-between'>
                <h1 className='text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer'>Dashboard</h1>
            </div>
            <div className='grid grid-cols-3 gap-[20px] mt-[25px] pb-[15px]'>
                <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#06b6d4] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 easy-out'>
                    <div>
                        <h2 className='text-[#338CF5] text-[11px] leading-[17px] font-bold'>QUIZ PROGRESS</h2>

                        <div className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>  <ProgressBar bgColor='#338CF5' completed={60} /></div>
                    </div>
                    <FaChartPie fontSize={28} color='' />
                </div>
                <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#06b6d4] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 easy-out'>
                    <div>
                        <h2 className='text-[#338CF5] text-[11px] leading-[17px] font-bold'>PRACTICE QUIZ TAKEN</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>40</h1>
                    </div>
                    <FaListAlt fontSize={28} color='' />
                </div>
                <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#06b6d4] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 easy-out'>
                    <div>
                        <h2 className='text-[#338CF5] text-[11px] leading-[17px] font-bold'>TIME TO EXAM</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>
                            <Countdown date={Date.now() + 50000000}>
                                <Completionist />
                            </Countdown>
                        </h1>
                    </div>
                    <FaClock fontSize={28} color='' />
                </div>
            </div>
            <div className='flex mt-[22px] w-full gap-[20px]'>
                <div className='basis-[50%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]'>
                        <h2>Earnings Overview</h2>
                        <FaEllipsisV color='gray' className='cursor-pointer' />
                    </div>
                    <PieChart width={300} height={300} className='pl-[20px]'>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data2}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            fill="#338CF5"
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        />
                    </PieChart>
                </div>
                <div className='basis-[50%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
                        <h2>Revenu Resources</h2>
                        <FaEllipsisV color='gray' className='cursor-pointer' />
                    </div>
                    <div >
                        <PieChart width={300} height={300}>
                            <Pie
                                data={data2}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data2.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                        <div className='px-[15px] pb-[15px]'>
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
        </div>

    )
}
export default Profile;