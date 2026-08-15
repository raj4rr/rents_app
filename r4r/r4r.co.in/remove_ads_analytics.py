import os
import re

total_files_modified = 0
total_replacements = 0

for root, dirs, files in os.walk('.'):
    if '/.git' in root or '/_db_backups' in root or '/.system_generated' in root:
        continue
    for file in files:
        if file.endswith(('.php', '.shtml', '.html')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                original_content = content
                
                # 1. Remove PHP includes for ads
                content = re.sub(r'<\?php\s*@?include[^>]*?(googleadds|adds?\d*|ad\d*)\.(php|shtml)[^>]*?\?>', '', content, flags=re.IGNORECASE)
                
                # 2. Remove adsbygoogle script tag
                content = re.sub(r'<script[^>]*?adsbygoogle\.js[^>]*?></script>', '', content, flags=re.IGNORECASE)
                
                # 3. Remove ins block
                content = re.sub(r'<ins\s+class="adsbygoogle"[\s\S]*?</ins>', '', content, flags=re.IGNORECASE)
                
                # 4. Remove push script
                content = re.sub(r'<script>\s*\(adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\]\)\.push\(\{\}\);\s*</script>', '', content, flags=re.IGNORECASE)

                # 5. Remove amp-auto-ads block
                content = re.sub(r'<amp-auto-ads[^>]*adsense[\s\S]*?</amp-auto-ads>', '', content, flags=re.IGNORECASE)
                
                # Clean up empty lines created by removals (optional but nice)
                content = re.sub(r'\n\s*\n', '\n\n', content)
                
                if content != original_content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    total_files_modified += 1
                    # A rough count of how many items were removed could be found by length differences,
                    # but simple counting total files modified is sufficient.
            except Exception as e:
                print(f"Error processing {path}: {e}")

print(f"AdSense removal complete. Modified {total_files_modified} files.")
