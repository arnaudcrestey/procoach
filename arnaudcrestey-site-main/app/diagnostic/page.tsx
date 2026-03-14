"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/lib/quiz";

export default function DiagnosticPage(){

const router = useRouter();

const [answers,setAnswers] = useState<number[]>([]);
const [animating,setAnimating] = useState(false);

const index = answers.length;
const question = quizQuestions[index];

const progress = ((index)/quizQuestions.length)*100;

function answer(value:number){

if(animating) return;

setAnimating(true);

const updated=[...answers,value];

setTimeout(()=>{

setAnswers(updated);
setAnimating(false);

if(updated.length===quizQuestions.length){

localStorage.setItem(
"procoach_answers",
JSON.stringify(updated)
);

router.push("/resultat");

}

},200);

}

return(

<main className="flex min-h-screen items-center justify-center px-4 sm:px-6">

<div className="glass w-full max-w-xl lg:max-w-2xl rounded-3xl p-6 sm:p-10 text-center">

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
Diagnostic professionnel
</h1>

<div className="mb-6 sm:mb-8">

<div className="flex justify-between text-xs sm:text-sm text-white/60 mb-2">

<span>
Question {Math.min(index+1,quizQuestions.length)} sur {quizQuestions.length}
</span>

<span>{Math.round(progress)}%</span>

</div>

<div className="w-full h-2 bg-white/10 rounded-full">

<div
className="h-2 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full transition-all duration-500"
style={{width:`${progress}%`}}
/>

</div>

</div>

<p className={`text-xl sm:text-2xl lg:text-3xl mb-8 sm:mb-10 transition-opacity duration-300 ${animating?"opacity-0":"opacity-100"}`}>
{question?.label}
</p>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">

{question?.answers.map((a)=>(
<button
key={a.label}
onClick={()=>answer(a.value)}
className="rounded-2xl bg-white/10 py-4 text-base sm:text-lg font-medium hover:bg-white/20 active:scale-95 transition"
>
{a.text}
</button>
))}

</div>

<p className="mt-6 sm:mt-8 text-xs sm:text-sm text-white/50">
10 questions • moins de 2 minutes
</p>

</div>

</main>

);

}
