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

    let footer = metaObj.footer || '';
    let logo = metaObj.logo || '';

    // Extract inline footer block: :::footer ... :::
    const footerTagMatch = content.match(/:::footer\s*([\s\S]*?):::/i);
    if (footerTagMatch) {
      footer = footerTagMatch[1].trim();
      content = content.replace(/:::footer\s*([\s\S]*?):::/i, '').trim();
    }

    // Auto-detect "Brought to you by..." lines as footer if footer not explicitly provided
    const broughtByMatch = content.match(/^(?:###|\*\*)\s*(Brought to you by[^\n]+)/im);
    if (broughtByMatch && !footer) {
      footer = broughtByMatch[1].trim();
      content = content.replace(/^(?:###|\*\*)\s*Brought to you by[^\n]+/im, '').trim();
    }

    // Extract inline logo block: :::logo ... :::
    const logoTagMatch = content.match(/:::logo\s*([\s\S]*?):::/i);
    if (logoTagMatch) {
      logo = logoTagMatch[1].trim();
      content = content.replace(/:::logo\s*([\s\S]*?):::/i, '').trim();
    }

    // Extract speakers if introduction slide
    let speakers = [];
    if (['introduction', 'speakers', 'speaker-intro'].includes(type)) {
      const extracted = extractSpeakers(content, metaObj);
      speakers = extracted.speakers;
      content = extracted.cleanedContent;
      if (!badge) badge = 'SPEAKERS';
    }

    slides.push({
      id: slides.length + 1,
      type: type || 'standard',
      title: title,
      badge: badge || (type === 'interactive-cli' ? 'LIVE DEMO' : type === 'interactive-demo' ? 'INTERACTIVE' : 'PRESENTATION'),
      notes: notes || 'No speaker notes for this slide.',
      footer: footer,
      logo: logo,
      content: content || block,
      speakers: speakers
    });
  }

  return slides;
}

/**
 * Extracts speaker data from markdown content, code blocks, or metadata.
 * Supports:
 * 1. Frontmatter JSON string: `speakers: [{"name":"..."}]`
 * 2. Code blocks: ```speakers ... ```
 * 3. Tag blocks: :::speaker ... :::
 * 4. Structured markdown lists: - **Speaker**: Name ...
 */
function extractSpeakers(content, metaObj) {
  let speakers = [];
  let cleaned = content;

  // 1. Frontmatter JSON
  if (metaObj.speakers) {
    try {
      const parsed = typeof metaObj.speakers === 'string' ? JSON.parse(metaObj.speakers) : metaObj.speakers;
      if (Array.isArray(parsed)) {
        speakers.push(...parsed);
      }
    } catch (e) {
      // Ignore if not valid JSON
    }
  }

  // 2. Code blocks: ```speakers ... ``` or ```json:speakers ... ```
  const codeBlockRegex = /```(?:speakers|json:speakers)\s*([\s\S]*?)```/i;
  const codeMatch = cleaned.match(codeBlockRegex);
  if (codeMatch) {
    try {
      const parsed = JSON.parse(codeMatch[1].trim());
      if (Array.isArray(parsed)) {
        speakers.push(...parsed);
      } else if (parsed && typeof parsed === 'object') {
        speakers.push(parsed);
      }
      cleaned = cleaned.replace(codeBlockRegex, '').trim();
    } catch (e) {
      console.warn('Failed to parse speakers code block as JSON:', e.message);
    }
  }

  // 3. Custom tag blocks: :::speaker ... :::
  const speakerBlockRegex = /:::(?:speaker|speakers)\s*([\s\S]*?):::/gi;
  let blockMatch;
  while ((blockMatch = speakerBlockRegex.exec(cleaned)) !== null) {
    const raw = blockMatch[1].trim();
    if (raw.startsWith('[') || raw.startsWith('{')) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) speakers.push(...parsed);
        else speakers.push(parsed);
      } catch (e) {}
    } else {
      const speaker = {};
      const lines = raw.split('\n');
      for (const l of lines) {
        const kv = l.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)/);
        if (kv) {
          speaker[kv[1].toLowerCase()] = kv[2].trim();
        }
      }
      if (speaker.name || speaker.title) {
        speakers.push(speaker);
      }
    }
  }
  cleaned = cleaned.replace(speakerBlockRegex, '').trim();

  // 4. Structured markdown bullet points:
  // - **Speaker**: Name
  //   - **Title**: Role
  //   - **Headshot**: URL
  if (speakers.length === 0) {
    const speakerListRegex = /-\s*\*\*Speaker\*\*\s*:\s*([^\n]+)([\s\S]*?)(?=(?:-\s*\*\*Speaker\*\*|$))/gi;
    let listMatch;
    while ((listMatch = speakerListRegex.exec(cleaned)) !== null) {
      const name = listMatch[1].trim();
      const details = listMatch[2];
      const titleMatch = details.match(/(?:-\s*)?\*\*Title\*\*\s*:\s*([^\n]+)/i);
      const headshotMatch = details.match(/(?:-\s*)?\*\*Headshot\*\*\s*:\s*([^\n]+)/i);
      const companyMatch = details.match(/(?:-\s*)?\*\*(?:Company|Organization|Affiliation)\*\*\s*:\s*([^\n]+)/i);
      const topicMatch = details.match(/(?:-\s*)?\*\*(?:Topic|Bio)\*\*\s*:\s*([^\n]+)/i);

      speakers.push({
        name,
        title: titleMatch ? titleMatch[1].trim() : '',
        headshot: headshotMatch ? headshotMatch[1].trim() : '',
        company: companyMatch ? companyMatch[1].trim() : '',
        topic: topicMatch ? topicMatch[1].trim() : ''
      });
    }
    if (speakers.length > 0) {
      cleaned = cleaned.replace(speakerListRegex, '').trim();
    }
  }

  // 5. Fallback placeholder spots if none provided
  if (speakers.length === 0) {
    speakers = [
      {
        name: "Speaker Name",
        title: "Keynote Presenter / Role",
        headshot: "",
        company: "GDG on Campus University of Windsor"
      }
    ];
  }

  return { speakers, cleanedContent: cleaned };
}
