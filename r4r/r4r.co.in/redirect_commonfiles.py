import os
import re

root_dir = '/Users/rajesh/Documents/r4r/r4r.co.in'
extensions = ('.php', '.shtml', '.html')

# We want to replace any include that points to /common-files/php/ with /commonfiles/php/
# because common-files/php/ is full of empty/ad files, and commonfiles/php/ has the real code
pattern = re.compile(r'/common-files/php/', re.IGNORECASE)
replacement = '/commonfiles/php/'

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
            
            content = pattern.sub(replacement, content)
                
            if content != original_content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    modified_count += 1
                except:
                    pass

print(f"Redirected common-files/php to commonfiles/php in {modified_count} files.")
