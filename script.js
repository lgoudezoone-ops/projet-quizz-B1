const ecranAccueil = document.getElementById("ecran-daccueil");
const ecranQuestion = document.getElementById("ecran-question");
const ecranResultat = document.getElementById("ecran-resultat");

const btnDemarrer = document.getElementById("btn-demarrer");
const btnRecommencer = document.getElementById("restart-btn");

const texteQuestion = document.getElementById("texte-question");
const retour = document.getElementById("retour");

const numeroQuestion = document.getElementById("numero-question");
const barreProgression = document.getElementById("progression-bar-fill");

const texteScore = document.getElementById("#texte-score");
const appreciation = document.getElementById("appreciation");
const listeCorrections = document.getElementById("liste-corrections");
const btn = document.getElementById("reponses");
const btnrep = document.querySelectorAll(".reponsebtn");
console.log(btnrep);

const questions = [
  {
    question: "Que signifie HTML ?",
    reponses: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Machine Language"
    ],
    bonneReponse: 0
  },
  {
    question: "À quoi sert le CSS ?",
    reponses: [
      "Créer des bases de données",
      "Ajouter du style aux pages",
      "Programmer des fonctionnalités",
      "Créer des serveurs"
    ],
    bonneReponse: 1
  },
  {
    question: "Quel langage rend une page interactive ?",
    reponses: ["HTML", "CSS", "JavaScript", "PHP"],
    bonneReponse: 2
  },
  {
    question: "Quel attribut HTML permet de créer un lien ?",
    reponses: ["src", "href", "link", "url"],
    bonneReponse: 1
  },
  {
    question: "Git sert principalement à :",
    reponses: [
      "Dessiner des maquettes",
      "Versionner du code",
      "Créer des animations",
      "Héberger un site"
    ],
    bonneReponse: 1
  },
  {
    question: "Quelle balise affiche une image ?",
    reponses: ["<img>", "<image>", "<pic>", "<src>"],
    bonneReponse: 0
  },
  {
    question: "Que signifie CSS ?",
    reponses: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style System",
      "Color Style Sheets"
    ],
    bonneReponse: 1
  },
  {
    question: "querySelector permet de :",
    reponses: [
      "Créer une variable",
      "Sélectionner un élément HTML",
      "Ajouter une classe",
      "Afficher une alerte"
    ],
    bonneReponse: 1
  },
  {
    question: "Quel est un framework JavaScript ?",
    reponses: ["Laravel", "React", "Bootstrap", "Figma"],
    bonneReponse: 1
  },
  {
    question: "GitHub est :",
    reponses: [
      "Un langage",
      "Un éditeur de texte",
      "Une plateforme de dépôts Git",
      "Un framework"
    ],
    bonneReponse: 2
  }
];

let indexQuestion = 0;
let score = 0;
let reponsesUtilisateur = [];
let questionsMelangees = [];

const melangerQuestions = () => {
  questionsMelangees = [...questions].sort(() => Math.random() - 0.5);
};

const afficherQuestion = () => {
  const question = questionsMelangees[indexQuestion];

  texteQuestion.textContent = question.question;
  console.log(question);
  console.log(question.reponses);
  console.log(question.bonneReponse);
  console.log(`Question ${indexQuestion + 1}/10`);
  questionnombre.textContent = "Question " + (indexQuestion + 1) + "/10";
  barreProgression.style.width = `${((indexQuestion + 1) / 10) * 100}%`;

  btnrep.forEach((element, index) => {
    element.textContent = question.reponses[index];
    element.onclick = () => verifierReponse(index);
  });
};

const verifierReponse = (indexChoisi) => {
  const question = questionsMelangees[indexQuestion];
  reponsesUtilisateur.push(indexChoisi);

  if (indexChoisi === question.bonneReponse) {
    score++;
    retour.textContent = "✅ Bonne réponse";
  } else {
    retour.textContent = "❌ Mauvaise réponse";
  }

  setTimeout(() => {
    retour.textContent = "";
    indexQuestion++;
    indexQuestion < 10 ? afficherQuestion() : afficherResultat();
  }, 800);
};

const afficherResultat = () => {
  ecranQuestion.classList.add("cache");
  ecranResultat.classList.remove("cache");

  const pourcentage = Math.round((score / 10) * 100);
  texteScore.textContent = `Score : ${score}/10 (${pourcentage}%)`;

  appreciation.textContent =
    pourcentage >= 80 ? "🔥 Excellent travail !" :
    pourcentage >= 50 ? "👍 Bon résultat" :
    "💪 Tu peux encore progresser";

  questionsMelangees.forEach((q) => {
    const li = document.createElement("li");
    li.textContent = `${q.question} → ${q.reponses[q.bonneReponse]}`;
    listeCorrections.appendChild(li);
  });
};

btnDemarrer.addEventListener("click", () => {
  ecranAccueil.classList.add("cache");
  ecranQuestion.classList.remove("cache");
  melangerQuestions();
  afficherQuestion();
});

btnRecommencer.addEventListener("click", () => {
  location.reload();
});
