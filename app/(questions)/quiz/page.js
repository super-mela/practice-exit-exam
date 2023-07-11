"use client"
import React, { useEffect, useState } from 'react'
import QuizApp from '../../../components/QuizApp'
import { useRouter } from 'next/navigation'
import Loader from '../../../components/Loader'
import Layout from '../../../components/Layout'

function Quiz() {
    const routes = useRouter()
    const [visible, setVisible] = useState(false)

    const checkUser = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            routes.push('/signin')
        }
        else {
            setVisible(true)
        }
    }

    useEffect(() => {
        checkUser();
    }, [])

    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {visible ?
                    <QuizApp />
                    :
                    <Layout>
                        <Loader />
                    </Layout>
                }
            </div>
        </section>
    )
}

export default Quiz