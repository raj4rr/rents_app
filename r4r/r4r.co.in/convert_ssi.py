import os
import re

root_dir = '/Users/rajesh/Documents/r4r/r4r.co.in'
extensions = ('.php', '.shtml', '.html')

# Regex to find SSI includes like <!--#include virtual="/commonfiles/leftmenu.shtml" -->
# or <!--#include file="/blogs/blogs.php" -->
ssi_pattern = re.compile(r'<!--#include\s+(?:virtual|file)\s*=\s*["\']([^"\']+)["\']\s*-->', re.IGNORECASE)

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
            
            def ssi_replacer(match):
                path = match.group(1)
                
                # If it's an ads file that we deleted, just remove it entirely
                if 'ads' in path.lower() or 'header' in path.lower() or 'footer' in path.lower():
                    return ''
                
                # Otherwise, convert it to a PHP include with error suppression
                # We use $_SERVER['DOCUMENT_ROOT'] if the path starts with /
                if path.startswith('/'):
                    return f"<?php @include($_SERVER['DOCUMENT_ROOT'] . '{path}'); ?>"
                else:
                    return f"<?php @include('{path}'); ?>"
            
            content = ssi_pattern.sub(ssi_replacer, content)
                
            if content != original_content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    modified_count += 1
                except:
                    pass

print(f"SSI conversion complete! Modified {modified_count} files.")
