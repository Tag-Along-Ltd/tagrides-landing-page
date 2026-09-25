# Brand mockup provenance

The apparel and vehicle base photographs were generated with the deployed `gpt-image-2` model on the project Azure AI resource. Prompts explicitly required blank products with no text or marks.

TagRides logos are not AI-generated. The exact restored SVG production assets are rasterized with Sharp and composited locally with the deterministic Pillow pipeline in `scripts/composite-brand-mockups.py`. Perspective, material luminance, edge highlights and shadows are applied without redrawing any path or letter.

These images are presentation mockups, not vehicle installer templates or embroidery files. Production vendors must use the linked vector artwork and measured technical specifications.
