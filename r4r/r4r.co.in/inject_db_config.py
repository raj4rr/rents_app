import os
import re

root_dir = '/Users/rajesh/Documents/r4r/r4r.co.in'

files_modified = 0

for dirpath, dirnames, filenames in os.walk(root_dir):
    if '.git' in dirpath or '_db_backups' in dirpath:
        continue
    
    for filename in filenames:
        if filename.endswith('.php'):
            filepath = os.path.join(dirpath, filename)
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except Exception as e:
                continue
            
            # If it uses mysql_connect or mysql_select_db and DOES NOT include database.php
            if ('mysql_connect(' in content or 'mysql_select_db(' in content or 'mysql_query(' in content) and 'config/database.php' not in content:
                # We need to inject require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');
                # after the first <?php
                
                # Use regex to find the first <?php (case insensitive) and inject right after it
                def replacer(match):
                    return match.group(0) + "\nrequire_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');\n"
                
                # re.sub with count=1 replaces only the first occurrence
                new_content, count = re.subn(r'<\?php', replacer, content, count=1, flags=re.IGNORECASE)
                
                if count > 0:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    files_modified += 1
                    print(f"Injected into {filepath}")

print(f"Done. Modified {files_modified} files.")
