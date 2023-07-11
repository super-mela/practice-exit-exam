import { NextResponse } from 'next/server';

import {
    CATEGORIES,
    NUM_OF_QUESTIONS,
    DIFFICULTY,
    QUESTIONS_TYPE,
    COUNTDOWN_TIME,
} from '../../../../data'
type User = {
    id: number,
}

const userQuiz = [
    { id: 1, userId: 1, category: "0", numOfQuestions: 50, difficulty: "0", questionsType: "0", countdownTime: { hours: 0, minutes: 3000, seconds: 0 } },
]

export async function GET(request: Request) {
    return new Response('Hello, Question Categories!')
}

export async function POST(request: Request) {
    const data: User = await request.json()

    const { id } = data;

    const quizcategory = userQuiz.find((u) => u.userId === id);
    const category = CATEGORIES.find((u) => u.value === quizcategory?.category);
    const difficulty = DIFFICULTY.find((u) => u.value === quizcategory?.difficulty);
    const questiontype = QUESTIONS_TYPE.find((u) => u.value === quizcategory?.questionsType);
    const quizContent = {
        category: category?.value,
        numOfQuestions: quizcategory?.numOfQuestions,
        difficulty: difficulty?.value,
        questionsType: questiontype?.value,
        countdownTime: quizcategory?.countdownTime
    }

    if (quizcategory) {
        return NextResponse.json(quizContent);
    } else {
        return NextResponse.json({ message: 'Not Assigned for Exam' }, {
            status: 404,
        });
    }
}