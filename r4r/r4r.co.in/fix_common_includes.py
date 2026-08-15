import os
import re

root_dir = '/Users/rajesh/Documents/r4r/r4r.co.in'
extensions = ('.php', '.shtml', '.html')

# Regex to find broken relative includes to commonfiles or common-files
# e.g., include("../../common-files/new_menu.shtml")
pattern = re.compile(r'(?:include|require)(?:_once)?\s*\(\s*[\'"](?:\.\./)+(common-?files/[^\'"]+)[\'"]\s*\)', re.IGNORECASE)

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
            
            def replacer(match):
                path = match.group(1) # 'common-files/filename.shtml'
                # Replace with absolute include and suppress errors if file is empty/missing
                return f"@include($_SERVER['DOCUMENT_ROOT'] . '/{path}')"
            
            content = pattern.sub(replacer, content)
                
            if content != original_content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    modified_count += 1
                except:
                    pass

print(f"Fixed relative common-files includes in {modified_count} files.")
