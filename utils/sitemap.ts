import { client } from "@/sanity/lib/client";
import fs from "fs";
import path from "path";

// Base URL for the website
const baseUrl = "https://august1.dev/";

// Document types in Sanity CMS to include in the sitemap
const docTypes = ["projects", "playgrounds"];

// Initialize Sanity client

// Main function to fetch data and generate sitemap
export async function GET() {
  try {
    const data = await fetchDataFromSanity();
    const sitemapXml = createSitemapXml(data);
    return new Response(sitemapXml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while processing your request.", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// Function to generate and save sitemap
export async function generateSitemap() {
  try {
    const data = await fetchDataFromSanity();
    const sitemapXml = createSitemapXml(data);

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Write sitemap to file
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml);
  } catch (error) {
    console.error("❌ Erreur lors de la génération du sitemap :", error);
    process.exit(1);
  }
}

// Fetch data from Sanity CMS
async function fetchDataFromSanity() {
  const query = `*[_type in $docTypes] {
    "slug": slug.current,
    "type": _type,
    "lastmod": _updatedAt
  }`;

  return await client.fetch(query, { docTypes });
}

// Generate sitemap XML from fetched data
const createSitemapXml = (sanityData: Array<{ slug: string; lastmod: string; type: string }>) => {
  let sitemapXml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static routes
  sitemapXml += ` <url>\n  <loc>${baseUrl}</loc>\n </url>\n`;
  sitemapXml += ` <url>\n  <loc>${baseUrl}projets</loc>\n </url>\n`;
  sitemapXml += ` <url>\n  <loc>${baseUrl}playgrounds</loc>\n </url>\n`;

  // Add dynamic routes for projects only
  sanityData.forEach((doc) => {
    if (doc.type === "projects" && doc.slug) {
      sitemapXml += ` <url>\n`;
      sitemapXml += `  <loc>${baseUrl}projets/${doc.slug}</loc>\n`;
      if (doc.lastmod) {
        sitemapXml += `  <lastmod>${new Date(doc.lastmod).toISOString()}</lastmod>\n`;
      }
      sitemapXml += ` </url>\n`;
    }
    // On ignore les playgrounds dynamiques
  });

  sitemapXml += `</urlset>`;
  return sitemapXml;
};
