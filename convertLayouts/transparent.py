import cv2		
from PIL import Image
import os

path = './characters'

def main():
    list_dir = os.listdir(path)
    list_dir.remove('.DS_Store')
    list_dir.remove('dale')
    list_dir.remove('banzsl')
    list_dir.remove('desisign')
    list_dir.remove('moon')
    list_dir.remove('soyo')

    for i in list_dir:
        black_and_white_img(i)


#this function makes every image a black and white images
def black_and_white_img(dir_name):
    path = './characters/' + dir_name

    for i in os.listdir(path):
        if i == '.DS_Store':
            continue
        img_path = path + '/' + i

        image = cv2.imread(img_path)
        img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        ret, thresh = cv2.threshold(img, 120, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)	

        cv2.imwrite(img_path, thresh)

        convert_img(img_path, i)

    print(dir_name + ' complete')

def convert_img(dir_name, img):
    img = Image.open(dir_name)
    img = img.convert('RGBA')

    img_data = img.getdata()

    new_img_data = []

    for item in img_data:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:
            new_img_data.append((255, 255, 255, 0))
        else:
            new_img_data.append(item)

    img.putdata(new_img_data)
    img.save(dir_name, 'PNG')


if __name__ == '__main__':
    main()
