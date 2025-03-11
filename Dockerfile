# Usando uma imagem base (exemplo para Node.js)
FROM node:16

# Defina o diretório de trabalho no container
WORKDIR /app

# Copiar o script de execução para dentro do container
COPY start.sh /usr/local/bin/start.sh

# Tornar o script executável
RUN chmod +x /usr/local/bin/start.sh

# Instalar dependências do seu projeto (exemplo para Node.js)
COPY package*.json ./
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta (ajuste conforme necessário)
EXPOSE 3000

# Comando para rodar o script durante a execução do container
CMD ["bash", "/usr/local/bin/start.sh"]
