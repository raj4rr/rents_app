import os
import re

root_dir = '/Users/rajesh/Documents/r4r/r4r.co.in'
extensions = ('.php', '.shtml', '.html', '.js', '.css')

# Regex to match http://r4r.co.in/, https://r4r.co.in/, http://www.r4r.co.in/, etc.
# with or without trailing slash.
# We will replace it with '/' but we must ensure we don't end up with '//' if there was a trailing slash.
# So we match the URL and an optional trailing slash, and replace the whole thing with '/'.
url_pattern = re.compile(r'https?://(?:www\.)?r4r\.co\.in/?', re.IGNORECASE)

files_modified = 0

for dirpath, dirnames, filenames in os.walk(root_dir):
    # skip .git or similar if exists
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
            
            new_content, count = url_pattern.subn('/', content)
            
            # Additional cleanup: if the replacement resulted in '//' (e.g. if the original was http://r4r.co.in//something),
            # we can fix it, but root-relative URLs are safe to just be '/'
            
            # Let's fix cases where we might have accidentally created href="/index.php" instead of href="/index.php"
            # Actually URL replacing to '/' is perfectly safe.
            
            if count > 0:
                # To prevent double slashes like //images/logo.gif if the original was http://r4r.co.in/images/logo.gif
                # Wait, if original is `http://r4r.co.in/images`, the regex `/?` matches the slash.
                # So it becomes `/images`, which is perfect!
                # If original is `http://r4r.co.in`, it matches without slash, becomes `/`, perfect!
                
                # Write back
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                files_modified += 1

print(f"Replaced hardcoded live URLs with root-relative URLs ('/') in {files_modified} files.")
