const fs = require('fs');
const path = require('path');

function scanHistory(editor) {
  const historyPath = path.join(process.env.APPDATA, editor, 'User', 'History');
  if (!fs.existsSync(historyPath)) {
    console.log(`History path for ${editor} does not exist.`);
    return;
  }
  console.log(`Scanning history for ${editor}...`);
  const dirs = fs.readdirSync(historyPath);
  for (const dir of dirs) {
    const dirPath = path.join(historyPath, dir);
    if (!fs.statSync(dirPath).isDirectory()) continue;
    const entriesPath = path.join(dirPath, 'entries.json');
    if (fs.existsSync(entriesPath)) {
      try {
        const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
        const resource = entries.resource || '';
        if (resource.includes('games.ts')) {
          console.log(`\nFOUND MATCH in ${editor}:`);
          console.log(`Directory: ${dirPath}`);
          console.log(`Resource: ${resource}`);
          console.log(`Entries:`, JSON.stringify(entries.entries, null, 2));
          // Let's copy/print files from here
          const sorted = (entries.entries || []).sort((a, b) => b.timestamp - a.timestamp);
          if (sorted.length > 0) {
            console.log(`Latest backup: ${sorted[0].id} from ${new Date(sorted[0].timestamp).toLocaleString()}`);
            // Let's copy the files to workspace for safety
            sorted.forEach((entry, idx) => {
              const srcFile = path.join(dirPath, entry.id);
              const destFile = `C:\\Users\\ankur\\OneDrive\\Desktop\\W GRAPHICS DESIGN\\new game nest\\GameNest-Hub\\recovered_games_${editor}_${idx}_${entry.id}.ts`;
              if (fs.existsSync(srcFile)) {
                fs.copyFileSync(srcFile, destFile);
                console.log(`  Copied version ${idx} (${entry.id}) to: recovered_games_${editor}_${idx}_${entry.id}.ts`);
              }
            });
          }
        }
      } catch (e) {
        // Ignore JSON parse errors
      }
    }
  }
}

scanHistory('Code');
scanHistory('Cursor');
