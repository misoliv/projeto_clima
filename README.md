# 🌦️ Previsão do Tempo

Aplicação web moderna e responsiva para exibir **a previsão do tempo em tempo real**, incluindo **temperatura, umidade, vento, precipitação e máximas/mínimas**.  
O sistema utiliza a **API Open-Meteo** e fornece uma interface intuitiva e acessível, com foco em **simplicidade, precisão e privacidade**.

---

## 🧭 Visão Geral

Este projeto foi desenvolvido utilizando HTML, CSS e JavaScript puro (Vanilla JS), sem frameworks externos, com ênfase em boas práticas de código, documentação e acessibilidade.  
Os dados meteorológicos são obtidos da **API Open-Meteo**, enquanto as coordenadas das cidades são buscadas via **Open-Meteo Geocoding API**.

O site não coleta, armazena ou compartilha dados pessoais — todas as consultas são processadas em tempo real.

---

## 🚀 Funcionalidades Principais

✅ Busca por cidade (com validação de entrada)  
✅ Exibição de temperatura atual, mínima e máxima  
✅ Umidade relativa do ar (%)  
✅ Velocidade do vento (km/h)  
✅ Precipitação (mm)  
✅ Ícones dinâmicos com **Weather Icons**  
✅ Data e hora local formatadas  
✅ Layout responsivo e animações suaves  
✅ Mensagens de erro claras e humanizadas  
✅ Licenciamento e atribuição de dados conforme exigências da Open-Meteo  

---

## 🧩 Estrutura do Projeto

```
/
├── index.html              # Estrutura principal da página
├── style.css               # Estilos e layout responsivo
├── api.js                  # Lógica JS para consumo da API e atualização do DOM
├── tests/
│   └── api.test.js         # Testes unitários com Jest
├── assets/
│   └── icons/
│       └── css/
│           └── weather-icons.css  # Ícones meteorológicos
├── LICENSE                 # Licença MIT
└── README.md               # Documentação do projeto
```

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia | Função |
|-------------|--------|
| **HTML5** | Estrutura semântica da aplicação |
| **CSS3** | Estilização, responsividade e animações |
| **JavaScript (ES6)** | Lógica e integração com APIs |
| **Open-Meteo API** | Dados meteorológicos em tempo real |
| **Open-Meteo Geocoding API** | Conversão de nome de cidade para coordenadas |
| **Weather Icons** | Ícones de condições climáticas |
| **Google Fonts – Poppins** | Tipografia moderna e limpa |

---

## 🧠 Lógica e Estrutura JavaScript

O arquivo `api.js` contém:

### 🔹 `formatarDataHora()`
Formata a data e hora atuais no padrão brasileiro, ex:  
**"terça-feira, 12 de novembro de 2025 14:30"**

### 🔹 `getWeatherIcon(weatherCode)`
Retorna a classe CSS do ícone correspondente ao código meteorológico.

### 🔹 Evento `form.addEventListener("submit", async (event))`
- Captura o nome da cidade informada pelo usuário.  
- Busca as coordenadas na **Geocoding API**.  
- Consulta as condições meteorológicas via **Weather API**.  
- Renderiza dinamicamente o card de clima.  
- Exibe mensagens de erro específicas em caso de falha.

---

## 💅 Estilo e Layout

O design é **minimalista**, com foco em **clareza e legibilidade**.  
O fundo possui um **gradiente suave azul-claro**, e os cartões têm **bordas arredondadas, sombra leve e tipografia Poppins**.

O rodapé contém as informações de licenciamento e aviso de privacidade, sempre centralizado na parte inferior da página.

---

## 🧪 Testes Automatizados

Os testes utilizam **Jest** e verificam:

- Validação de entrada vazia  
- Erros de rede e APIs  
- Retorno correto de dados meteorológicos  
- Tratamento de cidade inexistente  
- Estrutura e formato de resposta da API

Executar os testes:
```bash
npm install
npx jest
```

---

## 🧭 Como Executar Localmente

### 1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/previsao-do-tempo.git
cd previsao-do-tempo
```

### 2. Abra o arquivo `index.html` no navegador:
Basta clicar duas vezes no arquivo ou usar a extensão **Live Server** no VS Code.

### 3. Digite o nome de uma cidade e clique em **Buscar**.

---

## 🧰 Exemplo de Uso

**Entrada:** `São Paulo`  
**Saída:**
- 🌤️ Céu limpo  
- 🌡️ 25°C (Máx: 30°C | Mín: 20°C)  
- 💧 Umidade: 70%  
- 🌬️ Vento: 10 km/h  
- ☔ Precipitação: 1.2 mm  

---

## 📱 Responsividade

A interface adapta-se automaticamente a diferentes tamanhos de tela (desktop, tablet e mobile).  
Os elementos são centralizados e ajustados dinamicamente para manter a estética e a legibilidade.

---

## 🔐 Privacidade e Ética

> Esta aplicação **não coleta, armazena ou compartilha** informações pessoais.  
> Todas as buscas são processadas em tempo real e **não são registradas**.

---

## 📜 Licença

Este projeto está licenciado sob a **Licença MIT** © 2025 Milena Svitras.  
Consulte o arquivo [`LICENSE`](./LICENSE) para mais detalhes.

---

## 🪪 Créditos e Atribuições

| Componente | Autor | Licença | Link |
|-------------|--------|----------|------|
| **Weather Icons** | Erik Flowers | SIL OFL 1.1 / MIT | [GitHub](https://github.com/erikflowers/weather-icons) |
| **Poppins Font** | Google Fonts | SIL Open Font License 1.1 | [Google Fonts](https://fonts.google.com/specimen/Poppins) |
| **Open-Meteo API** | Open-Meteo.com | CC BY 4.0 | [open-meteo.com](https://open-meteo.com) |
| **Cloudflare CDN** | Cloudflare | - | [cdnjs.com](https://cdnjs.cloudflare.com) |

---

## 🌍 Demonstração (opcional)

Se publicado no GitHub Pages, Netlify ou Vercel, adicione aqui o link da versão online:  
🔗 [https://seuusuario.github.io/previsao-do-tempo](https://seuusuario.github.io/previsao-do-tempo)

---

**Desenvolvido por [Milena Svitras](https://github.com/misoliv)**  
_“Código limpo, acessível e aberto — como o céu em um dia ensolarado.”_


