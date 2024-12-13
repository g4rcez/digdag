# digdag

Repositório utilizado para a apresentação da H2HC

Ferramentas apresentadas: 

- [digdag](https://docs.digdag.io/): ferramenta baseada em workflows e controle de execução
- [mise](https://mise.jdx.dev/): controlador de versões de linguagens/ferramentas
- [fzf](https://github.com/junegunn/fzf): CLI para fuzzy-search e auxiliar na criação de TUIs


# oneliners

## fzf + payload all the things

Utilizando o [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/), podemos construir um 
utilitário do fzf para pesquisar todos os payloads do repositório. Os nomes seguem o padrão `[Index] - Nome da Pasta - Título`.

```shell
# Você pode adicionar ao seu .bashrc, .zshrc ou .fishrc
function payloads() {
  jq '.[].title' payloads.json | \
  fzf --ansi \
  --prompt "Payload: " --cycle --preview="jq '.[] | select(.title == \"{}\")' payloads.json | jq -r '.code' | bat --color=always -l python"
}
```
Lembrando que você precisa clonar o repositório PayloadsAllTheThings para o funcionamento correto.
