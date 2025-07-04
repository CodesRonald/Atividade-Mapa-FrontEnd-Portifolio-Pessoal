# Atividade-Mapa-FrontEnd-Portifolio-Pessoal- Ronald de Souza Verola

## 📜 Descrição

* **Este é o meu site de portfólio pessoal, um projeto desenvolvido para a entrega de uma atividade MAPA da faculdade UniCesumar. O site foi criado do zero para demonstrar as habilidades em desenvolvimento web front-end, atendendo aos requisitos da atividade, que exigiam a criação de um portfólio com código bem organizado e comentado de forma explicativa. O objetivo deste projeto é apresentar quem eu sou, minhas habilidades e os projetos que desenvolvi em cursos , além de servir como um ponto de contato profissional.**

## ✨ Funcionalidades Principais

* **Design Totalmente Responsivo:** O layout se adapta perfeitamente a desktops, tablets e celulares. Além disso, foram criados estilos específicos para garantir a usabilidade em telas extremamente pequenas, como as de smartwatches.
* **Navegação Fluida:** O site utiliza carregamento de conteúdo de forma assíncrona (com a API Fetch), permitindo que o usuário navegue entre as seções de "Projetos" e "Contato" sem a necessidade de recarregar a página.
* **Menu Mobile Avançado:** Um menu hambúrguer, construído com Programação Orientada a Objetos, gerencia o estado e as animações de forma inteligente, além de ser totalmente acessível via teclado e para leitores de tela.
* **Interatividade com JavaScript:**
    * **Formulário de Contato com Validação:** O formulário de contato possui validação em tempo real para todos os campos, utilizando expressões regulares (Regex) para e-mail e telefone.
    * **Efeito de Digitação:** O título principal na página inicial é animado com um efeito de máquina de escrever para uma introdução dinâmica.
    * **Microanimações:** Diversos elementos reagem ao cursor do mouse com animações sutis, como links sublinhados, botões com fundos deslizantes e ícones que giram.
* **UI Moderna com "Glassmorphism":** O cabeçalho e outros componentes utilizam um efeito de vidro fosco (`backdrop-filter`), seguindo tendências modernas de design de interface.

## 🚀 Tecnologias Utilizadas

* **HTML5:** Utilização de tags semânticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) para melhor estrutura, acessibilidade e SEO.
* **CSS3:** Estilização avançada com recursos modernos como Flexbox, Grid Layout, gradientes, pseudo-elementos e animações complexas com `@keyframes`.
* **JavaScript (ES6+):** Todo o dinamismo e interatividade foram construídos com JavaScript puro (Vanilla JS), incluindo manipulação do DOM, Programação Orientada a Objetos (POO), e requisições assíncronas (AJAX) com a API Fetch.
* **Font Awesome:** Biblioteca utilizada para a inclusão de ícones de alta qualidade em todo o site.

## 📂 Estrutura do Projeto

O projeto é organizado de forma modular para facilitar a manutenção e escalabilidade:

```bash
/
├── index.html # Página principal/inicial
├── sobre.html # Página "Sobre mim"
├── projetos.html # Página de "Projetos"
├── contato.html # Página de "Contato"
│
├── css/
│ └── style.css # Única folha de estilos para todo o site
│
├── js/
│ └── javascript.js # Único arquivo de script para toda a lógica do site
│
└── img/
├── favicon-icon-portifólio.jpg
├── foto-perfil-ronald.jpg
├── Portifólio Pessoal.jpg
├── projeto cordel.jpg
└── Projeto android.jpg
```

## ⚙️ Instalação e Uso

Como este é um projeto front-end estático, você não precisa de nenhuma ferramenta de build ou dependência complexa.

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/CodesRonald/nome-do-seu-repositorio.git](https://github.com/CodesRonald/nome-do-seu-repositorio.git)
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd nome-do-seu-repositorio
    ```
3.  Abra o arquivo `index.html` no seu navegador de preferência.

E pronto! O site estará funcionando localmente.

## 🧠 Desafios e Aprendizados

Durante o desenvolvimento, alguns desafios interessantes surgiram:

* **Prevenir Bugs por Cliques Rápidos:** Para evitar que as animações do menu quebrassem com cliques rápidos, foi implementada uma flag `isAnimating` na classe do menu, que impede novas ações enquanto uma animação está em andamento.
* **Manter a Interatividade em Conteúdo Dinâmico:** Como o conteúdo das páginas era carregado via Fetch, os event listeners originais não se aplicavam. A solução foi criar uma função `rebindInteractions()` que é chamada sempre que um novo conteúdo é injetado na página, reaplicando as interatividades.
* **Layouts em Modo Paisagem e Telas com "Notch":** Foram criadas media queries específicas para corrigir quebras de layout em celulares no modo paisagem e foi adicionado `viewport-fit=cover` à meta tag viewport para eliminar bordas brancas em dispositivos com notch.

## 👤 Autor

**Ronald de Souza Verola**

* **LinkedIn:** [ronald-verola](https://www.linkedin.com/in/ronald-verola/)
* **GitHub:** [@CodesRonald](https://github.com/CodesRonald)
* **Email:** [ronald.official.contact@gmail.com](mailto:ronald.official.contact@gmail.com)