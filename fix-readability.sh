#!/bin/bash

# Fix readability issues in main content pages
# Replace text-sm and text-xs with text-base for body content

# Pages to fix
pages=(
  "client/src/pages/Home.tsx"
  "client/src/pages/Pricing.tsx"
  "client/src/pages/Protocols.tsx"
  "client/src/pages/About.tsx"
  "client/src/pages/Product.tsx"
  "client/src/pages/SupplierOnboarding.tsx"
  "client/src/pages/Login.tsx"
  "client/src/components/layout/header.tsx"
  "client/src/components/layout/footer.tsx"
)

for file in "${pages[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    # Replace text-sm with text-base for content (not in className strings for buttons/UI)
    sed -i 's/text-sm font-light/text-base font-light/g' "$file"
    sed -i 's/text-xs font-light/text-base font-light/g' "$file"
    sed -i 's/text-xs text-muted-foreground/text-base text-muted-foreground/g' "$file"
    sed -i 's/text-sm text-muted-foreground font-light/text-base text-muted-foreground font-light/g' "$file"
  fi
done

echo "Readability fixes applied!"
