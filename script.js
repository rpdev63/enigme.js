class Level {
    constructor(level, blocs, list, title, hidden, background) {
        this.levelValue = level;
        this.numberOfBlocs = blocs;
        this.listOfString = list;
        this.title = title;
        this.hidden = hidden;
        this.background = background;
    }
    create() {
        var attempts = 0;
        var level = this.levelValue;
        //Chargement du fond d'écran si on est à l'énigme3
        if (this.levelValue === 4) {
            changeBackground(document.body, "img/stars.jpg");
        }
        if (this.levelValue === 5) {
            changeBackground(document.body, "");
        };

        //Récupération du bloc central, du champs titre et du champ réponse
        const blocsElt = document.getElementById("blocs");
        const titleElt = document.getElementById("title");
        const champTexteElt = document.getElementById("answer");
        //Récupération des boutons reset, delete et valider       
        const resetElt = document.getElementById("reset");
        const submitElt = document.getElementById("submit");

        //Initialisation d'une liste contenant la réponse de l'utilisateur
        let listUser = [];
        //Duplication de la liste initiale pour pouvoir comparer avec la listUser
        let listSolution = [];
        for (let i = 0; i < this.listOfString.length; i++) {
            listSolution[i] = this.listOfString[i];
        }

        let nextLevel = this.levelValue + 1;

        //Ajout du titre
        titleElt.innerHTML = this.title;

        //Création des blocs/buttons et ajout au bloc central 
        blocsElt.innerHTML = null; //on remets à null pour effacer les blocs des niveaux précédentsS
        for (let i = 0; i < this.numberOfBlocs; i++) {
            const newBlocElt = document.createElement("li");
            const newButtonElt = document.createElement("button");
            newButtonElt.name = "bloc";
            if (this.hidden) {
                newButtonElt.style.opacity = 0;
            }


            blocsElt.appendChild(newBlocElt.appendChild(newButtonElt));

        }
        //Remplissage des blocs 
        randomizeTab(this.listOfString);
        let nodeListOfBloc = document.querySelectorAll('button[name="bloc"]');
        for (const bloc of nodeListOfBloc) {
            bloc.innerHTML = this.listOfString.pop();
        }
        //Comportement des blocs/boutons centraux
        for (const bloc of nodeListOfBloc) {
            bloc.addEventListener("click", function(e) {
                e.preventDefault();
                champTexteElt.innerHTML += bloc.textContent + " ";
                listUser.push(bloc.textContent);
                bloc.setAttribute("disabled", "true");
            });
        }
        //Comportement du bouton reset
        resetElt.addEventListener("click", function(e) {
            e.preventDefault();
            listUser = [];
            champTexteElt.innerHTML = "";
            for (const bloc of nodeListOfBloc) {
                bloc.removeAttribute("disabled");
            }
        });

        //Comportemnt du bouton validation
        submitElt.addEventListener("click", validation);

        function validation(e) {
            e.preventDefault(e);
            let bool = compareArray(listSolution, listUser);
            attempts++;
            totalAttempts++;
            if (bool) {
                champTexteElt.innerHTML = "";
                createLevel(nextLevel);
                submitElt.removeEventListener("click", validation);
            } else {
                if (level === 3) {
                    if (attempts === 1) {
                        alert("Raté. Ce n'est pas le mot de passe que l'on demande !");
                    }
                    if (attempts > 1) {
                        alert("Raté. Il faut simplement mettre dans l'ordre.");
                    }
                } else {
                    alert("Raté. Essaie encore !");
                }

            }
        }
    }
}
//Fonction pour mélanger les éléments d'une liste
const randomizeTab = (tab) => {
    let i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
}

//Compare les 2 tableaux ( reponses utilisateur et bonnes réponses)
function compareArray(a1, a2) {

    var i = a1.length;
    if (i != a2.length) return false;

    while (i--) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
}

//Fonction pr changer le fond
function changeBackground(bElement, bUrl) {
    return bElement.style.backgroundImage = "url(" + bUrl + ")";
}


//Creation du niveau en fonction du niveau atteint
function createLevel(currentLevel) {
    const list1 = ["Bonjour", "je", "voudrais", "le", "mot", "de", "passe"];
    const list2 = ["P", "A", "N", "O", "R", "A", "M", "A"];
    const list3 = ["L", "Ma", "Me", "J", "V", "S"];
    const list4 = ["L", "Me", "Ma", "V", "S", "J"];
    const list5 = ["5", "3", "4", "1", "2", "6"];


    const title1 = "Ordonnez les boutons";
    const title2 = "Trouves le mot et tu l'obtiendras !";
    const title3 = "Le mot de passe est 5 3 4 1 2 6";
    const title4 = "La plus petite en premier";
    const title5 = "Entrez le mot de passe ";
    const title6 = "Bien joué ! Tu as résolu toutes les énigmes en " + totalAttempts + " essais.";

    switch (currentLevel) {
        case 1:
            let level1 = new Level(1, 7, list1, title1);
            level1.create();
            break;
        case 2:

            let level2 = new Level(2, 8, list2, title2);
            level2.create();
            break;
        case 3:
            let level3 = new Level(3, 6, list3, title3);
            level3.create();
            break;
        case 4:
            let level4 = new Level(4, 6, list4, title4);
            level4.create();
            break;
        case 5:
            let level5 = new Level(5, 6, list5, title5, true, true);
            level5.create();
            break;
        case 6:
            let level6 = new Level(6, 0, list1, title6);
            level6.create();
            break;
        default:
            break;
    }

}

function main() {
    //initialisation
    let currentLevel = 1;
    createLevel(currentLevel);

}
var totalAttempts = 0;
main()