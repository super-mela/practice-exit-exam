import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

type AUTH = {
    email: string,
    password: string,
}
type User = {
    userName: string,
    departiment: string,
    bio?: string,
}
const users = [
    { id: 1, email: 'user@example.com', password: 'password' },
];

const userInfo = [
    { id: 1, userId: 1, userName: 'Jhon Don', departiment: "Electrical Enginnering", bio: "sample Bio" },
]

export async function GET(request: Request) {
    return new Response('Hello, Next.js!')
}

export async function POST(request: Request) {
    const data: AUTH = await request.json()
    // console.log("data: ", data)
    const { email, password } = data;

    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        // Generate and sign JWT token
        const token = jwt.sign({ userId: user.id }, 'secret-key');
        const user_Info = userInfo.find(
            (u) => u.userId === user.id);
        return NextResponse.json({ token, user_Info });
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, {
            status: 401,
        });
    }
    // return NextResponse.json({ message: 'Hello, Next.js!' })
}