# Previsão do Tempo

Aplicação web para exibir a previsão do tempo em tempo real e para os próximos 5 dias de qualquer cidade do mundo utilizando a API [Open-Meteo](https://open-meteo.com/) e a API de geocodificação. A página é responsiva, apresenta ícones meteorológicos e altera o tema de fundo conforme o horário do dia.

---

## 📦 Tecnologias Utilizadas

* **HTML5** – Estrutura da página
* **CSS3** – Estilos e responsividade
* **JavaScript (Vanilla)** – Lógica de busca, manipulação do DOM e integração com APIs
* **API Open-Meteo** – Dados meteorológicos em tempo real e previsão para 5 dias
* **API de Geocodificação Open-Meteo** – Obtenção de coordenadas a partir do nome da cidade
* **Weather Icons** – Ícones representando as condições meteorológicas

---

## 🗂 Estrutura do Projeto

```
/
├── index.html       # Página principal
├── style.css        # Estilos do projeto
├── api.js           # Funções JavaScript para buscar dados e atualizar o DOM
└── assets/
    └── icons/
        └── css/
            └── weather-icons.css  # Ícones meteorológicos
```

---

## 📝 Funcionalidades

### 1. Formatação de Data e Hora

```js
function formatarDataHora()
```

* Retorna a data e hora atuais no formato brasileiro:
  `terça-feira, 12 de novembro de 2025 14:30`.

### 2. Ícones de Clima

```js
function getWeatherIcon(weatherCode)
```

* Recebe um código de clima da API Open-Meteo e retorna a classe CSS correspondente ao ícone.
* Exemplo: `0 -> wi-day-sunny`

### 3. Tema Dinâmico por Horário

```js
function aplicarTemaPorHorario()
```

* Aplica fundo azul claro para o dia e azul escuro para a noite, alterando o visual do site automaticamente.

### 4. Busca de Clima e Previsão de 5 Dias

```js
form.addEventListener("submit", async (event) => { ... })
```

* Captura o nome da cidade digitada pelo usuário.
* Busca as coordenadas via API de geocodificação.
* Obtém dados meteorológicos em tempo real e previsão para os próximos 5 dias.
* Renderiza um card com:

  * Temperatura atual
  * Ícone do clima
  * Descrição textual
  * Cidade e país
  * Data e hora formatadas
  * Temperaturas máximas e mínimas dos próximos 5 dias
* Valida entrada e exibe mensagens de erro caso:

  * O campo esteja vazio
  * A cidade não seja encontrada
  * Haja falha na API

### 5. Responsividade

* Layout adaptável para dispositivos móveis.
* Card principal e formulário ajustam tamanho e disposição para telas pequenas.

---

## 🎨 Estilos Adicionais para Previsão de 5 Dias

```css
.forecast-container {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}
.forecast-day {
    background-color: #eaf2fb;
    border-radius: 10px;
    padding: 0.8rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
}
.forecast-day span {
    font-weight: 600;
}
```

---

## 📄 Exemplo de Uso

1. Abra o arquivo `index.html` no navegador.
2. Digite o nome de uma cidade no campo de busca.
3. Clique em **Buscar**.
4. O card será atualizado com a previsão do tempo atual e as temperaturas máximas e mínimas para os próximos 5 dias.

---

## ⚙️ Personalizações Possíveis

* Adicionar previsões detalhadas por hora.
* Alterar cores e gradientes para o tema do dia e da noite.
* Expandir o mapeamento de ícones de clima.
* Localização automática via geolocalização do navegador.

---

## 🔗 Referências

* [Open-Meteo API](https://open-meteo.com/)
* [Weather Icons](https://erikflowers.github.io/weather-icons/)
* [Documentação Intl.DateTimeFormat](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)

---

## 📝 Observações

* Requer conexão com a internet para consumir APIs.
* Compatível com navegadores modernos.
* Mensagens de erro são exibidas em vermelho abaixo do formulário.
* Para testes, buscar cidades válidas e inválidas para verificar comportamento e previsões.

---

## 📄 Licença

Este projeto é de uso pessoal e educativo.

---

**Projeto desenvolvido por Milena Svitras**


