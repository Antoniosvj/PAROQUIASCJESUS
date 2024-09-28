import { Botao } from "../Botao";

import style from './Comunidades.module.css'

const Comunidades = () => {
    return(
        <section className={style.Comunidades}>
            <h2>Comunidades Paroquial</h2>
            <p>Esta Paróquia é composta por 25 comunidades, sendo x no município de Divino de São Lourenço e x no município de Ibitirama</p>
            <div className={style.containerComunidades}>
            <div className={style.containerBotao}>
                <h3>Comunidades no Município de Divino de São Lourenço</h3>
                <Botao nomeBotao="Matriz - Divino Espírito Santo e São Lourenço"/>
                <Botao nomeBotao="Santa Luzia"/>
                <Botao nomeBotao="Nossa Senhora da Piedade"/>
                <Botao nomeBotao="Santo Expedito"/>
                <Botao nomeBotao="São Bráz"/>
                <Botao nomeBotao="Santa Terezinha"/>
                <Botao nomeBotao="Nossa Senhora Aparecida"/>
                <Botao nomeBotao="Nossa Senhora da Penha"/>
                <Botao nomeBotao="Nossa Senhora das Graças"/>
                <Botao nomeBotao="Nossa Senhora das Graças"/>
            </div>
            <div className={style.containerBotao}>
                <h3>Comunidades no Município de Ibitirama</h3>
                <Botao nomeBotao="Nossa Senhora Aparecida"/>
                <Botao nomeBotao="Nossa Senhora da Penha"/>
                <Botao nomeBotao="Nossa Senhora das Graças"/>
                <Botao nomeBotao="Santa Barbara"/>
                <Botao nomeBotao="São Francisco"/>
                <Botao nomeBotao="São Pedro"/>
                <Botao nomeBotao="Santa Rita"/>
                <Botao nomeBotao="São José"/>
            </div>
            </div>
        </section>
    )
}
export {Comunidades};