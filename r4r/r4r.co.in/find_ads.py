import os
import re
from collections import Counter

ad_patterns = [
    re.compile(r'include.*googleadds.*', re.IGNORECASE),
    re.compile(r'include.*adds\d*\.(php|shtml).*', re.IGNORECASE),
    re.compile(r'include.*ad\d*\.(php|shtml).*', re.IGNORECASE),
    re.compile(r'adsbygoogle', re.IGNORECASE),
]

counts = Counter()
matches = []

for root, dirs, files in os.walk('.'):
    if '/.git' in root or '/_db_backups' in root or '/.system_generated' in root:
        continue
    for file in files:
        if file.endswith(('.php', '.shtml', '.html')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    for i, line in enumerate(f):
                        for p in ad_patterns:
                            if p.search(line):
                                counts[p.pattern] += 1
                                if len(matches) < 20:
                                    matches.append(f"{path}:{i+1}: {line.strip()}")
            except Exception:
                pass

print("Counts:")
for k, v in counts.items():
    print(f"{k}: {v}")
print("\nSample matches:")
for m in matches:
    print(m)
