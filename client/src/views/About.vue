<template>
    <div class="container mb-6">
        <section class="welcome">
            <h1>À propos</h1>
            <h1><small>Découvrez ici les techniques de production américaines</small></h1>
        </section>
        <hr>
        <section>
            <div class="row mb-3">
                <div class="col-md-6 text-center text-lg-right pr-lg-5" id="developers-column">
                    <h4 class="mb-lg-5">Développeurs</h4>
                    <h5>
                        Yvan Le Duc
                        <small>(<a href="https://github.com/GBazinga" target="_blank">@GBazinga</a>)</small>
                    </h5>
                    <p>
                        Aussi appelé géni-van à cause de sa capacité à comprendre rapidement de nouveaux concepts, il
                    réussit à faire ressortir le meilleur de nous-même (j'ai été gentil lol).
                    </p>
                    <h5>
                        Antoine Bédex
                        <small>(<a href="https://github.com/Ant1B2x" target="_blank">@Ant1B2x</a>)</small>
                    </h5>
                    <p>
                        Grâce à son QI proche du zéro et à son extraordinaire confiance en lui, il a le toupet de
                    développer un back-end qui ne marche pas en étant persuadé qu'il marche.
                    </p>
                    <h5>
                        Esteban Baichoo
                        <small>(<a href="https://github.com/Seaziicks" target="_blank">@Seaziicks</a>)</small>
                    </h5>
                    <p>
                        Adepte du code sale mais qui marche, n'hésitez pas à le contacter pour le féliciter sur le
                    front-end (peu probable) ou pour l'engueuler si quelque chose ne marche pas (fort probable).
                    </p>
                </div>
                <div class="col-md-6 text-center text-lg-left pl-lg-5" id="informations-column">
                    <h4 class="mb-lg-5">Informations</h4>
                    <h5>Framework back-end</h5>
                    <p>
                        Nous avons utilisé le framework JavaScript/TypeScript
                        <a href="https://feathersjs.com/" target="_blank">Feathers</a>,
                        <br/>qui se base sur
                        <a href="https://nodejs.org/" target="_blank">Node.js</a> et
                        <a href="https://expressjs.com/" target="_blank">Express</a>
                        pour développer le serveur de l'application.
                    </p>
                    <h5>Framework front-end</h5>
                    <p>
                        Nous avons développé le client avec le framework
                        <a href="https://vuejs.org/" target="_blank">Vue.js</a>
                        qui est en gros un Angular en moins bien.
                    </p>
                    <h5>Base de donnée</h5>
                    <p>
                        Le SGBD <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>
                        (qui est à-peu-près le plus performant du monde) a été choisi afin de stocker nos données.
                    </p>
                    <h5>Template HTML/CSS</h5>
                    <p>
                        Nous nous sommes servis du template HTML/CSS
                        <a href="https://preview.webpixels.io/quick-website-ui-kit/" target="_blank">Quick</a>
                        parce qu'on est un peu nuls en CSS quand même.
                    </p>
                </div>
            </div>
            <div class="row" id="source-code-button">
                <div class="col-md-12">
                    <a class="btn btn-outline-primary" href="https://github.com/Ant1B2x/ParraiN7" target="_blank">Code Source</a>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
@import "css/About.css";
</style>
