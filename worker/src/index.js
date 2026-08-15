export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });

    try {
      const body = await request.json();
      const { filename, content, message } = body || {};
      if (!filename || !content) return new Response(JSON.stringify({ error: "filename y content son obligatorios" }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });

      const path = filename.startsWith("ejercicios-matematicas-ii/") ? filename : `ejercicios-matematicas-ii/${filename}`;
      const url = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
          "User-Agent": "matematicas-2-pizarra"
        },
        body: JSON.stringify({
          message: message || `Guardar ejercicio: ${path.split("/").pop()}`,
          content,
          branch: env.GITHUB_BRANCH || "main"
        })
      });

      const result = await response.json();
      if (!response.ok) return new Response(JSON.stringify({ error: result.message || `GitHub HTTP ${response.status}` }), { status: response.status, headers: { ...cors, "Content-Type": "application/json" } });

      return new Response(JSON.stringify({ ok: true, path, commit: result.commit?.sha || null }), { headers: { ...cors, "Content-Type": "application/json" } });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
    }
  }
};
