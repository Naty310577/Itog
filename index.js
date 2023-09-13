async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const cards = $('.card');
let pairs = ['p', 'p', 't', 't', 'b', 'b', 'h', 'h', 's', 's'];
for (let card of cards) {
    card.classList.add('back');
}
async function start() {
    $('.card').off('click');
    $('#game').off('click');
    for (let card of cards) {
        card.classList.remove('p');
        card.classList.remove('s');
        card.classList.remove('t');
        card.classList.remove('h');
        card.classList.remove('b');
    }
    pairs.sort(() => Math.random() - 0.5);
    let index = 0;
    for (let card of cards) {
        card.classList.add(pairs[index++]);
        card.classList.remove('back');
        card.classList.add('front');
        await sleep(300);
    }
    await sleep(1000);
    for (let card of cards) {
        card.classList.remove('front');
        card.classList.add('back');
        await sleep(300);
    }
    for (let card of cards)
        $('#' + card.id).on('click', async()=> {checkCards(card);})
    $('#timer').text(0);
    interval = setInterval(() => {
        $('#timer').text(+$('#timer').text() + 1);
    }, 1000)
}
let interval;
$('#game').on('click', start)
let activePairs = 0;
async function checkCards(card) {
    card.classList.remove('back');
    card.classList.add('front');
    activeCards.push(card);
    if (activeCards.length > 1)
        if (activeCards[0].classList.value === activeCards[1].classList.value) {
            activeCards = [];
            activePairs++;
            await checkWin();
        }
        else {
            let cardsDel = [activeCards[0], activeCards[1]];
            activeCards = [];
            await sleep(500);
            cardsDel[0].classList.remove('front');
            cardsDel[0].classList.add('back');
            cardsDel[1].classList.remove('front');
            cardsDel[1].classList.add('back');
        }
}
function endGame() {
    $('#divend')[0].classList.add('hidden')
    $('#end2')[0].classList.remove('hidden')
}
async function yes() {
    $('#end2')[0].classList.add('hidden')
    await start()
}
async function no() {
    $('#end2')[0].classList.add('hidden')
}
let activeCards = [];
async function checkWin() {
    if (activePairs !== 5)
        return;
    await sleep(500);
    $('#game').on('click', start);
    for (let card of cards) {
        console.log(card.id);
        $("#" + card.id).off('click');
    }
    $('#divend')[0].classList.remove('hidden');
    activeCards = [];
    activePairs = 0;
    for (let card of cards) {
        card.classList.remove('front');
        card.classList.add('back');
    }
    clearInterval(interval);
}


