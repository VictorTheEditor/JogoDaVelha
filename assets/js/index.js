function Jogo(){
    let player = 'O'

    const containerGame = document.querySelector('.container-game')
    const containerLogin = document.querySelector('.container-login')

    this.inputP1 = containerLogin.querySelector('.inputPlayer1')
    this.inputP2 = containerLogin.querySelector('.inputPlayer2')

    const audio = document.querySelector('.audio')
    audio.addEventListener('ended',function(){
        audio.currentTime = 0;
        audio.play();
    })

    let play = true

    //FUNÇÃO DE CLICAR NOS ELEMENTOS NO JOGO
    document.addEventListener('click',(e)=>{
        const el = e.target

        //INICIA JOGO
        if(el.classList.contains('enterGame')){

            //CONDIÇÃO PARA TODOS JOGADORES INSERIREM OS NOMES
            if(this.jogadoresLength() == false){
                return this.NotificaçãoErro('TODOS JOGADORES TEM QUE INSERIR UM NOME COM MENOS DE 5 CARACTERIS')
            }

            //CONDIÇÃO PARA TODOS JOGADORES INSERIREM OS NOMES COM 4 LETRAS
            if(this.verificaJogadores() == false){
                return this.NotificaçãoErro('TODOS JOGADORES TEM QUE INSERIR UM NOME')
            }

            this.inseriPlayers()
            this.limpaNomes()
            
            this.mudaDisplay(containerGame)
            this.mudaDisplay(containerLogin)
        }

        //INSERI OS ('X' e 'O') NOS BLOCOS
        if(el.classList.contains('bloco')){
            player = this.trocarJogador(player,el)
            el.innerHTML = player

            
            if(this.verificaVencedor() === false) return this.empate()
        }

        //LIMPA E REINCIA A PARTIDA
        if(el.classList.contains('reiniciar')){
            this.reiniciar()
        }

        //SAIR E VOLTAR PARA TELA DE LOGIN
        if(el.classList.contains('sair')){
            this.mudaDisplay(containerLogin)
            this.mudaDisplay(containerGame)
        }

        //BOTÂO VOLTAR (ERRO)
        if(el.classList.contains('VoltarErro')){
            this.mudaDisplay(this.fundoBlur)
            this.limpaNomes()
            this.notificaçãoErro.remove()
        }

        //BOTÂO VOLTAR 
        if(el.classList.contains('Voltar')){
            this.mudaDisplay(this.fundoBlur)
            this.notificaçãoVencedor.remove()
            this.reiniciar()
        }

        
        //BOTAO LIGA AUDIO
        if(el.classList.contains('btnAudioMenu')){
            if(play){
                el.src = 'assets/images/icons/audioON.png'
                audio.play()
            }
            else{
                el.src = 'assets/images/icons/audioOFF.png'
                audio.pause()
            }
            
            play = !play
        }

    });

    /////////////////////////////////////////////////////////
    //METODOS

    //LIMPA O INPUT DOS NOMES
    this.limpaNomes = () =>{
        this.inputP1.value = ''
        this.inputP2.value = ''
    }


    //INSERI OS NOMES DO INPUT NO JOGO
    this.inseriPlayers = () =>{
        this.j1 = containerGame.querySelector('.player1')
        this.j2 = containerGame.querySelector('.player2')

        this.j1.innerHTML = this.inputP1.value
        this.j2.innerHTML = this.inputP2.value
    }
    
    //VERICA SE OS JOGADORES COLOCARAM NOMES
    this.verificaJogadores = () =>{
        if(this.inputP1.value === '' || this.inputP2.value === '') return false
    }

    //VERICA SE OS JOGADORES COLOCARAM NOMES COM 4 LETRAS OU MENOS
    this.jogadoresLength = () =>{
        if(this.inputP1.value.length > 5 || this.inputP2.value.length > 5) return false
    }

    //FUNÇÂO PARA CRIAR NOTIFICAÇÕES
    const Notificação = () =>{
        const notificação = document.createElement('div')
        return notificação
    }

    //FUNÇÂO PARA CRIAR BOTAO DAS NOTIFICAÇÕES
    const Botão = () =>{
        const botão = document.createElement('button')
        botão.innerText = 'VOLTAR'
        return botão
    }

    //NOTIFICAÇÂO DE ERRO
    this.NotificaçãoErro = (msg) =>{
        this.fundoBlur = document.querySelector('.FundoBlur')

        this.notificaçãoErro = Notificação()
        this.notificaçãoErro.classList.add('notificação')

        this.notificaçãoErro.innerHTML = msg

        const botão = Botão()
        botão.classList.add('VoltarErro')

        this.notificaçãoErro.appendChild(botão)

        containerLogin.appendChild(this.notificaçãoErro)
        this.mudaDisplay(this.fundoBlur)
    }


    //NOTIFICAÇÕES DE VENCEDOR
    this.NotificaçãoVencedor = (msg) =>{
        this.fundoBlur = document.querySelector('.FundoBlur')
        this.notificaçãoVencedor = Notificação()

        this.notificaçãoVencedor.classList.remove('notificação')
        this.notificaçãoVencedor.classList.add('vencedor')
        this.notificaçãoVencedor.innerHTML = `<h1>${msg}</h1>`

        const botão = Botão()
        botão.classList.add('Voltar')

        this.notificaçãoVencedor.appendChild(botão)

        document.body.appendChild(this.notificaçãoVencedor)
        this.mudaDisplay(this.fundoBlur)

        return this.notificaçãoVencedor
    }



    //MUDA DISPLAY DOS CONTAINER
    this.mudaDisplay = (container) =>{
        const styleContainer = getComputedStyle(container)
        
        if(styleContainer.display === 'none') container.style.display = 'flex'
        else container.style.display = 'none'
    } 

    //TROCA DE JOGADOR
    this.trocarJogador = (jogador, el) =>{

        if(el.innerHTML == 'X') return 'X'
        if(el.innerHTML == 'O') return 'O'

        if(jogador === 'O') return 'X'
        if(jogador === 'X') return 'O'
    }

    //REINICIAR OU (LIMPAR BLOCOS)
    this.reiniciar = () =>{
        const table = document.querySelector('.table')

        const blocos = table.querySelectorAll('.bloco')

        for(bloco of blocos){
            bloco.innerHTML = ''
        }
    }

    this.verificaVencedor = () =>{
        let valid = false

        const a1 = document.querySelector('.a1')
        const a2 = document.querySelector('.a2')
        const a3 = document.querySelector('.a3')

        const b1 = document.querySelector('.b1')
        const b2 = document.querySelector('.b2')
        const b3 = document.querySelector('.b3')

        const c1 = document.querySelector('.c1')
        const c2 = document.querySelector('.c2')
        const c3 = document.querySelector('.c3')

        if(a1.innerHTML === 'X' && b1.innerHTML === 'X' && c1.innerHTML === 'X'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j1.innerHTML} VENCEU`)
        } 
            
        if(a2.innerHTML === 'X' && b2.innerHTML === 'X' && c2.innerHTML === 'X'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j1.innerHTML} VENCEU`)
        } 
            
        if(a3.innerHTML === 'X' && b3.innerHTML === 'X' && c3.innerHTML === 'X'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j1.innerHTML} VENCEU`)
        } 
            

        if(a1.innerHTML === 'X' && a2.innerHTML === 'X' && a3.innerHTML === 'X'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j1.innerHTML} VENCEU`)
        } 

        if(b1.innerHTML === 'X' && b2.innerHTML === 'X' && b3.innerHTML === 'X'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j1.innerHTML} VENCEU`)
        } 

        if(c1.innerHTML === 'X' && c2.innerHTML === 'X' && c3.innerHTML === 'X'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j1.innerHTML} VENCEU`)
        } 


        if(a1.innerHTML === 'X' && b2.innerHTML === 'X' && c3.innerHTML === 'X'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j1.innerHTML} VENCEU`)
        } 

        if(c1.innerHTML === 'X' && b2.innerHTML === 'X' && a3.innerHTML === 'X'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j1.innerHTML} VENCEU`)
        } 
            
        

        if(a1.innerHTML === 'O' && b1.innerHTML === 'O' && c1.innerHTML === 'O'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j2.innerHTML} VENCEU`)
        }
        if(a2.innerHTML === 'O' && b2.innerHTML === 'O' && c2.innerHTML === 'O'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j2.innerHTML} VENCEU`)
        }
        if(a3.innerHTML === 'O' && b3.innerHTML === 'O' && c3.innerHTML === 'O'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j2.innerHTML} VENCEU`)
        }

        if(a1.innerHTML === 'O' && a2.innerHTML === 'O' && a3.innerHTML === 'O'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j2.innerHTML} VENCEU`)
        }
        if(b1.innerHTML === 'O' && b2.innerHTML === 'O' && b3.innerHTML === 'O'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j2.innerHTML} VENCEU`)
        }
        if(c1.innerHTML === 'O' && c2.innerHTML === 'O' && c3.innerHTML === 'O'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j2.innerHTML} VENCEU`)
        }

        if(a1.innerHTML === 'O' && b2.innerHTML === 'O' && c3.innerHTML === 'O'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j2.innerHTML} VENCEU`)
        }
        if(c1.innerHTML === 'O' && b2.innerHTML === 'O' && a3.innerHTML === 'O'){
            valid = true
            this.NotificaçãoVencedor(`JOGADOR ${this.j2.innerHTML} VENCEU`)
        }

        return valid
    }

    let arrayBlocos = []

    //METODO PARA VERIFICAR EMPATE
    this.empate = () =>{
        const blocos = containerGame.querySelectorAll('.bloco')

       for(let bloco of blocos){
            if(bloco.innerText !== ''){
                arrayBlocos.push(true)

                if(arrayBlocos.length >= 9){
                    arrayBlocos = []
                    return this.NotificaçãoVencedor(`EMPATE`)
                }
            }
       }
       
       arrayBlocos = []
    }

}

const JogoDaVelha = new Jogo()

