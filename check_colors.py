from PIL import Image
import os
import glob

files = glob.glob(r'C:\Users\Daksh Daga\.gemini\antigravity\brain\f1aad0c5-ecc2-4245-9967-0f08b04dce6d\.tempmediaStorage\media_*.png')
files.sort(key=os.path.getmtime, reverse=True)

for img_path in files[:15]:
    try:
        img = Image.open(img_path)
        img = img.resize((50, 50))
        colors = img.getcolors(2500)
        avg_r = sum([c[0]*c[1][0] for c in colors]) / sum([c[0] for c in colors])
        avg_g = sum([c[0]*c[1][1] for c in colors]) / sum([c[0] for c in colors])
        avg_b = sum([c[0]*c[1][2] for c in colors]) / sum([c[0] for c in colors])
        print(f'{os.path.basename(img_path)}: size={os.path.getsize(img_path)} R={avg_r:.1f} G={avg_g:.1f} B={avg_b:.1f}')
    except Exception as e:
        pass
