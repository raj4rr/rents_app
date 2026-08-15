import os
import re

total_files_modified = 0

pattern = re.compile(r'<td\s+style=["\']width:\s*83%;?["\']\s*>', re.IGNORECASE)

for root, dirs, files in os.walk('.'):
    if '/.git' in root or '/_db_backups' in root or '/.system_generated' in root:
        continue
    for file in files:
        if file.endswith(('.php', '.shtml', '.html')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                original_content = content
                
                # Add valign="top" to the 83% width td
                content = pattern.sub('<td style="width:83%;" valign="top">', content)
                
                if content != original_content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    total_files_modified += 1
            except Exception as e:
                print(f"Error processing {path}: {e}")

print(f"Layout fix complete. Modified {total_files_modified} files.")
