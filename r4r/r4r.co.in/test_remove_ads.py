import re

with open('answer/index.php', 'r') as f:
    content = f.read()

# 1. Remove PHP includes for ads
content = re.sub(r'<\?php\s*@?include[^>]*?(googleadds|adds?\d*|ad\d*)\.(php|shtml)[^>]*?\?>', '', content, flags=re.IGNORECASE)

# 2. Remove adsbygoogle script tag
content = re.sub(r'<script[^>]*?adsbygoogle\.js[^>]*?></script>', '', content, flags=re.IGNORECASE)

# 3. Remove ins block
content = re.sub(r'<ins\s+class="adsbygoogle"[\s\S]*?</ins>', '', content, flags=re.IGNORECASE)

# 4. Remove push script
content = re.sub(r'<script>\s*\(adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\]\)\.push\(\{\}\);\s*</script>', '', content, flags=re.IGNORECASE)

# Clean up empty lines created by removals
content = re.sub(r'\n\s*\n', '\n\n', content)

with open('answer/index_cleaned.php', 'w') as f:
    f.write(content)

