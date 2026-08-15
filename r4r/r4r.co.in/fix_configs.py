import os
import re

root_dir = '/Users/rajesh/Documents/r4r/r4r.co.in'
extensions = ('.php', '.shtml', '.html')

# This regex finds any include/require of a file ending in 'config.php' or 'site_config.php'
# It matches things like include("../../config.php") or require_once "site_config.php";
pattern = re.compile(r'(?:include|require)(?:_once)?\s*\(?\s*[\'"][^\'"]*(?:site_)?config\.php[\'"]\s*\)?\s*;', re.IGNORECASE)

new_config = "include_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');"

modified_count = 0

for subdir, dirs, files in os.walk(root_dir):
    if 'config' in subdir or 'template' in subdir or '.git' in subdir:
        continue
        
    for file in files:
        if file.endswith(extensions):
            filepath = os.path.join(subdir, file)
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except:
                continue
                
            original_content = content
            
            # Replace the matched include statements
            content = pattern.sub(new_config, content)
                
            if content != original_content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    modified_count += 1
                except Exception as e:
                    pass

print(f"Fixed {modified_count} files containing broken config includes.")
