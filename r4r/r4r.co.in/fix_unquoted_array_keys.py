import os
import re

root_dir = '/Users/rajesh/Documents/r4r/r4r.co.in'

files_modified = 0

# Regex to match $_SESSION[login], $_POST[username], etc.
# Note: we use a negative lookbehind and lookahead to ensure there are no quotes inside the brackets.
# It matches: $_SUPERGLOBAL[unquoted_string]
pattern = re.compile(r'\$_(SESSION|POST|GET|REQUEST|COOKIE|SERVER|FILES)\[([a-zA-Z_][a-zA-Z0-9_]*)\]')

for dirpath, dirnames, filenames in os.walk(root_dir):
    if '.git' in dirpath or '_db_backups' in dirpath:
        continue
    
    for filename in filenames:
        if filename.endswith('.php') or filename.endswith('.shtml'):
            filepath = os.path.join(dirpath, filename)
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except Exception as e:
                continue
            
            # Replace $_SESSION[login] with $_SESSION['login']
            new_content, count = pattern.subn(r"$_\1['\2']", content)
            
            if count > 0:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                files_modified += 1
                print(f"Fixed {count} occurrences in {filepath}")

print(f"Done. Modified {files_modified} files.")
