🌦️ Aplicativo de Previsão do Tempo

🧭 Visão Geral do Projeto
O Previsão do Tempo é um aplicativo web desenvolvido em HTML, CSS e JavaScript (ES Modules) que permite consultar o clima atual e a previsão dos próximos 7 dias para qualquer cidade do mundo. Utiliza a API Open-Meteo, exibindo informações como temperatura, sensação térmica, umidade, vento e precipitação, tudo em uma interface limpa e intuitiva.

⚙️ Instruções de Instalação
1. Clone o repositório:
•	git clone https://github.com/seuusuario/previsao-do-tempo.git
2. Acesse a pasta do projeto:
•	cd previsao-do-tempo
•	3. Abra o arquivo index.html no navegador — não é necessário instalar dependências.
🧭 Guia de Uso
1. No campo de busca, digite o nome de uma cidade.
2. Clique no botão 'Buscar' ou pressione Enter.
3. O aplicativo exibirá os dados meteorológicos atuais e a previsão dos próximos 7 dias.
🖼️ Exemplo de Resultado
Cidade: São Paulo, Brazil
Temperatura: 25.3°C
Sensação Térmica: 26.1°C
Umidade: 65%
Vento: 10.5 km/h
Precipitação: 0.2 mm

Previsão de 7 dias exibida em formato de tabela com mínimas e máximas.
🌈 Funcionalidades
•	Busca por cidade com atualização dinâmica
•	Exibição de temperatura e sensação térmica
•	Umidade relativa, vento e precipitação
•	Previsão dos próximos 7 dias
•	Mensagens de erro e carregamento
•	Interface responsiva e moderna com CSS

🛡️ Tratamento de Erros
O app trata cenários como:
- Campo vazio: 'Por favor, digite o nome de uma cidade.'
- Cidade não encontrada.
- Falha na API: 'Erro ao buscar dados do clima.'
- Dados incompletos exibidos como 'N/A'.

🌍 Informações da API
O app usa duas APIs da Open-Meteo: Geocoding API e Forecast API.
Exemplo de chamada da Geocoding API:
https://geocoding-api.open-meteo.com/v1/search?name={CITY}&count=1&language=pt&format=json
Exemplo de chamada da Forecast API:
https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&hourly=temperature_2m,...

🚀 Melhorias Futuras
•	Adicionar ícones meteorológicos dinâmicos
•	Geolocalização automática do usuário
•	Versão PWA para uso offline
•	Tradução automática dos nomes das cidades
•	Armazenamento local de buscas recentes
•	Gráficos climáticos com Chart.js

👩‍💻 Autora
Milena Svitras — Desenvolvedora em formação (Bootcamp Full Stack Java | Generation Brasil). Foco em integração de APIs, boas práticas de documentação e usabilidade.

🪪 Licença 
Projeto de uso livre para fins educacionais. © 2025 Milena Svitras.
