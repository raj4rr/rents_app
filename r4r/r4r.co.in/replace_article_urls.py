import os
import re

root_dir = '/Users/rajesh/Documents/r4r/r4r.co.in'
extensions = ('.shtml', '.php', '.html')

# Regex to match href="/article/", href="/articles/", href='/article/', etc.
# We replace it with href="/blogs/"
url_pattern = re.compile(r'href=[\'"]/articles?/?[\'"]', re.IGNORECASE)

files_modified = 0

for dirpath, dirnames, filenames in os.walk(root_dir):
    if '.git' in dirpath or '_db_backups' in dirpath:
        continue
    
    for filename in filenames:
        if filename.endswith(extensions):
            filepath = os.path.join(dirpath, filename)
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except Exception as e:
                continue
            
            new_content, count = url_pattern.subn('href="/blogs/"', content)
            
            if count > 0:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                files_modified += 1
                print(f"Updated {count} links in {filepath}")

print(f"Done. Modified {files_modified} files.")
