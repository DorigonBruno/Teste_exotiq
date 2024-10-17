import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import cors from "cors";

const app = express();

// Usando CORS se você estiver chamando a API de um frontend diferente
app.use(cors());

app.get("/scrape", async (req, res) => {
  const { url } = req.query;

  // Verifica se a URL é válida
  if (typeof url !== "string" || !/^https?:\/\//i.test(url)) {
    return res.status(400).json({ error: "URL inválida ou mal formatada" });
  }

  try {
    const response = await axios.get(url);

    // Verifica se a requisição foi bem-sucedida
    if (response.status !== 200) {
      return res
        .status(response.status)
        .json({ error: `Erro ao acessar o artigo: status ${response.status}` });
    }

    // Remove todos os estilos do HTML
    let html = response.data.replace(
      /<link[^>]+rel=["']stylesheet["'][^>]*>/gi,
      ""
    ); // Remove <link> styles
    html = html.replace(/<style[^>]*>.*?<\/style>/gis, ""); // Remove <style> blocks

    // Cria uma nova instância JSDOM a partir da resposta limpa
    const dom = new JSDOM(html, { url });
    const document = dom.window.document;

    // Usa o Readability para extrair o conteúdo
    const article = new Readability(document).parse();

    // Verifica se o conteúdo do artigo foi extraído com sucesso
    if (article && article.content) {
      return res.json({ content: article.content }); // Retorna apenas o conteúdo do artigo
    } else {
      return res
        .status(500)
        .json({ error: "Não foi possível extrair o conteúdo do artigo" });
    }
  } catch (error) {
    // Trata erros da requisição axios
    if (axios.isAxiosError(error)) {
      console.error("Erro ao fazer requisição:", error.message);
      return res.status(500).json({ error: "Erro na requisição ao site" });
    }

    // Trata erros de raspagem
    console.error("Erro na raspagem:", error);
    return res.status(500).json({ error: "Erro ao raspar conteúdo" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
