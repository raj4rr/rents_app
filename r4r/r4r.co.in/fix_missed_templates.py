import os
import re

root_dir = '/Users/rajesh/Documents/r4r/r4r.co.in'
extensions = ('.php', '.shtml', '.html')

# Very permissive regex to catch includes without semicolons, spaces, or parentheses
header_pattern = re.compile(r'<\?php\s+(?:include|require)(?:_once)?\s*\(?[\'"][^\'"]*?(?:commonfiles)?/header\.shtml[\'"]\)?\s*;?\s*\?>', re.IGNORECASE)
footer_pattern = re.compile(r'<\?php\s+(?:include|require)(?:_once)?\s*\(?[\'"][^\'"]*?(?:commonfiles)?/footer\.shtml[\'"]\)?\s*;?\s*\?>', re.IGNORECASE)

new_header = '<?php include_once($_SERVER["DOCUMENT_ROOT"] . "/template/header.php"); ?>'
new_footer = '<?php include_once($_SERVER["DOCUMENT_ROOT"] . "/template/footer.php"); ?>'

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
            
            content = header_pattern.sub(new_header, content)
            content = footer_pattern.sub(new_footer, content)
                
            if content != original_content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    modified_count += 1
                except:
                    pass

print(f"Fixed missing headers/footers in {modified_count} files.")
