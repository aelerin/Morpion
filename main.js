// Variable des marques

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

// Variable combinaison de victoire
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// Variable qui selectionne toutes nos cellules
const cellElements = document.querySelectorAll('[data-cell]')

// Variable qui selectionne l'id board de la division contenant toutes nos cellules
const board = document.getElementById('board')

// Variable qui selectionne l'id de la division winningmessage
const winningMessageElement = document.getElementById('winningMessage')

// Variable qui selectionne l'id du bouton restart
const restartButton = document.getElementById('restartButton')

// Variable qui selectionne le texte de la division winningmessage 
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

// Variable de changement de tour qui alterne entre true et false
let circleTurn

// Démarrage de la partie des le chargement du javascript
startGame()

// AJout d'un event click sur le bouton qui reset la partie
restartButton.addEventListener('click', startGame)

// Fonction de début de partie avec effacement des symboles et event 
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

// Fonction qui check si la partie est gagnée/draw ou toujours en cours et qui alterne les tours à chaque evenement de clique
function handleClick(event) {
    const cell = event.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()

    }
}

// Fonction qui affiche si la partie se finit sur un Draw ou sur une win.

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw'
    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "Kim Jong-un" : "Trump"} Win!`
    }
    winningMessageElement.classList.add('show')
}

//  Fonction qui check si les 9 cases sont complété sans condition de victoire
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

// Fonction qui place la marque correspondant au tour
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// Fonction de changement de tour
function swapTurns() {
    circleTurn = !circleTurn

}

// Fonction qui affiche sur le pointeur de souris la marque suivant le tour  (supprime l'ancienne marque et affiche le nouveau suivant le tour)
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}

// Fonction qui check si la condition de victoire est rempli suivant la variable d'array WINNING_COMBINATION
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })

    })
}