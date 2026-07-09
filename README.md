# Análise de Dados e Inteligência Artificial Aplicada à Segurança Pública

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue)

## 📋 Visão Geral
Este projeto foi desenvolvido com o objetivo de centralizar, tratar e analisar dados históricos de segurança pública na região da Baixada Santista (focado em municípios como Praia Grande e Bertioga). Através de um pipeline completo de **Ciência de Dados** e integração com **Inteligência Artificial**, o sistema transforma registros brutos de ocorrências e taxas de delitos em informações estratégicas, permitindo o mapeamento de manchas criminais e a geração de insights preditivos por meio de uma interface interativa.

---

## ⚙️ Engenharia e Tratamento de Dados (Back-end)
No núcleo do projeto, foi desenvolvido um ecossistema em **Python** utilizando a biblioteca *Pandas* para consolidar os dados extraídos de portais de dados abertos da região. O processo passou por etapas rigorosas de tratamento (Data Cleansing) para garantir a integridade das análises:

* **Carga e Integração de Fontes:** Consumo automatizado de múltiplas bases de dados (*Taxas de Delito* e *Ocorrências por Ano*).
* **Pipeline de Higienização:** Padronização de strings, remoção de caracteres especiais, eliminação de acentos e conversão de caixas (*Sankey/Lower Case*).
* **Resolução de Conflitos de Merge:** Tratamento avançado de chaves primárias compostas (`ano`, `municipio`, `delito`) para viabilizar a junção perfeita das bases de dados, contornando erros de correspondência comuns em dados públicos.
* **Análise Estatística Descritiva:** Extração de métricas de tendência central e dispersão (média, desvio padrão, quartis e valores máximos/mínimos) para entender o comportamento das ocorrências.
* **Tratamento de Anomalias e Nulos:** Limpeza de colunas redundantes (`unnamed`), eliminação de duplicidades e aplicação de técnicas de imputação de dados (substituição de valores nulos pela média de forma dinâmica) para evitar vieses em modelos preditivos.

---

## 🖥️ Principais Funcionalidades da Plataforma (Front-end & IA)
O sistema foi projetado sob uma arquitetura desacoplada, dividindo-se entre o processamento analítico e uma experiência visual fluida:

* **Extração e Processamento Analítico:** Modelos em Python (`ai_model.py`) responsáveis por processar o volume de dados criminais e alimentar a aplicação com inteligência preditiva.
* **Mapeamento Geoespacial de Risco:** Visualização interativa via componente de mapas (*MapView*), permitindo que o usuário identifique manchas criminais e mapas de calor com base na densidade de ocorrências por município.
* **Painel de Insights Inteligentes (*AI Insights*):** Um módulo dedicado que traduz os dados estatísticos brutos em relatórios e análises preditivas textuais interpretáveis, facilitando a tomada de decisão.
* **Filtros Avançados Dinâmicos:** Painéis estatísticos atualizados em tempo real que permitem segmentar as buscas por ano, tipo de delito (como Homicídio Doloso ou Roubo) e município.

---

## 🛠️ Stack Tecnológica

* **Core de Dados & IA:** Python, Pandas, NumPy, Jupyter Notebooks / Google Colab.
* **Front-end (Interface):** React (estruturado com Vite) e estilização responsiva com Tailwind CSS.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
* [Git](https://git-scm.com)
* [Python 3.x](https://www.python.org/)
* [Node.js](https://nodejs.org/en/)

