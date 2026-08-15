import os
import re

# Paths to search and replace
root_dir = '/Users/rajesh/Documents/r4r/r4r.co.in'
extensions = ('.php', '.shtml', '.html')

# Regex patterns for finding old includes
# This covers PHP includes and SSI includes for header and footer variations
header_patterns = [
    re.compile(r'<!--#include\s+virtual=".*?header.*?\.shtml"\s*-->', re.IGNORECASE),
    re.compile(r'<\?php\s+include\([\'"].*?header.*?\.shtml[\'"]\);\s*\?>', re.IGNORECASE),
    re.compile(r'<\?php\s+include_once\([\'"].*?header.*?\.shtml[\'"]\);\s*\?>', re.IGNORECASE),
    re.compile(r'<\?php\s+require\([\'"].*?header.*?\.shtml[\'"]\);\s*\?>', re.IGNORECASE)
]

footer_patterns = [
    re.compile(r'<!--#include\s+virtual=".*?footer.*?\.shtml"\s*-->', re.IGNORECASE),
    re.compile(r'<\?php\s+include\([\'"].*?footer.*?\.shtml[\'"]\);\s*\?>', re.IGNORECASE),
    re.compile(r'<\?php\s+include_once\([\'"].*?footer.*?\.shtml[\'"]\);\s*\?>', re.IGNORECASE),
    re.compile(r'<\?php\s+require\([\'"].*?footer.*?\.shtml[\'"]\);\s*\?>', re.IGNORECASE)
]

config_patterns = [
    re.compile(r'<\?php\s+include\([\'"](site_)?config\.php[\'"]\);\s*\?>', re.IGNORECASE)
]

new_header = '<?php include($_SERVER[\'DOCUMENT_ROOT\'] . "/template/header.php"); ?>'
new_footer = '<?php include($_SERVER[\'DOCUMENT_ROOT\'] . "/template/footer.php"); ?>'
new_config = '<?php include_once($_SERVER[\'DOCUMENT_ROOT\'] . "/config/database.php"); ?>'

modified_count = 0

for subdir, dirs, files in os.walk(root_dir):
    # skip some directories
    if 'template' in subdir or 'config' in subdir or '.git' in subdir:
        continue
        
    for file in files:
        if file.endswith(extensions):
            filepath = os.path.join(subdir, file)
            
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except Exception as e:
                print(f"Error reading {filepath}: {e}")
                continue
                
            original_content = content
            
            # Replace headers
            for pattern in header_patterns:
                content = pattern.sub(new_header, content)
                
            # Replace footers
            for pattern in footer_patterns:
                content = pattern.sub(new_footer, content)
                
            # Replace configs
            for pattern in config_patterns:
                content = pattern.sub(new_config, content)
                
            if content != original_content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    modified_count += 1
                except Exception as e:
                    print(f"Error writing {filepath}: {e}")

print(f"Replacement complete! Modified {modified_count} files.")
