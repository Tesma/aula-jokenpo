const paineis = document.getElementById('paineis')
const jogador_info = document.getElementById('jogador-info')
const jogador_nome = jogador_info.querySelector('input')
const jogador_confirma = jogador_info.querySelector('button')
const jogadores = []
const sinais = []

function Sinal(nome,emoji,perde = []) {
    this.nome = nome;
    this.emoji = emoji;
    this.perde = perde;

    sinais.push(this)
}

new Sinal('pedra',"✊",["papel"])
new Sinal("papel","🖐",["tesoura"])
new Sinal("tesoura","✌",["pedra"])

function Jogador(nome) {
    this.nome = nome
    //this.vitorias = 0;
    //this.derrotas = 0;
    this.sinal = undefined
    this.painel = undefined

    jogadores.push(this)
}
const jogador = new Jogador("João")
const robo = new Jogador("Joketron")

jogador_info.showModal()

//previne o esc fechar o dialog
jogador_info.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
  }
});

jogador_confirma.addEventListener('click', ()=> {
    if (jogador_nome.value !== "") {
        jogador.nome = jogador_nome.value
    }
    jogador_info.close()

    for (const j of jogadores) {
        const painel = document.createElement('div')
        painel.id = 'painel-jogador'

        const emoji = document.createElement('h1')
        emoji.textContent = "👤"

        const nome = document.createElement('h2')
        nome.textContent = j.nome

        painel.appendChild(emoji)
        painel.appendChild(nome)
        j.painel = painel

        if (j !== robo) {
            const botoes = document.createElement('div')
            botoes.id = 'botoes-sinais'
            for (const s of sinais) {
                const botao = document.createElement('button')
                botao.textContent = s.emoji
                botao.title = s.nome.charAt(0).toUpperCase() + s.nome.slice(1)
                botoes.appendChild(botao)

                botao.onclick = () => {
                    j.sinal = s
                    iniciar()
                }
            }
            painel.appendChild(botoes)
        } else {
            emoji.textContent = "🤖"
        }

        j.emoji = emoji.textContent
        paineis.appendChild(painel)
    }
})

function iniciar() {
    const botoes = document.querySelectorAll('#botoes-sinais')
    for (const b of botoes) {
        b.style.display = 'none'
    }

    for(let s = 0; s < sinais.length; s++) {
        const sinal = sinais[s]
        const last = s === sinais.length - 1

        setTimeout(()=> {
            console.log(sinal)
            const sinalElemento = document.createElement('h1')
            sinalElemento.textContent = sinal.emoji;
            sinalElemento.classList.add('slideEmoji')
            sinalElemento.addEventListener('animationend', ()=> {
                sinalElemento.remove()
                if (last) {
                    robo.sinal = sinais[Math.floor(Math.random() * sinais.length)];
                    const venceu = jogador.sinal.perde.find((element) => element === robo.sinal.nome)

                    const condicaoTitulo = document.createElement('h1')
                    condicaoTitulo.id = 'titulo-condicao'
                    document.body.appendChild(condicaoTitulo)
                    let jcond = 'empate';
                    let rcond = "empate"

                    if (venceu === undefined) {
                        if (jogador.sinal === robo.sinal) { //empate
                            condicaoTitulo.textContent = 'Empate!'
                        } else { //jogador venceu
                            condicaoTitulo.textContent = jogador.emoji + jogador.nome + ' vence!'
                            jcond = 'vencedor'
                            rcond = 'perdedor'
                        }
                    } else { //jogador perdeu
                        condicaoTitulo.textContent = robo.emoji + robo.nome + ' vence!'
                        jcond = 'perdedor'
                        rcond = 'vencedor'
                    }

                    jogador.painel.classList.add(jcond)
                    robo.painel.classList.add(rcond)

                    for (const j of jogadores) {
                        const meuSinalEle = document.createElement('h1')
                        meuSinalEle.className = 'boing'
                        meuSinalEle.textContent = j.sinal.emoji;
                        j.painel.appendChild(meuSinalEle)
                    }

                    setTimeout(() => {
                        const reiniciarBt = document.createElement('button')
                        reiniciarBt.id = 'reiniciar-bt'
                        reiniciarBt.textContent = 'Jogar Novamente'
                        reiniciarBt.onclick = reiniciar
                        document.body.appendChild(reiniciarBt)
                    },1000)

                }
            })

            document.body.appendChild(sinalElemento)

        },1000 * s)
    }

}

function reiniciar() {
    document.querySelector('#titulo-condicao').remove()
    document.querySelector('#reiniciar-bt').remove()
    for (const j of jogadores) {
        j.painel.className = ''
        j.painel.querySelector('.boing').remove()
        j.painel.querySelector('#botoes-sinais').style.display = 'grid'
    }
}