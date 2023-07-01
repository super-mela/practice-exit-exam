'use client'

import React, { useEffect } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'

import DashboardSidebar from "../../../components/DashboardSidebar";
import Layout from '../../../components/Layout'

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {

    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 700,
            easing: 'ease-out-cubic',
        })
    })


    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <Layout>
                    <div className="flex text-[17px] lg:flex-nowrap flex-wrap sub-section gap-5 tori-bg-gray">
                        <DashboardSidebar />
                        <main className="grow">

                            {children}

                        </main>
                    </div>
                </Layout>
            </div>
        </section>
    );
};

export default DashboardLayout;