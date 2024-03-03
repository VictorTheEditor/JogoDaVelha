const FBlur = document.querySelector('.FundoBlur')
const creditos = document.querySelector('.creditos')


function changeDisplay(fb, cr){
    if(fb.style.display === 'block') fb.style.display = 'none'
    else fb.style.display = 'block'
    
    if(cr.style.display === 'block') cr.style.display = 'none'
    else cr.style.display = 'block'
} 

function voltar(){
    changeDisplay(FBlur, creditos)
}

window.addEventListener('load', function(){
    const credito = confirm(
        "Este site é um projeto sem fins lucrativos desenvolvido por um estudante de programação front-end. As imagens foram obtidas do Google, a música de fundo do YouTube e as fontes foram retiradas do site Dafont. Para visualizar os créditos, clique em 'Ok'!")

    if(credito === true){
        changeDisplay(FBlur, creditos)
    }
})