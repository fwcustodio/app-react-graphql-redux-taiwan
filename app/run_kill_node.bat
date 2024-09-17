@echo off
echo Matando todos os processos do Node.js em execução...
taskkill /F /IM node.exe /T
nvm use 18.20.3
echo Todos os processos do Node.js foram encerrados.
