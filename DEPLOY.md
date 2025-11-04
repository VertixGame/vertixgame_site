# Guia de Deploy na Vercel

Este guia explica como fazer o deploy do projeto Vertix na Vercel.

## 📋 Pré-requisitos

- Conta na Vercel (gratuita)
- Projeto conectado ao GitHub/GitLab/Bitbucket
- Node.js 18+ instalado localmente (para testes)

## 🚀 Deploy Automático via GitHub

### Passo 1: Push para o Repositório

```bash
git add .
git commit -m "Preparando para deploy na Vercel"
git push origin main
```

### Passo 2: Conectar na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe o repositório do GitHub
4. A Vercel detectará automaticamente que é um projeto Vite/React

### Passo 3: Configurações (Opcional)

A Vercel detectará automaticamente:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Você pode verificar essas configurações, mas geralmente não é necessário alterar nada.

### Passo 4: Deploy

1. Clique em "Deploy"
2. Aguarde o build completar (geralmente 2-5 minutos)
3. Seu site estará disponível em `https://seu-projeto.vercel.app`

## 🔧 Configurações Implementadas

### vercel.json

O arquivo `vercel.json` já está configurado com:

- ✅ **Rewrites**: Configurado para SPA (Single Page Application) - todas as rotas redirecionam para `index.html`
- ✅ **Headers**: Cache otimizado para assets estáticos
- ✅ **Build Settings**: Comandos otimizados para Vite

### Otimizações de Build

- ✅ Minificação com esbuild (mais rápido que terser)
- ✅ Code splitting otimizado
- ✅ CSS code splitting
- ✅ Lazy loading de componentes
- ✅ Remoção de console.log em produção

## 🐛 Troubleshooting

### Erro: "Module not found"

Se você encontrar erros de módulos não encontrados:

1. Verifique se todas as dependências estão no `package.json`
2. Execute `npm install` localmente para verificar
3. Certifique-se de que não há imports quebrados

### Erro: "Build failed"

1. Verifique os logs de build na Vercel
2. Teste o build localmente: `npm run build`
3. Verifique se há erros de TypeScript: `npm run lint`

### Problemas com Rotas

Se as rotas não funcionarem:

1. Verifique se o `vercel.json` está presente
2. Confirme que o `rewrites` está configurado corretamente
3. Teste localmente: `npm run build && npm run preview`

### Problemas com Assets

Se imagens ou assets não carregarem:

1. Verifique se os arquivos estão na pasta `public/`
2. Certifique-se de usar caminhos relativos: `/favicon.svg` (não `./favicon.svg`)
3. Verifique se os arquivos foram incluídos no commit

## 📝 Checklist Pré-Deploy

Antes de fazer o deploy, certifique-se de:

- [ ] `npm run build` executa sem erros localmente
- [ ] `npm run lint` não mostra erros críticos
- [ ] Todos os arquivos necessários estão commitados
- [ ] `vercel.json` está presente na raiz do projeto
- [ ] Arquivos em `public/` estão incluídos no repositório
- [ ] `package.json` tem todos os scripts necessários
- [ ] Não há variáveis de ambiente necessárias (ou estão configuradas na Vercel)

## 🌐 Variáveis de Ambiente

Se você precisar de variáveis de ambiente:

1. Acesse seu projeto na Vercel
2. Vá em **Settings** > **Environment Variables**
3. Adicione as variáveis necessárias
4. Faça um novo deploy

## 🔄 Atualizações Futuras

Após o primeiro deploy, qualquer push para a branch principal:

1. A Vercel detecta automaticamente
2. Cria um novo deploy
3. Atualiza o site automaticamente

## 📊 Monitoramento

Após o deploy, você pode:

- Ver logs de build na Vercel Dashboard
- Monitorar performance no Analytics
- Verificar erros em tempo real
- Configurar domínio customizado

## ✅ Testes Pós-Deploy

Após o deploy, teste:

- [ ] Página inicial carrega corretamente
- [ ] Rotas funcionam (`/login`)
- [ ] Assets carregam (favicon, imagens)
- [ ] Formulários funcionam
- [ ] Links externos abrem corretamente
- [ ] Responsividade funciona em mobile

## 🎉 Pronto!

Seu projeto está pronto para deploy na Vercel. O arquivo `vercel.json` já está configurado e o build está otimizado.

**Dica**: O primeiro deploy pode demorar mais devido ao download de dependências. Deploys subsequentes são mais rápidos.

