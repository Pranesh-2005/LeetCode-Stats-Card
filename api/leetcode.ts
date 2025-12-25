import type { VercelRequest, VercelResponse } from "@vercel/node";

// IMPORTANT: core package compiled output
import generate from "../packages/core/dist/index.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const {
      username = "pranesh_s_2005",
      theme = "light",
      animation = "true",
      width = "500",
      height = "200"
    } = req.query;

    const svg = await generate({
      username: String(username),
      theme: String(theme),
      animation: animation === "true",
      width: Number(width),
      height: Number(height)
    });

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, s-maxage=1800");
    res.status(200).send(svg);
  } catch (err: any) {
    res.status(500).send(
      `<svg xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="20">${err.message}</text>
      </svg>`
    );
  }
}