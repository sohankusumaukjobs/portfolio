import fitz  # PyMuPDF
import io
from PIL import Image
import os

pdf_path = r"c:\Users\sohan\Documents\portfolio\23022328-Sohan-Kusuma FPR.pdf"
logo_path = r"c:\Users\sohan\Documents\portfolio\wildfire detection logo.png"
output_dir = r"c:\Users\sohan\Documents\portfolio\public"

# 1. Process Logo
print("Processing logo...")
try:
    img = Image.open(logo_path)
    width, height = img.size
    print(f"Original logo size: {width}x{height}")
    # The image is a landscape image with the logo on the left and text on the right.
    # We will crop the left part to make a square. Assuming the logo is roughly a square on the left.
    # We'll crop a square of size `height` x `height` from the left.
    size = min(width, height)
    left = 0
    top = 0
    right = size
    bottom = size
    cropped_img = img.crop((left, top, right, bottom))
    cropped_img.save(os.path.join(output_dir, "wildfire-logo-square.png"))
    print("Saved wildfire-logo-square.png")
except Exception as e:
    print(f"Error processing logo: {e}")

# 2. Extract PDF text & images
print("Processing PDF...")
try:
    doc = fitz.open(pdf_path)
    text = ""
    image_count = 0
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text()
        
        # Extract images
        image_list = page.get_images(full=True)
        for img_index, img_info in enumerate(image_list):
            xref = img_info[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            # To avoid tiny icons, we only save images > 10KB or reasonable dimensions
            if len(image_bytes) > 10240:
                image_filename = f"pdf-img-p{page_num+1}-{img_index}.{image_ext}"
                image_filepath = os.path.join(output_dir, image_filename)
                with open(image_filepath, "wb") as f:
                    f.write(image_bytes)
                image_count += 1
                print(f"Extracted image: {image_filename}")
                
    # Save a snippet of text for us to read
    with open("pdf_excerpt.txt", "w", encoding="utf-8") as f:
        f.write(text[:5000]) # first 5k chars to get an idea
        
    print(f"Extracted {image_count} images from PDF.")
except Exception as e:
    print(f"Error processing PDF: {e}")

print("Done.")
