import fs from 'node:fs';
import path from 'node:path';

/**
 * Parses markdown slides file into structured slide objects.
 * Supports slide blocks separated by '---' or '==='.
 * Each slide block can contain top key-value frontmatter metadata (type, title, badge, notes)
 * followed by the slide markdown body.
 */
export function parseSlides(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Slides file not found at path: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');

  // Split by line containing only '---' or '==='
  const rawBlocks = fileContent.split(/\n(?:---|===)\n/);
  
  const slides = [];

  for (let i = 0; i < rawBlocks.length; i++) {
    const block = rawBlocks[i].trim();
    if (!block) continue;

    let type = 'standard';
    let title = '';
    let notes = '';
    let badge = '';
    let content = block;

    const lines = block.split('\n');
    const metaObj = {};
    const contentLines = [];
    let parsingMeta = true;

    for (let j = 0; j < lines.length; j++) {
      const line = lines[j];
      const match = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)/);

      if (parsingMeta && match && !line.trim().startsWith('#')) {
        metaObj[match[1].toLowerCase()] = match[2].trim();
      } else {
        if (line.trim() !== '') {
          parsingMeta = false;
        }
        if (!parsingMeta) {
          contentLines.push(line);
        }
      }
    }

    if (Object.keys(metaObj).length > 0) {
      type = metaObj.type || type;
      title = metaObj.title || title;
      notes = metaObj.notes || notes;
      badge = metaObj.badge || badge;
      content = contentLines.join('\n').trim();
    }

    // Extract inline notes block if present: > Speaker Notes: ...
    const notesMatch = content.match(/(?:>|\*\*|\n|^)Speaker Notes:?\s*([\s\S]*?)(?=\n\n|\n#|$)/i);
    if (notesMatch && !notes) {
      notes = notesMatch[1].trim();
    }

    // Extract title from H1 or H2 if not provided in metadata
    if (!title) {
      const headingMatch = content.match(/^#+\s+(.+)$/m);
      if (headingMatch) {
        title = headingMatch[1].replace(/[*_`]/g, '').trim();
      } else {
        title = `Slide ${slides.length + 1}`;
      }
    }

    slides.push({
      id: slides.length + 1,
      type: type || 'standard',
      title: title,
      badge: badge || (type === 'interactive-cli' ? 'LIVE DEMO' : type === 'interactive-demo' ? 'INTERACTIVE' : 'PRESENTATION'),
      notes: notes || 'No speaker notes for this slide.',
      content: content || block
    });
  }

  return slides;
}
