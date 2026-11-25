# Jokenpô

Pequeno jogo de pedra, papel e tesoura feito como trabalho da faculdade (Aula Prática de Desenvolvimento em JavaScript). O jogador enfrenta um robô, o **Joketron**, em uma partida rápida com animações em CSS e JavaScript puro.

## Como jogar

1. Ao abrir a página, digite o seu nome e clique em **Confirmar**. Se deixar em branco, você joga como "João".
2. A tela é dividida em dois painéis: o seu, à esquerda, e o do robô, à direita.
3. Escolha um sinal: ✊ pedra, 🖐 papel ou ✌ tesoura.
4. Uma contagem com os três sinais atravessa a tela e, em seguida, o robô revela a jogada dele, escolhida aleatoriamente.
5. O resultado aparece no topo da tela, e os painéis mudam de cor:
   - **Verde:** vencedor
   - **Vermelho:** perdedor
   - **Cinza:** empate
6. Clique em **Jogar Novamente** para começar outra rodada.

## Regras

| Sinal | Vence | Perde para |
|-------|-------|------------|
| ✊ Pedra | Tesoura | Papel |
| 🖐 Papel | Pedra | Tesoura |
| ✌ Tesoura | Papel | Pedra |

## Funcionalidades

- Janela de entrada (`<dialog>`) para o nome do jogador, que não fecha com a tecla `Esc`.
- Painéis do jogador e do robô gerados dinamicamente com JavaScript.
- Animação de contagem, com os emojis deslizando pela tela, antes da revelação do resultado.
- Efeito "boing" na exibição do sinal escolhido por cada lado.
- Botão para reiniciar a partida sem recarregar a página.

## Como funciona

- Os sinais são criados pela função construtora `Sinal`, que guarda o nome, o emoji e a lista de sinais contra os quais perde. Assim, adicionar novos sinais não exige mudar a lógica de decisão.
- Os participantes são criados pela função construtora `Jogador`, que guarda o nome, o sinal escolhido e o painel na tela.
- A sequência de animação usa `setTimeout` com atraso de 1 segundo por sinal. Quando a última animação termina (`animationend`), o robô sorteia o sinal com `Math.random()` e o resultado é calculado.
- As animações visuais (`slideScreen`, `boing`) e as transições de entrada (`@starting-style`) são feitas em CSS.

## Estrutura do projeto

```
├── index.html   # estrutura da página, janela de nome e área dos painéis
├── style.css    # layout, cores de resultado e animações
└── script.js    # lógica do jogo, sinais, jogadores e sequência de animação
```

## Como executar

Não há dependências nem etapa de build.

1. Baixe ou clone o repositório ou entre no [link](https://tesma.github.io/aula-jokenpo/)
2. Abra o arquivo `index.html` em um navegador moderno.

> **Observação:** o projeto usa `@starting-style` e `<dialog>`, então funciona melhor em versões recentes do Chrome, Edge, Safari e Firefox.

## Tecnologias

- HTML5 (`<dialog>`)
- CSS3 (Grid, Flexbox, animações, transições e `@starting-style`)
- JavaScript (manipulação do DOM, eventos, `setTimeout`)

## Créditos

Feito por **Lucas Colli Guzelotto** | 2026
