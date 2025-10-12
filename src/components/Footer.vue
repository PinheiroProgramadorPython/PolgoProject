<template>
<footer class="bg-dark text-light pt-5 pb-4 mt-5 mx-5">
  <div class="container text-center text-md-start">
    <div class="row text-center text-md-start">
      <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
        <h5 class="text-uppercase mb-4 fw-bold text-warning">Promoção Polgo</h5>
        <p>
          Participe da nossa campanha e concorra a prêmios incríveis!  
          Cadastre-se e acompanhe os ganhadores aqui.
        </p>
      </div>

      <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
        <h5 class="text-uppercase mb-4 fw-bold text-warning">Links úteis</h5>
        <p><RouterLink to="/comoparticipar" class="text-light text-decoration-none">Como participar</RouterLink></p>
        <p><RouterLink to="/premios" class="text-light text-decoration-none">Prêmios</RouterLink></p>
        <p><RouterLink to="/ganhadores" class="text-light text-decoration-none">Ganhadores</RouterLink></p>
        <p><RouterLink to="/faq" class="text-light text-decoration-none">FAQ</RouterLink></p>
        <p><RouterLink to="/" class="text-light text-decoration-none">Home</RouterLink></p>
      </div>

      <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
        <h5 class="text-uppercase mb-4 fw-bold text-warning">Contato</h5>
        <p><i class="bi bi-geo-alt-fill me-2"></i> São Paulo, SP</p>
        <p><i class="bi bi-envelope-fill me-2"></i> contato@polgo.com.br</p>
        <p><i class="bi bi-telephone-fill me-2"></i> (11) 4002-8922</p>
      </div>

      <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
        <h5 class="text-uppercase mb-4 fw-bold text-warning">Siga-nos</h5>
        <a href="#" class="btn btn-outline-light btn-floating m-1"><i class="bi bi-facebook"></i></a>
        <a href="#" class="btn btn-outline-light btn-floating m-1"><i class="bi bi-instagram"></i></a>
        <a href="#" class="btn btn-outline-light btn-floating m-1"><i class="bi bi-twitter-x"></i></a>
        <a href="#" class="btn btn-outline-light btn-floating m-1"><i class="bi bi-youtube"></i></a>
        <RouterLink to="/#" class="btn btn-outline-light btn-floating m-1"><i class="bi bi-house"></i></RouterLink>
      </div>
    </div>

    <hr class="my-3">

    <div class="text-center">
      <p class="mb-0">© 2025 Polgo. Todos os direitos reservados.  
        <a href="#regulamento" class="text-warning text-decoration-none">Regulamento</a>
      </p>
    </div>
  </div>
</footer>

</template>
