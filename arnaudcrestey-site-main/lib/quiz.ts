export type QuizQuestion = {
id: number;
label: string;
dimension: "motivation" | "sens" | "energie" | "autonomie" | "progression";
answers: { label: string; value: number; text: string }[];
};

export const quizQuestions: QuizQuestion[] = [

{
id:1,
label:"Quand vous pensez à votre travail actuel...",
dimension:"motivation",
answers:[
{label:"A",value:1,text:"Je ressens souvent de la lassitude."},
{label:"B",value:3,text:"Je me sens globalement motivé(e)."},
{label:"C",value:2,text:"Cela dépend beaucoup des périodes."}
]},

{
id:2,
label:"Dans vos missions quotidiennes...",
dimension:"sens",
answers:[
{label:"A",value:2,text:"Certaines tâches ont du sens, d’autres moins."},
{label:"B",value:1,text:"Je peine à voir l’utilité réelle de ce que je fais."},
{label:"C",value:3,text:"Je comprends clairement l’impact de mon travail."}
]},

{
id:3,
label:"Quand vous imaginez votre avenir professionnel...",
dimension:"progression",
answers:[
{label:"A",value:3,text:"Je ressens un fort besoin de changement."},
{label:"B",value:2,text:"Je me pose encore des questions."},
{label:"C",value:1,text:"Je préfère rester dans une continuité."}
]},

{
id:4,
label:"Au réveil, les jours de travail...",
dimension:"energie",
answers:[
{label:"A",value:2,text:"Cela dépend des journées."},
{label:"B",value:1,text:"Je manque souvent d’énergie ou d’envie."},
{label:"C",value:3,text:"Je démarre généralement avec énergie."}
]},

{
id:5,
label:"Concernant la reconnaissance dans votre travail...",
dimension:"motivation",
answers:[
{label:"A",value:3,text:"Je me sens reconnu(e) pour ma contribution."},
{label:"B",value:2,text:"La reconnaissance est irrégulière."},
{label:"C",value:1,text:"Je me sens rarement reconnu(e)."}
]},

{
id:6,
label:"Votre travail est-il en accord avec vos valeurs ?",
dimension:"sens",
answers:[
{label:"A",value:3,text:"Oui, clairement."},
{label:"B",value:2,text:"Partiellement."},
{label:"C",value:1,text:"Pas vraiment."}
]},

{
id:7,
label:"Face à l’idée de changer de cap professionnel...",
dimension:"autonomie",
answers:[
{label:"A",value:1,text:"La peur du changement me freine."},
{label:"B",value:3,text:"Je me sens capable de décider et d’agir."},
{label:"C",value:2,text:"J’y pense mais je reste prudent."}
]},

{
id:8,
label:"Dans votre travail quotidien...",
dimension:"autonomie",
answers:[
{label:"A",value:1,text:"Je subis beaucoup de contraintes."},
{label:"B",value:3,text:"Je dispose d’une vraie autonomie."},
{label:"C",value:2,text:"J’ai une certaine marge de manœuvre."}
]},

{
id:9,
label:"Sur une semaine classique...",
dimension:"motivation",
answers:[
{label:"A",value:1,text:"Ma motivation chute rapidement."},
{label:"B",value:3,text:"Elle reste globalement stable."},
{label:"C",value:2,text:"Elle varie selon les jours."}
]},

{
id:10,
label:"Concernant votre trajectoire professionnelle...",
dimension:"progression",
answers:[
{label:"A",value:2,text:"J’ai quelques idées mais rien de précis."},
{label:"B",value:3,text:"Ma direction est assez claire."},
{label:"C",value:1,text:"Je ne vois pas vraiment où je vais."}
]}

];

export function computeResults(answers:number[]){

const totals={
motivation:0,
sens:0,
energie:0,
autonomie:0,
progression:0
};

quizQuestions.forEach((q,i)=>{
const value=answers[i] ?? 2;
totals[q.dimension]+=value;
});

const averages={
motivation:totals.motivation/3,
sens:totals.sens/2,
energie:totals.energie/1,
autonomie:totals.autonomie/2,
progression:totals.progression/2
};

const radar=[
{subject:"Motivation",score:averages.motivation},
{subject:"Sens",score:averages.sens},
{subject:"Énergie",score:averages.energie},
{subject:"Autonomie",score:averages.autonomie},
{subject:"Progression",score:averages.progression}
];

return{radar};

}
