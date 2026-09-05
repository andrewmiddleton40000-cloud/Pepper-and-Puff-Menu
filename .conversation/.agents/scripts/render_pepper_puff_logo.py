from pathlib import Path
import fitz

src = Path('attached_assets/Pepper_and_Puff_Sticker_Logo_1788591169336.pdf')
out = Path('.agents/outputs/pepper_puff_logo')
out.mkdir(parents=True, exist_ok=True)

doc = fitz.open(src)
print('pages', doc.page_count)
print('metadata', doc.metadata)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(3, 3), alpha=True)
    path = out / f'page_{i+1}.png'
    pix.save(path)
    print('rendered', path, pix.width, pix.height)
    print('text', page.get_text('text')[:500].replace('\n', ' | '))
    images = page.get_images(full=True)
    print('embedded_images', len(images))
    for j, img in enumerate(images):
        xref = img[0]
        data = doc.extract_image(xref)
        ext = data['ext']
        img_path = out / f'page_{i+1}_embedded_{j+1}.{ext}'
        img_path.write_bytes(data['image'])
        print('extracted', img_path, data.get('width'), data.get('height'))
