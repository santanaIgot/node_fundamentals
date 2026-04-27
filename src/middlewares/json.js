export async function json(req, res) {
  const buffers = [];

  // aguarda cada pedaço da stream a ser retornado
  // essa sintaxe permite percorrermos toda a stream e enquanto não percorrer ela toda não é exibido nada
  // com esta sintaxe nos conseguimos ler todos os dados de uma stream antes de processar ela
  for await (const chunk of requisicao) {
    buffers.push(chunk);
  }

  // const body = Buffer.concat(buffers).toString() - ***vindo como texto****

  try {
    requisicao.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    requisicao.body = null;
  }

  // devolve os dados em json
  res.setHeader('Content-Type', 'application/json').end(JSON.stringify(users))
}


/// middleware é nada mais nada menos do que um interceptador de requisição 